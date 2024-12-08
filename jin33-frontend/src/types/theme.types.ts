import { Theme } from '@mui/material';

export interface CustomTheme extends Theme {
  custom?: {
    maxWidth: string;
    borderRadius: number;
  };
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
