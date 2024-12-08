import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.get(url, config);

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  api.post(url, data, config);

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  api.put(url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.delete(url, config);
