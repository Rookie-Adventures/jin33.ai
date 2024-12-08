import dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`),
});

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),

  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jin33',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000, // 默认15分钟
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },

  huggingface: {
    apiKey: process.env.HF_API_KEY,
    modelEndpoint: process.env.HF_MODEL_ENDPOINT,
  },

  proxy: {
    host: process.env.PROXY_HOST,
    port: process.env.PROXY_PORT ? parseInt(process.env.PROXY_PORT, 10) : undefined,
    auth: process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD
      ? {
          username: process.env.PROXY_USERNAME,
          password: process.env.PROXY_PASSWORD,
        }
      : undefined,
  },

  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://jin33.ai']
      : ['http://localhost:3001'],
    credentials: true,
  },
} as const;

// 类型导出
export type Config = typeof config;
