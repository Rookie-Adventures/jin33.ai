import React from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <Box component="main" className={className}>
      <NavBar />
      {children}
    </Box>
  );
};

export default MainLayout;
