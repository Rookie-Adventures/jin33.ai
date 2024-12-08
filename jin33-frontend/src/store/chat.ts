import { create } from 'zustand';
import { Message, Chat, ChatState } from '@/types/chat.types';
import { v4 as uuidv4 } from 'uuid';

const initialState: ChatState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
};

export const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,

  setCurrentChat: (chat: Chat | null) => {
    set({ currentChat: chat });
  },

  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
    const { currentChat } = get();
    if (!currentChat) return;

    const newMessage: Message = {
      ...message,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      currentChat: {
        ...currentChat,
        messages: [...currentChat.messages, newMessage],
      },
    }));
  },

  createChat: (title: string = '新对话') => {
    const newChat: Chat = {
      id: uuidv4(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      chats: [...state.chats, newChat],
      currentChat: newChat,
    }));

    return newChat;
  },

  updateChat: (chatId: string, updates: Partial<Chat>) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, ...updates } : chat
      ),
      currentChat:
        state.currentChat?.id === chatId
          ? { ...state.currentChat, ...updates }
          : state.currentChat,
    }));
  },

  deleteChat: (chatId: string) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
    }));
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
}));
