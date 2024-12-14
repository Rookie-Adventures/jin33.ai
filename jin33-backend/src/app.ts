import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsOptions, socketConfig } from './config/app.js';
import { connectDB } from './config/database.js';
import logger from './config/logger.js';
import { errorHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';

// 创建 Express 应用
const app = express();

// 创建 HTTP 服务器
const httpServer = createServer(app);

// 创建 Socket.IO 服务器
const io = new Server(httpServer, socketConfig);

// 连接数据库
connectDB().catch((error: Error) => {
  logger.error('Failed to connect to database:', error);
  process.exit(1);
});

// 基础中间件
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 路由
app.use('/api', routes);

// 错误处理中间件
app.use(errorHandler);

// Socket.IO 连接处理
io.on('connection', (socket) => {
  logger.info('Client connected:', socket.id);

  socket.on('disconnect', () => {
    logger.info('Client disconnected:', socket.id);
  });
});

export { app, httpServer };

