import { Box, Button, Container, Link, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || '/';

    // 如果是从注册页面跳转来的，自动填充邮箱
    useEffect(() => {
        const registeredEmail = location.state?.email;
        if (registeredEmail) {
            setEmail(registeredEmail);
        }
    }, [location.state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('请填写邮箱和密码');
            return;
        }

        try {
            // TODO: 实现实际的登录API调用
            // const response = await authService.login({
            //     email,
            //     password,
            //     remember
            // });
            await login({ id: '1', name: 'Test User', email }, 'test-token');
            navigate(from, { replace: true });
        } catch (error) {
            setError('登录失败，请检查邮箱和密码');
            console.error('Login failed:', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    登录
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="邮箱地址"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                        }
                        label="记住我"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        登录
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Link component={RouterLink} to="/register" variant="body2">
                            {"还没有账号？立即注册"}
                        </Link>
                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                            {"忘记密码？"}
                        </Link>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            或者使用以下方式登录
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {/* 预留第三方登录按钮位置 */}
                            {/* <IconButton>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton>
                                <GitHubIcon />
                            </IconButton> */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage; 