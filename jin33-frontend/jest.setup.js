import '@testing-library/jest-dom';

// Mock MUI theme provider
jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
    useTheme: () => ({
        palette: {
            primary: {
                main: '#1976d2',
                dark: '#115293',
                contrastText: '#fff',
            },
            secondary: {
                main: '#dc004e',
                dark: '#9a0036',
                contrastText: '#fff',
            },
        },
        shape: {
            borderRadius: 4,
        },
        typography: {
            fontWeightMedium: 500,
        },
    }),
}));

// 环境变量设置
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_WS_URL = 'ws://localhost:3000';

// Mock React 18 APIs
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning/.test(args[0]) || /Error: Uncaught/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});

// 设置测试环境
beforeAll(() => {
    // 禁用所有网络请求
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.reject(new Error('No network calls allowed during tests'))
    );
});

afterAll(() => {
    // 清理所有mock
    jest.restoreAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}
global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}
global.ResizeObserver = MockResizeObserver;

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock window.location
delete window.location;
window.location = {
    pathname: '/',
    search: '',
    hash: '',
    href: '/',
    origin: 'http://localhost',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
};

// Set up global test environment
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// 禁用所有console.error
jest.spyOn(console, 'error').mockImplementation(() => { });

// 清理所有测试之间的副作用
afterEach(() => {
    jest.clearAllMocks();
});