import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchorEl(null);
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          jin33
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, ml: 2 }}>
          <Button color="inherit" component={Link} to="/">
            首页
          </Button>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/chat">
                AI助手
              </Button>
              <Button color="inherit" component={Link} to="/models">
                模型管理
              </Button>
            </>
          )}
        </Box>

        <IconButton
          color="inherit"
          aria-label="user menu"
          onClick={handleUserMenuOpen}
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={mobileMenuAnchorEl}
          open={Boolean(mobileMenuAnchorEl)}
          onClose={handleMenuClose}
          role="menu"
        >
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            首页
          </MenuItem>
          {isAuthenticated && (
            <>
              <MenuItem component={Link} to="/chat" onClick={handleMenuClose}>
                AI助手
              </MenuItem>
              <MenuItem component={Link} to="/models" onClick={handleMenuClose}>
                模型管理
              </MenuItem>
            </>
          )}
        </Menu>

        <Menu
          anchorEl={userMenuAnchorEl}
          open={Boolean(userMenuAnchorEl)}
          onClose={handleMenuClose}
          role="menu"
        >
          {isAuthenticated ? (
            <>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                个人中心
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                退出登录
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                登录
              </MenuItem>
              <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                注册
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
