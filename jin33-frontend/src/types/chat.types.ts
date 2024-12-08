export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  error: string | null;
}

export interface SendMessageParams {
  content: string;
  chatId?: string;
}

export interface CreateChatParams {
  title?: string;
  systemPrompt?: string;
}

export interface UpdateChatParams {
  chatId: string;
  title?: string;
}
