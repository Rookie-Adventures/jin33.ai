import { handleApiError, AppError } from '../error';
import { ApiResponse, ResponseStatus } from '@/types/api.types';

describe('Error Utils', () => {
    describe('handleApiError', () => {
        it('should handle successful API response', async () => {
            const mockResponse: ApiResponse<string> = {
                code: 200,
                status: ResponseStatus.SUCCESS,
                message: 'success',
                data: 'test data'
            };

            const promise = Promise.resolve(mockResponse);
            const [data, error] = await handleApiError(promise);

            expect(data).toBe('test data');
            expect(error).toBeNull();
        });

        it('should handle API error with response', async () => {
            const mockError = {
                response: {
                    status: 400,
                    data: {
                        message: 'Bad Request'
                    }
                }
            };

            const promise = Promise.reject(mockError);
            const [data, error] = await handleApiError(promise);

            expect(data).toBeNull();
            expect(error).toEqual({
                code: 400,
                message: 'Bad Request',
                data: mockError.response.data
            });
        });

        it('should handle API error without response', async () => {
            const promise = Promise.reject(new Error());
            const [data, error] = await handleApiError(promise);

            expect(data).toBeNull();
            expect(error).toEqual({
                code: 500,
                message: '发生未知错误',
                data: undefined
            });
        });
    });

    describe('AppError', () => {
        it('should create AppError with correct name and message', () => {
            const message = 'Test error message';
            const error = new AppError(message);

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(AppError);
            expect(error.name).toBe('AppError');
            expect(error.message).toBe(message);
        });

        it('should be catchable as an Error', () => {
            const message = 'Test error message';
            let error: AppError | null = null;

            try {
                throw new AppError(message);
            } catch (e) {
                error = e as AppError;
            }

            // 在 try-catch 块外进行断言
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(AppError);
            expect(error?.message).toBe(message);
        });
    });
}); 