import { LoginParams, RegisterParams } from '../types/auth.types';

// 邮箱验证
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  // 更严格的邮箱验证规则
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// 密码强度验证
export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  // 至少8个字符，包含大小写字母和数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// 用户名验证
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// 手机号验证（中国大陆）
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 表单验证错误信息
export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return !isValidEmail(value) ? '请输入有效的邮箱地址' : null;
    case 'password':
      return !isValidPassword(value) ? '密码至少8位，需包含大小写字母和数字' : null;
    case 'username':
      return !isValidUsername(value) ? '用户名3-20位，只能包含字母、数字、下划线' : null;
    case 'phone':
      return !isValidPhone(value) ? '请输入有效的手机号码' : null;
    default:
      return null;
  }
};

export const validateLoginForm = (data: LoginParams): string | null => {
  if (!data.email || !data.password) {
    return '请填写所有必填字段';
  }
  return null;
};

export const validateRegisterForm = (data: RegisterParams): string | null => {
  if (!data.email || !data.password || !data.confirmPassword) {
    return '请填写所有必填字段';
  }

  if (!isValidEmail(data.email)) {
    return '请输入有效的邮箱地址';
  }

  if (data.password !== data.confirmPassword) {
    return '两次输入的密码不一致';
  }

  if (data.password.length < 6) {
    return '密码长度不能少于6位';
  }

  return null;
};
