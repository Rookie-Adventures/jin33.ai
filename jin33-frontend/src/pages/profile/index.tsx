import {
  AccessTime,
  AccountBalance,
  History,
  Stars,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useAuthStore } from '@/store/auth';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  const userStats = [
    { label: '注册时间', value: '2024-01-01', icon: <AccessTime /> },
    { label: '账户余额', value: '￥100.00', icon: <AccountBalance /> },
    { label: '使用次数', value: '128次', icon: <History /> },
    { label: '会员等级', value: '普通用户', icon: <Stars /> },
  ];

  const recentActivities = [
    { time: '2024-01-09 12:30', action: '使用了GPT-3.5模型' },
    { time: '2024-01-09 10:15', action: '充值了￥50.00' },
    { time: '2024-01-08 15:45', action: '更新了个人信息' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* 个人信息卡片 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {user?.username?.[0]?.toUpperCase() ?? 'U'}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.username ?? '未登录'}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              编辑资料
            </Button>
          </Paper>
        </Grid>

        {/* 统计信息 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              账户统计
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {userStats.map((stat) => (
                <Grid item xs={12} sm={6} key={stat.label}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ mr: 2, color: 'primary.main' }}>{stat.icon}</Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="subtitle1">{stat.value}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* 最近活动 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              最近活动
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
