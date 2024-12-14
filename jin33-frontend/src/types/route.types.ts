import type { ComponentType, LazyExoticComponent } from 'react';
import type { Optional } from './index';

// Route Configuration Types
export interface RouteConfig {
  path: string;
  component: ComponentType | LazyExoticComponent<ComponentType>;
  exact?: boolean;
  public?: boolean;
  auth?: boolean;
  children?: RouteConfig[];
  title?: string;
  icon?: string;
  roles?: string[];
  layout?: ComponentType;
}

// Route Component Props Types
export interface RouteProps {
  route: RouteConfig;
  children?: React.ReactNode;
}

export interface PrivateRouteProps extends RouteProps {
  fallback?: string;
  loading?: React.ReactNode;
}

// Route Location Types
export interface RouteLocation {
  pathname: string;
  search: string;
  hash: string;
  state: Optional<unknown>;
}

// Route Navigation Types
export interface RouteNavigation {
  push: (path: string, state?: unknown) => void;
  replace: (path: string, state?: unknown) => void;
  goBack: () => void;
  goForward: () => void;
}
