import { routes } from './config';
import type { RouteConfig } from '@/types/route.types';

describe('路由配置', () => {
    describe('基本格式检查', () => {
        it('路由配置格式正确', () => {
            routes.forEach((route: RouteConfig) => {
                expect(route).toHaveProperty('path');
                expect(route).toHaveProperty('component');
                expect(typeof route.path).toBe('string');
                expect(typeof route.component).toBe('function');
            });
        });

        it('路径格式正确', () => {
            // 所有路径都应该以 / 开头
            routes.forEach((route: RouteConfig) => {
                expect(route.path).toMatch(/^\//);
            });

            // 非根路径不应该以 / 结尾
            const nonRootRoutes = routes.filter(route => route.path !== '/');
            nonRootRoutes.forEach(route => {
                expect(route.path).not.toMatch(/\/$/);
            });
        });
    });

    describe('必需路由检查', () => {
        it('包含所有必需的路由', () => {
            const requiredPaths = ['/', '/login', '/chat', '/profile'];
            requiredPaths.forEach(path => {
                expect(routes.some(route => route.path === path)).toBeTruthy();
            });
        });

        it('路径没有重复', () => {
            const paths = routes.map(route => route.path);
            const uniquePaths = new Set(paths);
            expect(paths.length).toBe(uniquePaths.size);
        });
    });

    describe('权限设置检查', () => {
        it('公共路由权限正确', () => {
            const publicPaths = ['/', '/login', '/register'];
            const publicRoutes = routes.filter(route =>
                publicPaths.includes(route.path)
            );

            publicRoutes.forEach(route => {
                expect(route.auth).toBeFalsy();
            });
        });

        it('受保护路由权限正确', () => {
            const protectedPaths = ['/chat', '/profile'];
            const protectedRoutes = routes.filter(route =>
                protectedPaths.includes(route.path)
            );

            protectedRoutes.forEach(route => {
                expect(route.auth).toBeTruthy();
            });
        });
    });
}); 