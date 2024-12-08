import { LoginParams, RegisterParams, AuthResponse } from '@/types';
import { post } from './api';

// Mock数据
const MOCK_USER = {
  id: '1',
  username: 'test',
  role: 'user' as const,
  createdAt: new Date().toISOString()
};

const MOCK_TOKEN = 'mock_token_12345';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const login = async (params: LoginParams): Promise<AuthResponse> => {
  // 模拟API调用
  await delay(1000);

  // 模拟验证
  if (params.username === 'test' && params.password === 'test123') {
    return {
      code: 200,
      data: {
        user: MOCK_USER,
        token: MOCK_TOKEN
      },
      message: '登录成功'
    };
  }

  throw {
    code: 401,
    message: '用户名或密码错误',
    data: null
  };
};

const register = async (params: RegisterParams): Promise<AuthResponse> => {
  // 模拟API调用
  await delay(1000);

  // 模拟验证
  if (params.username === 'test') {
    throw {
      code: 400,
      message: '用户名已存在',
      data: null
    };
  }

  return {
    code: 200,
    data: {
      user: {
        ...MOCK_USER,
        username: params.username
      },
      token: MOCK_TOKEN
    },
    message: '注册成功'
  };
};

export const authService = {
  login,
  register
};
