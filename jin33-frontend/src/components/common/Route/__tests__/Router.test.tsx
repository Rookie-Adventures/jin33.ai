import { render, screen, fireEvent } from '@/test/test-utils';
import { useAuth } from '@/hooks/useAuth';
import App from '@/App';
import { routes } from '../config';
import type { RouteConfig } from '@/types/route.types';
import type { User } from '@/types/user.types';

// Mock useAuth hook
jest.mock('@/hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock user data
const mockUser: User = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg'
};

describe('Router Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            token: null,
            login: jest.fn(),
            logout: jest.fn(),
            error: null
        });
    });

    describe('Configuration', () => {
        it('should have valid route configurations', () => {
            routes.forEach((route: RouteConfig) => {
                expect(route).toHaveProperty('path');
                expect(route).toHaveProperty('component');
                expect(typeof route.path).toBe('string');
                expect(typeof route.component).toBe('function');
            });
        });

        it('should have unique paths', () => {
            const paths = routes.map(route => route.path);
            const uniquePaths = new Set(paths);
            expect(paths.length).toBe(uniquePaths.size);
        });

        it('should have all required routes', () => {
            const requiredPaths = ['/', '/login', '/chat', '/profile'];
            requiredPaths.forEach(path => {
                expect(routes.some(route => route.path === path)).toBeTruthy();
            });
        });
    });

    describe('Route Rendering', () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: mockUser,
                isAuthenticated: true,
                token: 'mock-token',
                login: jest.fn(),
                logout: jest.fn(),
                error: null
            });
        });

        test.each([
            { path: '/login', expectedText: /登录/i },
            { path: '/register', expectedText: /注册/i },
            { path: '/', expectedText: /首页/i },
            { path: '/chat', expectedText: /聊天/i },
            { path: '/profile', expectedText: /个人中心/i }
        ])('should render correct component for $path', ({ path, expectedText }) => {
            render(<App />, {
                routerProps: { initialEntries: [path] }
            });

            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
    });

    describe('Authentication', () => {
        describe('Public Routes', () => {
            beforeEach(() => {
                mockUseAuth.mockReturnValue({
                    user: null,
                    isAuthenticated: false,
                    token: null,
                    login: jest.fn(),
                    logout: jest.fn(),
                    error: null
                });
            });

            test.each(['/', '/login', '/register'])(
                'should allow access to %s when not authenticated',
                (path) => {
                    render(<App />, {
                        routerProps: { initialEntries: [path] }
                    });
                    expect(window.location.pathname).toBe(path);
                }
            );
        });

        describe('Protected Routes', () => {
            describe('When Not Authenticated', () => {
                beforeEach(() => {
                    mockUseAuth.mockReturnValue({
                        user: null,
                        isAuthenticated: false,
                        token: null,
                        login: jest.fn(),
                        logout: jest.fn(),
                        error: null
                    });
                });

                test.each(['/chat', '/profile', '/settings'])(
                    'should redirect %s to login with return URL',
                    (path) => {
                        render(<App />, {
                            routerProps: { initialEntries: [path] }
                        });

                        expect(window.location.pathname).toBe('/login');
                        expect(window.location.search).toContain(`redirect=${path}`);
                    }
                );
            });

            describe('When Authenticated', () => {
                beforeEach(() => {
                    mockUseAuth.mockReturnValue({
                        user: mockUser,
                        isAuthenticated: true,
                        token: 'mock-token',
                        login: jest.fn(),
                        logout: jest.fn(),
                        error: null
                    });
                });

                test.each(['/chat', '/profile', '/settings'])(
                    'should allow access to %s',
                    (path) => {
                        render(<App />, {
                            routerProps: { initialEntries: [path] }
                        });

                        expect(window.location.pathname).toBe(path);
                    }
                );

                test.each(['/login', '/register'])(
                    'should redirect %s to home',
                    (path) => {
                        render(<App />, {
                            routerProps: { initialEntries: [path] }
                        });

                        expect(window.location.pathname).toBe('/');
                    }
                );
            });
        });
    });

    describe('Navigation', () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: mockUser,
                isAuthenticated: true,
                token: 'mock-token',
                login: jest.fn(),
                logout: jest.fn(),
                error: null
            });
        });

        it('should navigate between routes correctly', () => {
            render(<App />, {
                routerProps: { initialEntries: ['/'] }
            });

            const links = [
                { text: 'AI助手', path: '/chat' },
                { text: '个人中心', path: '/profile' },
                { text: '首页', path: '/' }
            ];

            links.forEach(({ text, path }) => {
                const link = screen.getByText(text);
                fireEvent.click(link);
                expect(window.location.pathname).toBe(path);
            });
        });
    });

    describe('Error Handling', () => {
        it('should render 404 page for non-existent routes', () => {
            mockUseAuth.mockReturnValue({
                user: mockUser,
                isAuthenticated: true,
                token: 'mock-token',
                login: jest.fn(),
                logout: jest.fn(),
                error: null
            });

            render(<App />, {
                routerProps: { initialEntries: ['/non-existent-route'] }
            });

            expect(screen.getByText(/404/i)).toBeInTheDocument();
            expect(screen.getByText(/页面不存在/i)).toBeInTheDocument();
        });
    });
}); 