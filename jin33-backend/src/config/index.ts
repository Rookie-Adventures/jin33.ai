import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables
dotenv.config({
  path: join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`)
});

// Server configuration
export const SERVER = {
  port: parseInt(process.env.PORT || '4000', 10),
  env: process.env.NODE_ENV || 'development',
  apiPrefix: '/api/v1',
  corsOrigins: process.env.NODE_ENV === 'production'
    ? ['https://jin33.ai']
    : ['http://localhost:3001'],
  uploadDir: join(__dirname, '../../uploads'),
};

// Database configuration
export const DATABASE = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jin33_dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  }
};

// JWT configuration
export const JWT = {
  secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshExpiresIn: '30d',
  algorithm: 'HS256' as const,
};

// Rate limiting
export const RATE_LIMIT = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10), // 100 requests
  message: '请求过于频繁，请稍后再试',
};

// Security
export const SECURITY = {
  bcryptRounds: 12,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
  cors: {
    origin: SERVER.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  },
};

// Logging
export const LOGGING = {
  level: process.env.LOG_LEVEL || 'info',
  dir: join(__dirname, '../../logs'),
  maxFiles: '14d',
  maxSize: '20m',
};

// External services
export const SERVICES = {
  huggingface: {
    apiKey: process.env.HF_API_KEY,
    modelEndpoint: process.env.HF_MODEL_ENDPOINT,
  },
};

// Cache configuration
export const CACHE = {
  ttl: 60 * 60, // 1 hour
  prefix: 'jin33:',
};

// WebSocket configuration
export const WEBSOCKET = {
  pingTimeout: 60000,
  pingInterval: 25000,
};

// Export default config object
export default {
  server: SERVER,
  database: DATABASE,
  jwt: JWT,
  rateLimit: RATE_LIMIT,
  security: SECURITY,
  logging: LOGGING,
  services: SERVICES,
  cache: CACHE,
  websocket: WEBSOCKET,
};
