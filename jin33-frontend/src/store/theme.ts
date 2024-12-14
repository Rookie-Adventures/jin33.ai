import { createTheme } from '@mui/material/styles';
import create from 'zustand';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
  // other theme configurations
});

const useThemeStore = create<{ isDarkMode: boolean; toggleTheme: () => void }>(set => ({
  isDarkMode: false,
  toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),
}));

export { theme, useThemeStore };
