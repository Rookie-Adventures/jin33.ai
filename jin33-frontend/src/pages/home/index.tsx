import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: '在线聊天',
    description: '使用最新的HF模型进行智能对话',
    action: '开始聊天',
    path: '/chat'
  },
  {
    title: '模型仓库',
    description: '浏览和下载各种HF模型',
    action: '浏览模型',
    path: '/models'
  },
  {
    title: '个人中心',
    description: '管理您的账户和使用情况',
    action: '查看详情',
    path: '/profile'
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        jin33.ai - HF模型调用平台
      </Typography>
      <Typography variant="h5" component="p" gutterBottom color="text.secondary" sx={{ mb: 8 }}>
        便捷、稳定、高效的HF模型调用服务
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                {feature.description}
              </Typography>
              <Typography
                variant="button"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold'
                }}
              >
                {feature.action}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
