import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: 'calc(100vh - 64px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
                抱歉，您访问的页面不存在
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                返回首页
            </Button>
        </Box>
    );
};

export default NotFoundPage; 