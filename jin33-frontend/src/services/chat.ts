import { v4 as uuidv4 } from 'uuid';
import { Chat, Message, SendMessageParams, CreateChatParams, UpdateChatParams } from '../types/chat.types';

// Mock assistant response
const mockAssistantResponse = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟延迟
  return `这是一个模拟的回复: "${message}"`;
};

export const chatService = {
  // 获取聊天列表
  getChats: async (): Promise<Chat[]> => {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [];
  },

  // 获取单个聊天
  getChat: async (chatId: string): Promise<Chat | null> => {
    const chats = await chatService.getChats();
    return chats.find(chat => chat.id === chatId) || null;
  },

  // 创建新聊天
  createChat: async (params: CreateChatParams): Promise<Chat> => {
    const chats = await chatService.getChats();
    const newChat: Chat = {
      id: uuidv4(),
      title: params.title || '新对话',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (params.systemPrompt) {
      newChat.messages.push({
        id: uuidv4(),
        role: 'system',
        content: params.systemPrompt,
        timestamp: new Date().toISOString(),
      });
    }

    chats.unshift(newChat);
    localStorage.setItem('chats', JSON.stringify(chats));
    return newChat;
  },

  // 更新聊天
  updateChat: async (params: UpdateChatParams): Promise<Chat> => {
    const chats = await chatService.getChats();
    const chatIndex = chats.findIndex(chat => chat.id === params.chatId);

    if (chatIndex === -1) {
      throw new Error('Chat not found');
    }

    const updatedChat = {
      ...chats[chatIndex],
      title: params.title || chats[chatIndex].title,
      updatedAt: new Date().toISOString(),
    };

    chats[chatIndex] = updatedChat;
    localStorage.setItem('chats', JSON.stringify(chats));
    return updatedChat;
  },

  // 删除聊天
  deleteChat: async (chatId: string): Promise<void> => {
    const chats = await chatService.getChats();
    const filteredChats = chats.filter(chat => chat.id !== chatId);
    localStorage.setItem('chats', JSON.stringify(filteredChats));
  },

  // 发送消息
  sendMessage: async (params: SendMessageParams): Promise<Message[]> => {
    const chats = await chatService.getChats();
    let chat: Chat;

    if (params.chatId) {
      const chatIndex = chats.findIndex(c => c.id === params.chatId);
      if (chatIndex === -1) {
        throw new Error('Chat not found');
      }
      chat = chats[chatIndex];
    } else {
      chat = await chatService.createChat({});
    }

    // 添加用户消息
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: params.content,
      timestamp: new Date().toISOString(),
    };
    chat.messages.push(userMessage);

    // 模拟助手回复
    const assistantResponse = await mockAssistantResponse(params.content);
    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date().toISOString(),
    };
    chat.messages.push(assistantMessage);

    chat.updatedAt = new Date().toISOString();
    localStorage.setItem('chats', JSON.stringify(chats));

    return chat.messages;
  },

  // 清空所有聊天
  clearChats: async (): Promise<void> => {
    localStorage.setItem('chats', JSON.stringify([]));
  },
};
