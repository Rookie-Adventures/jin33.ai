import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuthStore } from '@/store/auth';
import type { RouteProps } from '@/types/route.types';
import type { AuthState } from '@/types/auth.types';

const LoadingFallback = (): JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress />
  </Box>
);

const PrivateRoute: React.FC<RouteProps> = ({ route }): JSX.Element => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const Component = route.component;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (route.roles && user && !route.roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </Box>
  );
};

export default PrivateRoute;
