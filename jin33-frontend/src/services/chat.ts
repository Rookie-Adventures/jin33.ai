import { Chat, Message, SendMessageParams, CreateChatParams, UpdateChatParams } from '../types/chat.types';
import { get, post, put, del } from './api';

export const chatService = {
  async getChats(): Promise<Chat[]> {
    return get<Chat[]>('/chats');
  },

  async getChat(chatId: string): Promise<Chat | null> {
    return get<Chat>(`/chats/${chatId}`);
  },

  async createChat(params: CreateChatParams): Promise<Chat> {
    return post<Chat>('/chats', { message: params.title ?? '新对话' });
  },

  async updateChat(params: UpdateChatParams): Promise<Chat> {
    return put<Chat>(`/chats/${params.chatId}`, {
      title: params.title
    });
  },

  async deleteChat(chatId: string): Promise<void> {
    await del(`/chats/${chatId}`);
  },

  async sendMessage(params: SendMessageParams): Promise<Message[]> {
    return post<Message[]>(`/chats/${params.chatId}/messages`, {
      content: params.content
    });
  },

  async clearChats(): Promise<void> {
    await del('/chats');
  }
};
