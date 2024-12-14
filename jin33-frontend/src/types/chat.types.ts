import type { ApiResponse, ResponseStatus } from './api.types';
import type { ID, Nullable } from './index';
import type { User } from './auth.types';

// Message Types
export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface Message {
  id: ID;
  role: MessageRole;
  content: string;
  timestamp: string;
  user?: User;
}

// Chat Types
export interface Chat {
  id: ID;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  userId: ID;
  systemPrompt?: string;
}

// Chat State Types
export interface ChatState {
  chats: Chat[];
  currentChat: Nullable<Chat>;
  status: ResponseStatus;
  error: Nullable<string>;
}

// Chat Request Types
export interface SendMessageParams {
  content: string;
  chatId?: ID;
  role?: MessageRole;
}

export interface CreateChatParams {
  title?: string;
  systemPrompt?: string;
  initialMessage?: string;
}

export interface UpdateChatParams {
  chatId: ID;
  title?: string;
  systemPrompt?: string;
}

// Chat Response Types
export type ChatResponse = ApiResponse<Chat>;
export type ChatsResponse = ApiResponse<Chat[]>;
export type MessageResponse = ApiResponse<Message>;

// Chat Error Types
export interface ChatError {
  message: string;
  chatId?: ID;
  messageId?: ID;
}
