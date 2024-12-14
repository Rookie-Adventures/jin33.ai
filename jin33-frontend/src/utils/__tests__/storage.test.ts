import { storage } from '../storage';

describe('Storage Utils', () => {
    let mockLocalStorage: Record<string, string>;

    beforeEach(() => {
        // 初始化 mock localStorage
        mockLocalStorage = {};

        // Mock localStorage 方法
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
                setItem: jest.fn((key: string, value: string) => {
                    mockLocalStorage[key] = value;
                }),
                removeItem: jest.fn((key: string) => {
                    delete mockLocalStorage[key];
                }),
                clear: jest.fn(() => {
                    mockLocalStorage = {};
                }),
            },
            writable: true
        });
    });

    describe('set', () => {
        it('should store string value correctly', () => {
            storage.set('testKey', 'testValue');
            expect(localStorage.getItem('testKey')).toBe('"testValue"');
        });

        it('should store object value correctly', () => {
            const testObject = { name: 'test', value: 123 };
            storage.set('testKey', testObject);
            expect(localStorage.getItem('testKey')).toBe(JSON.stringify(testObject));
        });

        it('should handle storage error gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const mockError = new Error('Storage error');

            // Mock setItem to throw error
            (localStorage.setItem as jest.Mock).mockImplementationOnce(() => {
                throw mockError;
            });

            storage.set('testKey', 'testValue');
            expect(consoleSpy).toHaveBeenCalledWith('Error saving data to localStorage', mockError);
        });
    });

    describe('get', () => {
        it('should retrieve string value correctly', () => {
            localStorage.setItem('testKey', '"testValue"');
            expect(storage.get('testKey')).toBe('testValue');
        });

        it('should retrieve object value correctly', () => {
            const testObject = { name: 'test', value: 123 };
            localStorage.setItem('testKey', JSON.stringify(testObject));
            expect(storage.get('testKey')).toEqual(testObject);
        });

        it('should return null for non-existent key', () => {
            expect(storage.get('nonExistentKey')).toBeNull();
        });

        it('should handle retrieval error gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const mockError = new Error('Storage error');

            // Mock getItem to throw error
            (localStorage.getItem as jest.Mock).mockImplementationOnce(() => {
                throw mockError;
            });

            expect(storage.get('testKey')).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith('Error getting data from localStorage', mockError);
        });
    });

    describe('remove', () => {
        it('should remove item correctly', () => {
            localStorage.setItem('testKey', 'testValue');
            storage.remove('testKey');
            expect(localStorage.getItem('testKey')).toBeNull();
        });

        it('should handle removal error gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const mockError = new Error('Storage error');

            // Mock removeItem to throw error
            (localStorage.removeItem as jest.Mock).mockImplementationOnce(() => {
                throw mockError;
            });

            storage.remove('testKey');
            expect(consoleSpy).toHaveBeenCalledWith('Error removing data from localStorage', mockError);
        });
    });

    describe('clear', () => {
        it('should clear all items', () => {
            localStorage.setItem('key1', 'value1');
            localStorage.setItem('key2', 'value2');

            storage.clear();
            expect(Object.keys(mockLocalStorage)).toHaveLength(0);
        });

        it('should handle clear error gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const mockError = new Error('Storage error');

            // Mock clear to throw error
            (localStorage.clear as jest.Mock).mockImplementationOnce(() => {
                throw mockError;
            });

            storage.clear();
            expect(consoleSpy).toHaveBeenCalledWith('Error clearing localStorage', mockError);
        });
    });
}); 