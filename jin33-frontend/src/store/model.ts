import { Model } from '@/types/model.types';
import { create } from 'zustand';

interface ModelState {
  selectedModel: Model | null;
  models: Model[];
  loading: boolean;
  error: string | null;
  
  setSelectedModel: (model: Model | null) => void;
  clearSelection: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: null,
  models: [],
  loading: false,
  error: null,
  
  setSelectedModel: (model: Model | null) => {
    set({ selectedModel: model });
  },
  
  clearSelection: () => {
    set({ selectedModel: null });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  }
}));