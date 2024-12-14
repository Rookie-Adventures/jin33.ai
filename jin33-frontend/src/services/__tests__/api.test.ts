import { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { get, post, put, del } from '../api';
import { useAuthStore } from '@/store/auth';

// Constants
const TEST_URL = '/test';
const TIMEOUT_ERROR = { code: 'ECONNABORTED', message: 'timeout of 5000ms exceeded' };
const NETWORK_ERROR = { message: 'Network Error' };

// Mock setup
const createMockHeaders = (): AxiosHeaders => {
  const headers = new AxiosHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
};

// Mock axios
jest.mock('axios', () => {
  const actualAxios = jest.requireActual('axios');
  return {
    create: (): ReturnType<typeof actualAxios.create> => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn((handler) => {
            mockRequestHandler = handler;
            return 1;
          })
        },
        response: {
          use: jest.fn((handler, errorHandler) => {
            mockResponseHandler = handler;
            mockErrorHandler = errorHandler;
            return 1;
          })
        }
      },
      defaults: {
        headers: createMockHeaders()
      }
    }),
    AxiosHeaders: actualAxios.AxiosHeaders
  };
});

// Mock auth store
jest.mock('@/store/auth', () => ({
  useAuthStore: {
    getState: jest.fn(() => ({
      token: 'test-token',
      logout: jest.fn()
    }))
  }
}));

// Mock handlers
let mockRequestHandler: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
let mockResponseHandler: (response: AxiosResponse) => any;
let mockErrorHandler: (error: any) => Promise<never>;

describe('API Service', () => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe('Request Interceptor', () => {
    it('should add authorization header when token exists', async (): Promise<void> => {
      const config = { headers: createMockHeaders() } as InternalAxiosRequestConfig;
      const result = await mockRequestHandler(config);
      expect(result.headers?.Authorization).toBe('Bearer test-token');
    });

    it('should not add authorization header when token does not exist', async (): Promise<void> => {
      (useAuthStore.getState as jest.Mock).mockReturnValueOnce({ token: null });
      const config = { headers: createMockHeaders() } as InternalAxiosRequestConfig;
      const result = await mockRequestHandler(config);
      expect(result.headers?.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    const mockResponse = {
      data: { test: 'data' },
      status: 200,
      statusText: 'OK',
      headers: createMockHeaders(),
      config: { headers: createMockHeaders() }
    };

    it('should return response data directly', async (): Promise<void> => {
      const result = await mockResponseHandler(mockResponse);
      expect(result).toBe(mockResponse.data);
    });

    it('should handle timeout error', async (): Promise<void> => {
      await expect(mockErrorHandler(TIMEOUT_ERROR)).rejects.toEqual({
        code: 408,
        message: '请求超时，请稍后重试'
      });
    });

    it('should handle network error', async (): Promise<void> => {
      await expect(mockErrorHandler(NETWORK_ERROR)).rejects.toEqual({
        code: 0,
        message: '网络错误，请检查网络连接'
      });
    });

    it('should handle 401 unauthorized error', async (): Promise<void> => {
      const mockLogout = jest.fn();
      (useAuthStore.getState as jest.Mock).mockReturnValueOnce({ logout: mockLogout });

      await expect(mockErrorHandler({
        response: { status: 401 }
      })).rejects.toEqual({
        code: 401,
        message: '登录已过期，请重新登录'
      });
      expect(mockLogout).toHaveBeenCalled();
    });

    it('should handle 403 forbidden error', async (): Promise<void> => {
      await expect(mockErrorHandler({
        response: { status: 403 }
      })).rejects.toEqual({
        code: 403,
        message: '没有权限访问该资源'
      });
    });

    it('should handle 404 not found error', async (): Promise<void> => {
      await expect(mockErrorHandler({
        response: { status: 404 }
      })).rejects.toEqual({
        code: 404,
        message: '请求的资源不存在'
      });
    });

    it('should handle 500 server error', async (): Promise<void> => {
      await expect(mockErrorHandler({
        response: { status: 500 }
      })).rejects.toEqual({
        code: 500,
        message: '服务器错误，请稍后重试'
      });
    });
  });

  describe('HTTP Methods', () => {
    const mockData = { test: 'data' };
    const mockConfig = { headers: { 'Content-Type': 'application/json' } };

    it('should make GET request', async (): Promise<void> => {
      const result = await get(TEST_URL, mockConfig);
      expect(result).toBeDefined();
    });

    it('should make POST request', async (): Promise<void> => {
      const result = await post(TEST_URL, mockData, mockConfig);
      expect(result).toBeDefined();
    });

    it('should make PUT request', async (): Promise<void> => {
      const result = await put(TEST_URL, mockData, mockConfig);
      expect(result).toBeDefined();
    });

    it('should make DELETE request', async (): Promise<void> => {
      const result = await del(TEST_URL, mockConfig);
      expect(result).toBeDefined();
    });
  });
}); 