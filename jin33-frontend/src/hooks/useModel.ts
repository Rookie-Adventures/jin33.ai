import { useCallback } from 'react';
import { useModelStore } from '../store/model';
import { Model } from '../types/model.types';

export const useModel = () => {
  const { selectedModel, models, loading, error } = useModelStore();

  const selectModel = useCallback((model: Model) => {
    useModelStore.getState().setSelectedModel(model);
  }, []);

  const clearSelection = useCallback(() => {
    useModelStore.getState().clearSelection();
  }, []);

  const setError = useCallback((error: string | null) => {
    useModelStore.getState().setError(error);
  }, []);

  return {
    selectedModel,
    models,
    loading,
    error,
    selectModel,
    clearSelection,
    setError
  };
};

export default useModel;
