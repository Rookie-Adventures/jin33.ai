import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat.types';
import { logger } from '../utils/logger';

type MessageHandler = (data: unknown) => void;
type ConnectionState = 'not_initialized' | 'connecting' | 'connected' | 'disconnected';

class SocketService {
  private socket: Socket | null = null;
  private connectionState: ConnectionState = 'not_initialized';
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectInterval = 5000; // 5 seconds
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageHandlers: MessageHandler[] = [];

  connect(token: string): void {
    if ((this.socket?.connected ?? false) || this.connectionState === 'connecting') {
      logger.warn('Socket is already connected');
      return;
    }

    try {
      this.socket = io(process.env.VITE_SOCKET_URL ?? 'http://localhost:3000', {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectInterval,
        timeout: 10000,
      });

      this.connectionState = 'connecting';
      this.setupEventListeners();
      logger.info('Socket connection initiated');
    } catch (error) {
      logger.error('Failed to initialize socket connection:', error);
      this.connectionState = 'disconnected';
      this.handleReconnect();
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) {
      logger.error('Cannot setup listeners: Socket not initialized');
      return;
    }

    this.socket.on('connect', () => {
      this.connectionState = 'connected';
      this.resetReconnectState();
      logger.info('Socket connected successfully');
    });

    this.socket.on('disconnect', (reason: string) => {
      this.connectionState = 'disconnected';
      logger.info('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        this.handleReconnect();
      }
    });

    this.socket.on('connect_error', (error: Error) => {
      this.connectionState = 'disconnected';
      logger.warn('Socket connection error, attempting reconnect:', error);
      this.handleReconnect();
    });

    this.socket.on('error', (error: Error) => {
      logger.error('Socket error:', error);
    });

    this.socket.on('reconnect', () => {
      this.connectionState = 'connected';
      this.resetReconnectState();
      logger.info('Socket reconnected successfully');
    });

    this.socket.on('reconnect_attempt', () => {
      this.connectionState = 'connecting';
      logger.debug('Socket reconnection attempt');
    });

    this.socket.on('reconnect_error', (error: Error) => {
      logger.error('Socket reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      this.connectionState = 'disconnected';
      logger.error('Socket reconnection failed');
    });

    this.socket.on('message', (data: unknown) => {
      logger.debug('Message received:', data);
      this.messageHandlers.forEach(handler => handler(data));
    });
  }

  private handleReconnect(): void {
    this.reconnectAttempts++;
    logger.debug(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('Max reconnection attempts reached, giving up');
      this.disconnect();
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      if (this.connectionState === 'disconnected') {
        this.connectionState = 'connecting';
        this.socket?.connect();
      }
    }, this.reconnectInterval);
  }

  private resetReconnectState(): void {
    this.reconnectAttempts = 0;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  disconnect(): void {
    if (!this.socket) {
      logger.warn('Cannot disconnect: Socket not initialized');
      return;
    }

    try {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.connectionState = 'disconnected';
      this.resetReconnectState();
      this.messageHandlers = [];
      logger.info('Socket disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect socket:', error);
    }
  }

  sendMessage(message: Message): boolean {
    if (!this.socket?.connected || this.connectionState !== 'connected') {
      logger.warn('Cannot send message: Socket not connected');
      return false;
    }

    try {
      this.socket.emit('message', message);
      logger.debug('Message sent:', message);
      return true;
    } catch (error) {
      logger.error('Failed to send message:', error);
      return false;
    }
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  isConnected(): boolean {
    return this.connectionState === 'connected' && this.socket?.connected === true;
  }

  getConnectionState(): ConnectionState {
    return this.connectionState;
  }
}

export const socketService = new SocketService();
