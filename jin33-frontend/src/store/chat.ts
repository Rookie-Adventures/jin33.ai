import { create } from 'zustand';
import { ChatState, SendMessageParams, CreateChatParams, UpdateChatParams } from '../types/chat.types';
import { chatService } from '../services/chat';

interface ChatStore extends ChatState {
  // Actions
  fetchChats: () => Promise<void>;
  createChat: (params: CreateChatParams) => Promise<void>;
  updateChat: (params: UpdateChatParams) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  sendMessage: (params: SendMessageParams) => Promise<void>;
  clearChats: () => Promise<void>;
  setCurrentChat: (chatId: string | null) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // State
  chats: [],
  currentChat: null,
  loading: false,
  error: null,

  // Actions
  fetchChats: async () => {
    try {
      set({ loading: true, error: null });
      const chats = await chatService.getChats();
      set({ chats });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createChat: async (params) => {
    try {
      set({ loading: true, error: null });
      const newChat = await chatService.createChat(params);
      set(state => ({
        chats: [newChat, ...state.chats],
        currentChat: newChat,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateChat: async (params) => {
    try {
      set({ loading: true, error: null });
      const updatedChat = await chatService.updateChat(params);
      set(state => ({
        chats: state.chats.map(chat =>
          chat.id === params.chatId ? updatedChat : chat
        ),
        currentChat: state.currentChat?.id === params.chatId
          ? updatedChat
          : state.currentChat,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteChat: async (chatId) => {
    try {
      set({ loading: true, error: null });
      await chatService.deleteChat(chatId);
      set(state => ({
        chats: state.chats.filter(chat => chat.id !== chatId),
        currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (params) => {
    try {
      set({ loading: true, error: null });
      const messages = await chatService.sendMessage(params);
      const updatedChat = await chatService.getChat(params.chatId || get().currentChat?.id || '');

      if (updatedChat) {
        set(state => ({
          chats: state.chats.map(chat =>
            chat.id === updatedChat.id ? updatedChat : chat
          ),
          currentChat: updatedChat,
        }));
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  clearChats: async () => {
    try {
      set({ loading: true, error: null });
      await chatService.clearChats();
      set({ chats: [], currentChat: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  setCurrentChat: async (chatId) => {
    try {
      if (!chatId) {
        set({ currentChat: null });
        return;
      }

      const chat = await chatService.getChat(chatId);
      set({ currentChat: chat });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
