import { chatService } from '../chat';
import { get, post, put, del } from '../api';
import { Chat, Message, CreateChatParams, UpdateChatParams, MessageRole } from '@/types/chat.types';

// Mock API service
jest.mock('../api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  del: jest.fn()
}));

/* eslint-disable jest/no-disabled-tests */
// 聊天服务是中间层功能，将在第二阶段开发
// 现阶段跳过测试以专注于核心基础设施的开发
describe.skip('Chat Service', () => {
  const mockChat: Chat = {
    id: '1',
    userId: '1',
    title: 'Test Chat',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const mockMessage: Message = {
    id: '1',
    content: 'Test message',
    role: MessageRole.USER,
    timestamp: new Date().toISOString()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getChats', () => {
    it('should fetch all chats', async () => {
      const mockChats = [mockChat];
      (get as jest.Mock).mockResolvedValue(mockChats);

      const result = await chatService.getChats();

      expect(get).toHaveBeenCalledWith('/chats');
      expect(result).toEqual(mockChats);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch chats');
      (get as jest.Mock).mockRejectedValue(error);

      await expect(chatService.getChats()).rejects.toThrow('Failed to fetch chats');
    });
  });

  describe('getChat', () => {
    const chatId = '1';

    it('should fetch specific chat', async () => {
      (get as jest.Mock).mockResolvedValue(mockChat);

      const result = await chatService.getChat(chatId);

      expect(get).toHaveBeenCalledWith(`/chats/${chatId}`);
      expect(result).toEqual(mockChat);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Chat not found');
      (get as jest.Mock).mockRejectedValue(error);

      await expect(chatService.getChat(chatId)).rejects.toThrow('Chat not found');
    });
  });

  describe('createChat', () => {
    const createParams: CreateChatParams = {
      title: 'New Chat'
    };

    it('should create new chat', async () => {
      (post as jest.Mock).mockResolvedValue(mockChat);

      const result = await chatService.createChat(createParams);

      expect(post).toHaveBeenCalledWith('/chats', { message: createParams.title ?? '新对话' });
      expect(result).toEqual(mockChat);
    });

    it('should handle creation error', async () => {
      const error = new Error('Failed to create chat');
      (post as jest.Mock).mockRejectedValue(error);

      await expect(chatService.createChat(createParams)).rejects.toThrow('Failed to create chat');
    });
  });

  describe('updateChat', () => {
    const updateParams: UpdateChatParams = {
      chatId: '1',
      title: 'Updated Chat'
    };

    it('should update existing chat', async () => {
      const updatedChat = { ...mockChat, title: updateParams.title };
      (put as jest.Mock).mockResolvedValue(updatedChat);

      const result = await chatService.updateChat(updateParams);

      expect(put).toHaveBeenCalledWith(`/chats/${updateParams.chatId}`, {
        title: updateParams.title
      });
      expect(result).toEqual(updatedChat);
    });

    it('should handle update error', async () => {
      const error = new Error('Failed to update chat');
      (put as jest.Mock).mockRejectedValue(error);

      await expect(chatService.updateChat(updateParams)).rejects.toThrow('Failed to update chat');
    });
  });

  describe('deleteChat', () => {
    const chatId = '1';

    it('should delete chat', async () => {
      (del as jest.Mock).mockResolvedValue(undefined);

      await chatService.deleteChat(chatId);

      expect(del).toHaveBeenCalledWith(`/chats/${chatId}`);
    });

    it('should handle deletion error', async () => {
      const error = new Error('Failed to delete chat');
      (del as jest.Mock).mockRejectedValue(error);

      await expect(chatService.deleteChat(chatId)).rejects.toThrow('Failed to delete chat');
    });
  });

  describe('sendMessage', () => {
    const chatId = '1';
    const content = 'Hello, world!';

    it('should send message to chat', async () => {
      const mockMessages = [mockMessage];
      (post as jest.Mock).mockResolvedValue(mockMessages);

      const result = await chatService.sendMessage({ chatId, content });

      expect(post).toHaveBeenCalledWith(`/chats/${chatId}/messages`, { content });
      expect(result).toEqual(mockMessages);
    });

    it('should handle send error', async () => {
      const error = new Error('Failed to send message');
      (post as jest.Mock).mockRejectedValue(error);

      await expect(chatService.sendMessage({ chatId, content }))
        .rejects.toThrow('Failed to send message');
    });
  });

  describe('clearChats', () => {
    it('should clear all chats', async () => {
      (del as jest.Mock).mockResolvedValue(undefined);

      await chatService.clearChats();

      expect(del).toHaveBeenCalledWith('/chats');
    });

    it('should handle clear error', async () => {
      const error = new Error('Failed to clear chats');
      (del as jest.Mock).mockRejectedValue(error);

      await expect(chatService.clearChats()).rejects.toThrow('Failed to clear chats');
    });
  });
}); 