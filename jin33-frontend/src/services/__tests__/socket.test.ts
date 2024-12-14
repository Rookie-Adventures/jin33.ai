import { io, Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { socketService } from '../socket';
import { logger } from '@/utils/logger';
import { Message, MessageRole } from '@/types/chat.types';

// Mock socket.io-client
jest.mock('socket.io-client', () => ({
  io: jest.fn(() => ({
    connected: false,
    connect: jest.fn(() => undefined),
    disconnect: jest.fn(() => undefined),
    removeAllListeners: jest.fn(() => undefined),
    on: jest.fn(() => undefined),
    emit: jest.fn(() => true),
  }))
}));

// Mock logger
jest.mock('@/utils/logger', () => ({
  logger: {
    info: jest.fn(() => undefined),
    warn: jest.fn(() => undefined),
    error: jest.fn(() => undefined),
    debug: jest.fn(() => undefined),
  }
}));

type MockSocket = {
  connected: boolean;
  on: jest.Mock<any>;
  emit: jest.Mock<boolean, [string, Message]>;
  connect: jest.Mock<void>;
  disconnect: jest.Mock<void>;
  removeAllListeners: jest.Mock<void>;
} & Partial<Socket<DefaultEventsMap>>;

interface EventMap {
  connect: () => void;
  disconnect: (reason: string) => void;
  message: (data: Message) => void;
  error: (error: Error) => void;
  'connect_error': (error: Error) => void;
}

describe('Socket Service', () => {
  let mockSocket: MockSocket;
  const mockToken = 'mock-token';

  // 创建测试消息
  const mockMessage: Message = {
    id: '1',
    role: MessageRole.USER,
    content: 'Hello',
    timestamp: new Date().toISOString()
  };

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();

    // 创建mock socket实例
    mockSocket = {
      connected: false,
      connect: jest.fn(() => undefined),
      disconnect: jest.fn(() => undefined),
      removeAllListeners: jest.fn(() => undefined),
      on: jest.fn().mockImplementation((event: keyof EventMap, handler: EventMap[keyof EventMap]) => {
        // 存储事件处理器以便后续触发
        if (event === 'connect') {
          mockSocket.connected = true;
          (handler as EventMap['connect'])();
        }
        if (event === 'disconnect') {
          mockSocket.connected = false;
          (handler as EventMap['disconnect'])('io client disconnect');
        }
        if (event === 'message') {
          (handler as EventMap['message'])(mockMessage);
        }
        if (event === 'error') {
          (handler as EventMap['error'])(new Error('Socket error'));
        }
        if (event === 'connect_error') {
          mockSocket.connected = false;
          (handler as EventMap['connect_error'])(new Error('Connection failed'));
        }
        return mockSocket;
      }),
      emit: jest.fn().mockImplementation(() => {
        if (!mockSocket.connected) {
          return false;
        }
        return true;
      })
    } as MockSocket;

    // Mock io创建socket
    (io as jest.Mock).mockReturnValue(mockSocket);
  });

  describe('Connection Management', () => {
    it('should initialize socket connection with correct config', () => {
      socketService.connect(mockToken);

      expect(io).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          auth: { token: mockToken },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 5000,
          timeout: 10000,
        })
      );
      expect(logger.info).toHaveBeenCalledWith('Socket connection initiated');
    });

    it('should not initialize new connection if already connected', () => {
      mockSocket.connected = true;
      socketService.connect(mockToken);

      expect(io).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith('Socket is already connected');
    });

    it('should handle connection success', async () => {
      socketService.connect(mockToken);
      const connectHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'connect')?.[1] as EventMap['connect'];

      if (connectHandler) {
        connectHandler();
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      expect(socketService.isConnected()).toBe(true);
      expect(logger.info).toHaveBeenCalledWith('Socket connected successfully');
    });

    it('should handle disconnection', () => {
      socketService.connect(mockToken);
      const disconnectHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'disconnect')?.[1] as EventMap['disconnect'];

      if (disconnectHandler) {
        disconnectHandler('io client disconnect');
      }

      expect(socketService.isConnected()).toBe(false);
      expect(logger.info).toHaveBeenCalledWith('Socket disconnected:', 'io client disconnect');
    });

    it('should cleanup on manual disconnect', () => {
      socketService.connect(mockToken);
      socketService.disconnect();

      expect(mockSocket.removeAllListeners).toHaveBeenCalled();
      expect(mockSocket.disconnect).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Socket disconnected successfully');
    });
  });

  describe('Message Handling', () => {
    beforeEach(async () => {
      socketService.connect(mockToken);
      mockSocket.connected = true;
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    it('should send message when connected', async () => {
      const result = socketService.sendMessage(mockMessage);
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(result).toBe(true);
      expect(mockSocket.emit).toHaveBeenCalledWith('message', mockMessage);
      expect(logger.debug).toHaveBeenCalledWith('Message sent:', mockMessage);
    });

    it('should not send message when disconnected', async () => {
      mockSocket.connected = false;
      const result = socketService.sendMessage(mockMessage);
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(result).toBe(false);
      expect(mockSocket.emit).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith('Cannot send message: Socket not connected');
    });

    it('should handle received messages', async () => {
      const mockHandler = jest.fn();
      socketService.onMessage(mockHandler);

      const messageHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'message')?.[1] as EventMap['message'];

      if (messageHandler) {
        messageHandler(mockMessage);
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      expect(mockHandler).toHaveBeenCalledWith(mockMessage);
      expect(logger.debug).toHaveBeenCalledWith('Message received:', mockMessage);
    });

    it('should handle message sending error', async () => {
      mockSocket.emit.mockImplementationOnce(() => {
        throw new Error('Send error');
      });

      const result = socketService.sendMessage(mockMessage);
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(result).toBe(false);
      expect(logger.error).toHaveBeenCalledWith('Failed to send message:', expect.any(Error));
    });
  });

  describe('Error Handling', () => {
    beforeEach(async () => {
      socketService.connect(mockToken);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    it('should handle connection error', () => {
      const mockError = new Error('Connection failed');
      const errorHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'connect_error')?.[1] as EventMap['connect_error'];

      if (errorHandler) {
        errorHandler(mockError);
      }

      expect(logger.warn).toHaveBeenCalledWith(
        'Socket connection error, attempting reconnect:',
        mockError
      );
      expect(socketService.isConnected()).toBe(false);
    });

    it('should handle socket error', () => {
      const mockError = new Error('Socket error');
      const errorHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'error')?.[1] as EventMap['error'];

      if (errorHandler) {
        errorHandler(mockError);
      }

      expect(logger.error).toHaveBeenCalledWith('Socket error:', mockError);
    });

    it('should handle max reconnection attempts', () => {
      const mockError = new Error('Connection failed');
      const errorHandler = mockSocket.on.mock.calls
        .find(call => call[0] === 'connect_error')?.[1] as EventMap['connect_error'];

      if (errorHandler) {
        for (let i = 0; i < 6; i++) {
          errorHandler(mockError);
        }
      }

      expect(logger.error).toHaveBeenCalledWith('Max reconnection attempts reached, giving up');
      expect(socketService.isConnected()).toBe(false);
    });
  });
}); 