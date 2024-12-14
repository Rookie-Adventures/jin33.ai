import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { authService } from '../auth';
import type { LoginParams, RegisterParams } from '../../types/auth.types';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const validLoginParams: LoginParams = {
      email: 'test@example.com',
      password: 'test123',
      remember: true
    };

    const invalidLoginParams: LoginParams = {
      email: 'wrong@example.com',
      password: 'wrong',
      remember: false
    };

    it('should login successfully with valid credentials', async () => {
      const result = await authService.login(validLoginParams);
      expect(result.code).toBe(200);
      expect(result.message).toBe('登录成功');
      expect(result.data).toEqual({
        user: {
          id: expect.any(String),
          email: validLoginParams.email,
          name: expect.any(String),
          role: 'user',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          status: 'active'
        },
        token: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number)
      });
    });

    it('should fail with invalid credentials', async () => {
      await expect(authService.login(invalidLoginParams))
        .rejects.toEqual({
          code: 401,
          message: '用户名或密码错误',
          data: null
        });
    });

    it('should fail with empty email', async () => {
      await expect(authService.login({ ...validLoginParams, email: '' }))
        .rejects.toEqual({
          code: 400,
          message: '邮箱不能为空',
          data: null
        });
    });

    it('should fail with invalid email format', async () => {
      await expect(authService.login({ ...validLoginParams, email: 'invalid-email' }))
        .rejects.toEqual({
          code: 400,
          message: '邮箱格式不正确',
          data: null
        });
    });

    it('should fail with empty password', async () => {
      await expect(authService.login({ ...validLoginParams, password: '' }))
        .rejects.toEqual({
          code: 400,
          message: '密码不能为空',
          data: null
        });
    });
  });

  describe('register', () => {
    const validRegisterParams: RegisterParams = {
      email: 'newuser@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'New User',
      agreement: true
    };

    const existingUserParams: RegisterParams = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'Test User',
      agreement: true
    };

    it('should register successfully with valid parameters', async () => {
      const result = await authService.register(validRegisterParams);
      expect(result.code).toBe(200);
      expect(result.message).toBe('注册成功');
      expect(result.data).toEqual({
        user: {
          id: expect.any(String),
          email: validRegisterParams.email,
          name: validRegisterParams.name,
          role: 'user',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          status: 'active'
        },
        token: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number)
      });
    });

    it('should fail when user already exists', async () => {
      await expect(authService.register(existingUserParams))
        .rejects.toEqual({
          code: 400,
          message: '用户已存在',
          data: null
        });
    });

    it('should fail with empty email', async () => {
      await expect(authService.register({ ...validRegisterParams, email: '' }))
        .rejects.toEqual({
          code: 400,
          message: '邮箱不能为空',
          data: null
        });
    });

    it('should fail with invalid email format', async () => {
      await expect(authService.register({ ...validRegisterParams, email: 'invalid-email' }))
        .rejects.toEqual({
          code: 400,
          message: '邮箱格式不正确',
          data: null
        });
    });

    it('should fail with empty password', async () => {
      await expect(authService.register({ ...validRegisterParams, password: '' }))
        .rejects.toEqual({
          code: 400,
          message: '密码长度不能小于6位',
          data: null
        });
    });

    it('should fail with password less than 6 characters', async () => {
      await expect(authService.register({ ...validRegisterParams, password: '12345' }))
        .rejects.toEqual({
          code: 400,
          message: '密码长度不能小于6位',
          data: null
        });
    });

    it('should fail when passwords do not match', async () => {
      await expect(authService.register({
        ...validRegisterParams,
        confirmPassword: 'different123'
      }))
        .rejects.toEqual({
          code: 400,
          message: '两次输入的密码不一致',
          data: null
        });
    });

    it('should fail with empty name', async () => {
      await expect(authService.register({ ...validRegisterParams, name: '' }))
        .rejects.toEqual({
          code: 400,
          message: '用户名不能为空',
          data: null
        });
    });

    it('should fail when agreement is not accepted', async () => {
      await expect(authService.register({ ...validRegisterParams, agreement: false }))
        .rejects.toEqual({
          code: 400,
          message: '请同意用户协议',
          data: null
        });
    });
  });
}); 