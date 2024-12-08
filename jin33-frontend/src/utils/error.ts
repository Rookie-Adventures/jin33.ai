import { ApiError } from '@/types/api.types';

export const handleApiError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return '发生未知错误';
};
