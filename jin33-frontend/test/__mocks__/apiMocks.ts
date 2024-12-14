// API响应的mock数据
export const mockUserResponse = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com'
};

// API错误的mock数据
export const mockApiError = {
    code: 'ERROR_CODE',
    message: 'Error message'
};

// 通用的loading状态mock
export const mockLoadingState = {
    isLoading: true,
    isError: false,
    error: null
};

// 通用的error状态mock
export const mockErrorState = {
    isLoading: false,
    isError: true,
    error: new Error('Test error')
}; 