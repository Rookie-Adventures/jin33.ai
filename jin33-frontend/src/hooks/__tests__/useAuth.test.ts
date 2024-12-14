import { act, renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { useAuthStore } from '@/store/auth';
import { User, UserRole, UserStatus } from '@/types/auth.types';

// Mock zustand store
jest.mock('@/store/auth', () => ({
    useAuthStore: jest.fn(() => ({
        user: null,
        token: null,
        login: jest.fn(),
        logout: jest.fn(),
    }))
}));

describe('useAuth', () => {
    const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return isAuthenticated as true when token exists', () => {
        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            token: 'valid-token'
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('should return isAuthenticated as false when token does not exist', () => {
        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            token: null
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should return isAuthenticated as false when token is empty string', () => {
        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            token: ''
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle login', () => {
        const mockLogin = jest.fn();
        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            token: null,
            login: mockLogin
        });

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.login(mockUser, 'test-token');
        });

        expect(mockLogin).toHaveBeenCalledWith(mockUser, 'test-token');
    });

    it('should handle logout', () => {
        const mockLogout = jest.fn();
        (useAuthStore as unknown as jest.Mock).mockReturnValue({
            token: 'valid-token',
            logout: mockLogout
        });

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.logout();
        });

        expect(mockLogout).toHaveBeenCalled();
    });
}); 