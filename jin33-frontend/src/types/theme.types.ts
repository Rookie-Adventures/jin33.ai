import type { Theme } from '@mui/material';
import type { ResponseStatus } from './api.types';
import type { Nullable } from './index';

// Theme Types
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export interface CustomTheme extends Theme {
  custom: {
    maxWidth: string;
    borderRadius: number;
    headerHeight: string;
    footerHeight: string;
    sidebarWidth: string;
    contentPadding: string;
    boxShadow: string;
    transition: string;
  };
}

// Theme State Types
export interface ThemeState {
  mode: ThemeMode;
  theme: CustomTheme;
  status: ResponseStatus;
  error: Nullable<string>;
}

// Theme Props Types
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

// Theme Config Types
export interface ThemeConfig {
  mode: ThemeMode;
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  text: string;
}
