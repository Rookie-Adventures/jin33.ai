import { useCallback } from 'react';
import { useAuthStore } from '../store/auth';
import { User } from '../types/auth.types';

export const useAuth = () => {
  const { user, isAuthenticated, token, login, logout, error } = useAuthStore();

  const handleLogin = useCallback(
    (user: User, token: string) => {
      login(user, token);
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user,
    isAuthenticated,
    token,
    login: handleLogin,
    logout: handleLogout,
    error
  };
};

export default useAuth;
