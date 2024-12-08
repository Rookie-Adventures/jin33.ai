import { lazy } from 'react';
import { RouteConfig } from '../types/route.types';

// 懒加载路由组件
const HomePage = lazy(() => import('../pages/home'));
const ChatPage = lazy(() => import('../pages/chat'));
const ModelsPage = lazy(() => import('../pages/models'));
const ProfilePage = lazy(() => import('../pages/profile'));
const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    public: true,
  },
  {
    path: '/chat',
    component: ChatPage,
    auth: true,
  },
  {
    path: '/models',
    component: ModelsPage,
    auth: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    auth: true,
  },
  {
    path: '/login',
    component: LoginPage,
    public: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    public: true,
  },
];
