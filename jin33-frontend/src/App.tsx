import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { useThemeStore } from './store/theme';
import { routes } from './routes/config';
import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './routes/PrivateRoute';
import Loading from './components/common/Loading';

const App: React.FC = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <MainLayout>
        <Suspense fallback={<Loading fullscreen />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.auth ? (
                    <PrivateRoute route={route} />
                  ) : (
                    <Suspense fallback={<Loading />}>
                      <route.component />
                    </Suspense>
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
