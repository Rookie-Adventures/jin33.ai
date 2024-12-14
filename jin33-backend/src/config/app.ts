import { CorsOptions } from 'cors';
import { ServerOptions } from 'socket.io';
import { RateLimitOptions } from '../types/config.types.js';

// CORS配置
export const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24小时
};

// Socket.IO配置
export const socketConfig: Partial<ServerOptions> = {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000
};

// JWT配置
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '7d'
};

// 速率限制配置
export const rateLimitOptions: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  standardHeaders: true,
  legacyHeaders: false,
  message: '请求过于频繁，请稍后再试'
};
