import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteProps } from '../types/route.types';
import { useAuthStore } from '../store/auth';
import Loading from '../components/common/Loading';

const PrivateRoute: React.FC<RouteProps> = ({ route }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const Component = route.component;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default PrivateRoute;
