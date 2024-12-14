import { ApiError, ApiResponse } from '@/types/api.types';

export const handleApiError = async <T>(promise: Promise<ApiResponse<T>>): Promise<[T | null, ApiError | null]> => {
  try {
    const response = await promise;
    return [response.data, null];
  } catch (error) {
    const apiError: ApiError = {
      code: (error as any)?.response?.status || 500,
      message: (error as any)?.response?.data?.message || '发生未知错误',
      data: (error as any)?.response?.data
    };
    return [null, apiError];
  }
};

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}
