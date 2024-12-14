import type { ApiResponse, StatusCode, ResponseStatus } from './api.types';
import type { ID } from './index';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

// Auth Request Types
export interface LoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  agreement: boolean;
}

// Auth Response Types
export interface AuthResponseData {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export type AuthResponse = ApiResponse<AuthResponseData>;

// Auth State Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  error: string | null;
}

// Auth Props Types
export interface AuthPageProps {
  onSuccess?: (response: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectUrl?: string;
}

export type LoginPageProps = AuthPageProps;
export type RegisterPageProps = AuthPageProps;

// Auth Error Types
export interface AuthError {
  code: StatusCode;
  message: string;
  field?: string;
}
