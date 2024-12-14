import { AuthResponse, LoginParams, RegisterParams, User } from '../types/auth.types';
import { UserRole, UserStatus } from '../types/auth.types';
import { ResponseStatus, StatusCode, ApiError } from '../types/api.types';
import { isValidEmail } from '@/utils/validation';
import { post } from './api';

// Mock数据 - 仅用于测试
const MOCK_USER: Readonly<User> = {
  id: '1',
  name: 'test',
  email: 'test@example.com',
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
} as const;

const MOCK_TOKEN = 'mock_token_12345';
const MOCK_REFRESH_TOKEN = 'mock_refresh_token';
const TOKEN_EXPIRES_IN = 3600;

// 创建类型安全的错误
const createError = (code: StatusCode, message: string): ApiError => ({
  code,
  message,
  data: null
});

// 验证函数
const validateEmail = (email: string): void => {
  if (!email) {
    throw createError(StatusCode.BAD_REQUEST, '邮箱不能为空');
  }
  if (!isValidEmail(email)) {
    throw createError(StatusCode.BAD_REQUEST, '邮箱格式不正确');
  }
};

const validatePassword = (password: string): void => {
  if (!password) {
    throw createError(StatusCode.BAD_REQUEST, '密码不能为空');
  }
};

const validateRegisterPassword = (password: string, confirmPassword: string): void => {
  if (password.length < 6) {
    throw createError(StatusCode.BAD_REQUEST, '密码长度不能小于6位');
  }
  if (password !== confirmPassword) {
    throw createError(StatusCode.BAD_REQUEST, '两次输入的密码不一致');
  }
};

// 类型安全的参数转换
const toRequestData = <T>(params: T): Record<string, unknown> => {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Invalid params: must be an object');
  }

  return Object.entries(params as object).reduce<Record<string, unknown>>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const login = async (params: LoginParams): Promise<AuthResponse> => {
  // 验证输入
  validateEmail(params.email);
  validatePassword(params.password);

  if (process.env.NODE_ENV === 'test') {
    // 测试环境使用模拟数据
    if (params.email === 'test@example.com' && params.password === 'test123') {
      return {
        code: StatusCode.SUCCESS,
        status: ResponseStatus.SUCCESS,
        data: {
          user: MOCK_USER,
          token: MOCK_TOKEN,
          refreshToken: MOCK_REFRESH_TOKEN,
          expiresIn: TOKEN_EXPIRES_IN
        },
        message: '登录成功'
      };
    }
    throw createError(StatusCode.UNAUTHORIZED, '用户名或密码错误');
  }

  // 生产环境使用真实 API
  return post<AuthResponse>('/auth/login', toRequestData(params));
};

const register = async (params: RegisterParams): Promise<AuthResponse> => {
  // 验证输入
  validateEmail(params.email);
  validateRegisterPassword(params.password, params.confirmPassword);

  if (!params.agreement) {
    throw createError(StatusCode.BAD_REQUEST, '请同意用户协议');
  }

  if (!params.name) {
    throw createError(StatusCode.BAD_REQUEST, '用户名不能为空');
  }

  if (process.env.NODE_ENV === 'test') {
    // 测试环境使用模拟数据
    if (params.email === 'test@example.com') {
      throw createError(StatusCode.BAD_REQUEST, '用户已存在');
    }

    return {
      code: StatusCode.SUCCESS,
      status: ResponseStatus.SUCCESS,
      data: {
        user: {
          ...MOCK_USER,
          id: '2',
          email: params.email,
          name: params.name
        },
        token: MOCK_TOKEN,
        refreshToken: MOCK_REFRESH_TOKEN,
        expiresIn: TOKEN_EXPIRES_IN
      },
      message: '注册成功'
    };
  }

  // 生产环境使用真实 API
  return post<AuthResponse>('/auth/register', toRequestData(params));
};

export const authService = {
  login,
  register
} as const;
