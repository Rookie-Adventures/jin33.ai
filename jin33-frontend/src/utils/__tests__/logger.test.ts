import { logger } from '../logger';

describe('Logger Utils', () => {
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;
    let consoleDebugSpy: jest.SpyInstance;
    const originalNodeEnv = process.env.NODE_ENV;

    beforeEach(() => {
        // 重置所有 mock
        jest.clearAllMocks();

        // Mock console methods
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => undefined);
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    });

    afterEach(() => {
        // Restore console methods
        consoleInfoSpy.mockRestore();
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
        consoleDebugSpy.mockRestore();
        // Restore NODE_ENV
        process.env.NODE_ENV = originalNodeEnv;
        jest.resetModules();
    });

    describe('in development environment', () => {
        beforeEach(() => {
            // 设置环境变量并重新加载模块
            process.env.NODE_ENV = 'development';
            jest.isolateModules(() => {
                const { logger: freshLogger } = require('../logger');
                Object.assign(logger, freshLogger);
            });
        });

        it('should log info messages', () => {
            const message = 'Test info message';
            logger.info(message);
            expect(consoleInfoSpy).toHaveBeenCalledWith('[INFO]', message);
        });

        it('should log debug messages', () => {
            const message = 'Test debug message';
            logger.debug(message);
            expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG]', message);
        });

        it('should handle multiple arguments', () => {
            const message = 'Test message';
            const data = { test: 'data' };
            logger.info(message, data);
            expect(consoleInfoSpy).toHaveBeenCalledWith('[INFO]', message, data);
        });
    });

    describe('in production environment', () => {
        beforeEach(() => {
            // 设置环境变量并重新加载模块
            process.env.NODE_ENV = 'production';
            jest.isolateModules(() => {
                const { logger: freshLogger } = require('../logger');
                Object.assign(logger, freshLogger);
            });
        });

        it('should not log info messages', () => {
            logger.info('Test info message');
            expect(consoleInfoSpy).not.toHaveBeenCalled();
        });

        it('should not log debug messages', () => {
            logger.debug('Test debug message');
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });

        it('should log warn messages', () => {
            const message = 'Test warning message';
            logger.warn(message);
            expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', message);
        });

        it('should log error messages', () => {
            const message = 'Test error message';
            logger.error(message);
            expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', message);
        });
    });

    describe('error handling', () => {
        it('should handle undefined messages', () => {
            logger.error(undefined);
            expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', undefined);
        });

        it('should handle null messages', () => {
            logger.warn(null);
            expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN]', null);
        });

        it('should handle error objects', () => {
            const error = new Error('Test error');
            logger.error('Error occurred', error);
            expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR]', 'Error occurred', error);
        });
    });
}); 