import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: ComponentType;
  exact?: boolean;
  public?: boolean;
  auth?: boolean;
  children?: RouteConfig[];
}

export interface RouteProps {
  route: RouteConfig;
}

export interface PrivateRouteProps extends RouteProps {
  fallback?: string;
}
