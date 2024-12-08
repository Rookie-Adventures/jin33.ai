export interface User {
  id: string;
  username: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  confirmPassword: string;
}

export interface AuthResponse {
  code: number;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setError: (error: string | null) => void;
}
