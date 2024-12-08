import { create } from 'zustand';
import { AuthState, User } from '@/types';
import { storage } from '@/utils/storage';

const useAuthStore = create<AuthState>((set) => ({
  user: storage.get('user'),
  token: storage.get('token'),
  isAuthenticated: !!storage.get('token'),
  loading: false,
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

export { useAuthStore };
