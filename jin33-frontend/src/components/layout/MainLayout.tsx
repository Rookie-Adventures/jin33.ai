import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '../../store/theme';
import { useAuthStore } from '../../store/auth';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { label: '首页', path: '/' },
    { label: '在线聊天', path: '/chat' },
    { label: '模型仓库', path: '/models' },
    { label: '个人中心', path: '/profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
            onClick={() => navigate('/')}
          >
            jin33.ai
          </Typography>
          <IconButton sx={{ mr: 2 }} onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Stack direction="row" spacing={2}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                退出登录
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  登录
                </Button>
                <Button color="primary" variant="contained" onClick={() => navigate('/register')}>
                  注册
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800]
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 jin33.ai - HF模型调用平台
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
