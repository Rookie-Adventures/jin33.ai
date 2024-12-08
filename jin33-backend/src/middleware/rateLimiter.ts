import rateLimit from 'express-rate-limit';
import { config } from '@/config';
import { RateLimitError } from '@/utils/error';

export const createRateLimiter = (options?: Partial<typeof config.rateLimit>) => {
  return rateLimit({
    windowMs: options?.windowMs || config.rateLimit.windowMs,
    max: options?.max || config.rateLimit.max,
    handler: (req, res) => {
      throw new RateLimitError('Too many requests from this IP, please try again later');
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// API通用限流
export const apiLimiter = createRateLimiter();

// 登录限流（更严格）
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 5, // 限制5次尝试
});

// 注册限流
export const registerLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 3, // 限制3次尝试
});
