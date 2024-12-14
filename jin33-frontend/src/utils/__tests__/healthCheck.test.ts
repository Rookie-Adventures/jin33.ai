import { checkHealth, validateAuthState } from '../healthCheck';
import { storage } from '../storage';
import { AppError } from '../error';

jest.mock('../storage', () => ({
    storage: {
        set: jest.fn(),
        get: jest.fn(),
        remove: jest.fn(),
    },
}));

describe('Health Check Utils', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('checkHealth', () => {
        it('should return healthy status when everything is ok', () => {
            // Mock storage operations
            (storage.set as jest.Mock).mockReturnValue(true);
            (storage.remove as jest.Mock).mockReturnValue(true);
            (storage.get as jest.Mock).mockImplementation((key: string) => {
                if (key === 'token') return 'valid-token';
                if (key === 'user') return { id: 1 };
                return null;
            });

            const health = checkHealth();

            expect(health).toEqual({
                auth: {
                    isAuthenticated: true,
                    hasToken: true,
                    hasUser: true,
                },
                storage: {
                    isAvailable: true,
                    hasErrors: false,
                },
            });

            expect(() => storage.set('health_check', 'test')).not.toThrow();
            expect(() => storage.remove('health_check')).not.toThrow();
        });

        it('should detect storage issues', () => {
            // Mock storage failure
            (storage.set as jest.Mock).mockImplementation(() => {
                throw new Error('Storage error');
            });

            const health = checkHealth();

            expect(health.storage).toEqual({
                isAvailable: false,
                hasErrors: true,
            });
        });

        it('should detect unauthenticated state', () => {
            // Mock no auth data
            (storage.set as jest.Mock).mockImplementation(() => { return true; });
            (storage.get as jest.Mock).mockReturnValue(null);

            const health = checkHealth();

            expect(health.auth).toEqual({
                isAuthenticated: false,
                hasToken: false,
                hasUser: false,
            });
        });
    });

    describe('validateAuthState', () => {
        let mockStorageRemove: jest.Mock;

        beforeEach(() => {
            mockStorageRemove = jest.fn();
            (storage.remove as jest.Mock) = mockStorageRemove;
        });

        it('should not throw error when auth state is valid', () => {
            // Mock valid auth state
            (storage.set as jest.Mock).mockImplementation(() => { return true; });
            (storage.get as jest.Mock).mockImplementation((key: string) => {
                if (key === 'token') return 'valid-token';
                if (key === 'user') return { id: 1 };
                return null;
            });

            expect(() => validateAuthState()).not.toThrow();
        });

        it('should throw error when storage is not available', () => {
            // Mock storage failure
            (storage.set as jest.Mock).mockImplementation(() => {
                throw new Error('Storage error');
            });

            expect(() => validateAuthState()).toThrow(AppError);
            expect(() => validateAuthState()).toThrow('本地存储不可用，请检查浏览器设置');
        });

        it('should throw error and clean up when auth state is inconsistent', () => {
            // Mock inconsistent auth state (token without user)
            (storage.get as jest.Mock).mockImplementation((key: string) => {
                if (key === 'token') return 'valid-token';
                return null;
            });

            expect(() => validateAuthState()).toThrow(AppError);
            expect(() => validateAuthState()).toThrow('认证状态异常，请重新登录');
            expect(mockStorageRemove).toHaveBeenCalledWith('token');
            expect(mockStorageRemove).toHaveBeenCalledWith('user');
        });

        it('should handle the case when user exists but token does not', () => {
            // Mock inconsistent auth state (user without token)
            (storage.get as jest.Mock).mockImplementation((key: string) => {
                if (key === 'user') return { id: 1 };
                return null;
            });

            expect(() => validateAuthState()).toThrow(AppError);
            expect(() => validateAuthState()).toThrow('认证状态异常，请重新登录');
            expect(mockStorageRemove).toHaveBeenCalledWith('token');
            expect(mockStorageRemove).toHaveBeenCalledWith('user');
        });
    });
}); 