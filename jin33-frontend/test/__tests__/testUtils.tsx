import type { ReactElement, PropsWithChildren } from 'react';
import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '@/theme';

// 定义更具体的类型
type WrapperProps = PropsWithChildren<{
    routerProps?: MemoryRouterProps;
}>;

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    routerProps?: MemoryRouterProps;
}

// 为每个测试创建新的 QueryClient 实例
function createTestQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: false,
            },
        }
    });
}

const AllTheProviders: React.FC<WrapperProps> = ({ children, routerProps = {} }): ReactElement => {
    const testQueryClient = createTestQueryClient();

    return (
        <QueryClientProvider client={testQueryClient}>
            <MemoryRouter {...routerProps}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </MemoryRouter>
        </QueryClientProvider>
    );
};

function render(
    ui: ReactElement,
    { routerProps, ...options }: CustomRenderOptions = {}
): RenderResult {
    return rtlRender(ui, {
        wrapper: (props) => <AllTheProviders {...props} routerProps={routerProps} />,
        ...options,
    });
}

// Export testing utilities
export { render, screen, fireEvent };
export type { CustomRenderOptions }; 