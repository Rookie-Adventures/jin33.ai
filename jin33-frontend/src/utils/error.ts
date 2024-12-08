import { ApiResponse } from '@/types';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

interface ApiError {
  code: number;
  message: string;
  data: null;
}

export const handleApiError = async <T>(
  promise: Promise<T>
): Promise<[T | null, ApiError | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as ApiError];
  }
};

// 错误码映射
export const ErrorMessages: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
};

// 全局错误处理
export const globalErrorHandler = (error: Error): void => {
  console.error('Global Error:', error);
  // 这里可以添加错误上报逻辑
};

// 异步错误包装器
export const asyncErrorWrapper = async <T>(
  promise: Promise<T>
): Promise<[T | null, AppError | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    if (error instanceof AppError) {
      return [null, error];
    }
    return [null, new AppError('网络错误，请稍后重试')];
  }
};
