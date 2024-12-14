import type { User } from '@/types/auth.types';
import { storage } from '@/utils/storage';
import { create } from 'zustand';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  error: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storage.get('user'),
  token: storage.get('token'),
  isAuthenticated: !!storage.get('token'),
  error: null,

  login: (user: User, token: string) => {
    storage.set('user', user);
    storage.set('token', token);
    set({
      user,
      token,
      isAuthenticated: true,
      error: null
    });
  },

  logout: () => {
    storage.remove('user');
    storage.remove('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null
    });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));
