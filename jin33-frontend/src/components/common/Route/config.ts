import { lazy } from 'react';
import type { RouteConfig } from '@/types/route.types';

// 懒加载路由组件
const HomePage = lazy(() => import('@/pages/Home'));
const ChatPage = lazy(() => import('@/pages/Chat'));
const ModelsPage = lazy(() => import('@/pages/Models'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const LoginPage = lazy(() => import('@/pages/Login'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// 路由配置
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    public: true,
    title: '首页',
  },
  {
    path: '/chat',
    component: ChatPage,
    auth: true,
    title: 'AI助手',
  },
  {
    path: '/models',
    component: ModelsPage,
    auth: true,
    title: '模型管理',
  },
  {
    path: '/profile',
    component: ProfilePage,
    auth: true,
    title: '个人中心',
  },
  {
    path: '/login',
    component: LoginPage,
    public: true,
    title: '登录',
  },
  {
    path: '/register',
    component: RegisterPage,
    public: true,
    title: '注册',
  },
  {
    path: '*',
    component: NotFoundPage,
    public: true,
    title: '404',
  }
];
