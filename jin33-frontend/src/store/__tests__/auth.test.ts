import { act, renderHook } from '@testing-library/react';
import { useAuthStore } from '../auth';

describe('Auth Store', () => {
    it('sets auth correctly', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setAuth({ name: 'Test User' }, 'token', 'refreshToken');
        });

        expect(result.current.user).toEqual({ name: 'Test User' });
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('logs out correctly', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBe(null);
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('sets error correctly', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setError('An error occurred');
        });

        expect(result.current.error).toBe('An error occurred');
    });
}); 