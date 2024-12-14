import rateLimit from 'express-rate-limit';
import { rateLimitOptions } from '../config/app';
import { RateLimitError } from '../utils/errors';
import logger from '../config/logger';

// TODO: 后续可以替换为 Redis 存储
// import RedisStore from 'rate-limit-redis';
// import { redisClient } from '../config/redis';

export const limiter = rateLimit({
  ...rateLimitOptions,
  // TODO: Redis 存储配置
  // store: new RedisStore({
  //   client: redisClient,
  //   prefix: 'rate-limit:',
  // }),
  handler: (req, res, next) => {
    logger.warn('Rate limit exceeded:', {
      ip: req.ip,
      path: req.path,
    });
    next(new RateLimitError('请求过于频繁，请稍后再试'));
  },
});
