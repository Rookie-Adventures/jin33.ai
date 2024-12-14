import { storage } from './storage';
import { AppError } from './error';

interface HealthStatus {
  auth: {
    isAuthenticated: boolean;
    hasToken: boolean;
    hasUser: boolean;
  };
  storage: {
    isAvailable: boolean;
    hasErrors: boolean;
  };
}

export const checkHealth = (): HealthStatus => {
  // 检查存储状态
  let storageAvailable = true;
  let storageHasErrors = false;

  try {
    storage.set('health_check', 'test');
    storage.remove('health_check');
  } catch (error) {
    storageAvailable = false;
    storageHasErrors = true;
  }

  // 检查认证状态
  const token = storage.get('token') as string | null;
  const user = storage.get('user') as unknown;

  return {
    auth: {
      isAuthenticated: !!token,
      hasToken: !!token,
      hasUser: !!user,
    },
    storage: {
      isAvailable: storageAvailable,
      hasErrors: storageHasErrors,
    },
  };
};

export const validateAuthState = (): void => {
  const health = checkHealth();

  if (!health.storage.isAvailable) {
    throw new AppError('本地存储不可用，请检查浏览器设置');
  }

  if (health.auth.hasToken !== health.auth.hasUser) {
    // 状态不一致，清理认证信息
    storage.remove('token');
    storage.remove('user');
    throw new AppError('认证状态异常，请重新登录');
  }
};
