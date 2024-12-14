import { render, screen } from '@/test/test-utils';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuthStore } from '@/store/auth';
import type { AuthState } from '@/types/auth.types';
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

describe('PrivateRoute', () => {
    const MockComponent = (): JSX.Element => <div>Protected Content</div>;
    const mockRoute = {
        path: '/protected',
        component: MockComponent,
        auth: true,
        title: 'Protected Page'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('未登录时重定向到登录页', () => {
        mockUseAuthStore.mockImplementation((selector) =>
            selector(createMockAuthState(false))
        );

        render(
            <Routes>
                <Route
                    path="/protected"
                    element={<PrivateRoute route={mockRoute} />}
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>,
            {
                routerProps: { initialEntries: ['/protected'] }
            }
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('已登录时正常显示组件', () => {
        mockUseAuthStore.mockImplementation((selector) =>
            selector(createMockAuthState(true))
        );

        render(
            <Routes>
                <Route
                    path="/protected"
                    element={<PrivateRoute route={mockRoute} />}
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>,
            {
                routerProps: { initialEntries: ['/protected'] }
            }
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });

    it('处理认证状态变化', () => {
        mockUseAuthStore.mockImplementation((selector) =>
            selector(createMockAuthState(true))
        );

        const { rerender } = render(
            <Routes>
                <Route
                    path="/protected"
                    element={<PrivateRoute route={mockRoute} />}
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>,
            {
                routerProps: { initialEntries: ['/protected'] }
            }
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();

        // 模拟登出
        mockUseAuthStore.mockImplementation((selector) =>
            selector(createMockAuthState(false))
        );

        rerender(
            <Routes>
                <Route
                    path="/protected"
                    element={<PrivateRoute route={mockRoute} />}
                />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
}); 