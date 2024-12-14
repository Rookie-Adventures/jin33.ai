import { render, screen, fireEvent } from '@/test/test-utils';
import { useAuthStore } from '@/store/auth';
import type { AuthState } from '@/types/auth.types';
import App from '@/App';
import React from 'react';

// Mock useAuthStore
const mockUseAuthStore = useAuthStore as unknown as jest.MockedFunction<typeof useAuthStore>;
jest.mock('@/store/auth', () => ({
    useAuthStore: jest.fn()
}));

// Mock AuthState
const createMockAuthState = (isAuthenticated: boolean): AuthState => ({
    isAuthenticated,
    user: null,
    token: null,
    error: null,
    login: jest.fn(),
    logout: jest.fn(),
    setAuth: jest.fn(),
    setError: jest.fn()
});

describe('Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseAuthStore.mockImplementation((selector) =>
            selector(createMockAuthState(false))
        );
    });

    describe('导航功能', () => {
        it('应该能正确导航到公共页面', () => {
            render(<App />, {
                routerProps: { initialEntries: ['/'] }
            });

            const links = [
                { text: '登录', path: '/login' },
                { text: '注册', path: '/register' },
                { text: '首页', path: '/' }
            ];

            links.forEach(({ text, path }) => {
                const link = screen.getByText(text);
                fireEvent.click(link);
                expect(window.location.pathname).toBe(path);
            });
        });

        it('未登录时访问受保护页面应重定向到登录', () => {
            render(<App />, {
                routerProps: { initialEntries: ['/chat'] }
            });

            expect(window.location.pathname).toBe('/login');
        });

        it('已登录时可以访问受保护页面', () => {
            mockUseAuthStore.mockImplementation((selector) =>
                selector(createMockAuthState(true))
            );

            render(<App />, {
                routerProps: { initialEntries: ['/chat'] }
            });

            expect(window.location.pathname).toBe('/chat');
        });
    });

    describe('404处理', () => {
        it('访问不存在的路由应显示404页面', () => {
            render(<App />, {
                routerProps: { initialEntries: ['/non-existent'] }
            });

            expect(screen.getByText(/404/i)).toBeInTheDocument();
            expect(screen.getByText(/页面不存在/i)).toBeInTheDocument();
        });
    });
}); 