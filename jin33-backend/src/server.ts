import { httpServer } from './app';
import { SchedulerService } from './services/scheduler.service';
import logger from './config/logger';

// 设置默认环境变量
const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

// 启动定时任务
SchedulerService.getInstance().startAll();

// 启动服务器
httpServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Environment: ${ENV}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');

  // 停止定时任务
  SchedulerService.getInstance().stopAll();

  // 关闭服务器
  httpServer.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});
