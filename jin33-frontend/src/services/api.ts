import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/auth';

// 环境变量类型声明
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_TIMEOUT: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// API响应类型
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 错误类型
interface ApiError {
  code: number;
  message: string;
  errors?: string[];
}

// 请求数据类型
type RequestData = Record<string, unknown> | unknown[] | null;

// 标准错误响应类型
interface StandardError {
  code: number;
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status: number): boolean => status >= 200 && status < 300,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error)
);

// 创建标准错误响应
const createStandardError = (code: number, message: string): StandardError => ({
  code,
  message,
});

// 响应拦截器
api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError<ApiError>) => {
    // 处理请求超时
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      return Promise.reject(createStandardError(408, '请求超时，请稍后重试'));
    }

    // 处理网络错误
    if (!error.response) {
      return Promise.reject(createStandardError(0, '网络错误，请检查网络连接'));
    }

    const { status, data } = error.response;

    // 处理401未授权
    if (status === 401) {
      useAuthStore.getState().logout();
      return Promise.reject(createStandardError(401, '登录已过期，请重新登录'));
    }

    // 处理403禁止访问
    if (status === 403) {
      return Promise.reject(createStandardError(403, '没有权限访问该资源'));
    }

    // 处理404未找到
    if (status === 404) {
      return Promise.reject(createStandardError(404, '请求的资源不存在'));
    }

    // 处理500服务器错误
    if (status >= 500) {
      return Promise.reject(createStandardError(status, '服务器错误，请稍后重试'));
    }

    // 返回服务器的错误信息
    return Promise.reject(data ?? createStandardError(status, '请求失败'));
  }
);

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.get<unknown, T>(url, config);

export const post = <T>(url: string, data: RequestData = null, config?: AxiosRequestConfig): Promise<T> =>
  api.post<unknown, T>(url, data, config);

export const put = <T>(url: string, data: RequestData = null, config?: AxiosRequestConfig): Promise<T> =>
  api.put<unknown, T>(url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.delete<unknown, T>(url, config);

// 导出类型
export type { ApiResponse, ApiError, RequestData };
