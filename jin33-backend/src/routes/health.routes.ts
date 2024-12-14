import { Router } from 'express';
import responseHandler from '../utils/response.js';
import logger from '../config/logger.js';
import type { IHealthStatus } from '../types/health.types.js';

const router = Router();

// 基本健康检查
router.get('/health', async (_req, res) => {
  try {
    // 开发环境,直接返回健康状态
    const response: IHealthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      details: {
        database: 'using in-memory storage'
      }
    };

    return responseHandler.success(res, response);
  } catch (error) {
    logger.error('Health check failed', { error });
    return responseHandler.error(res, 'HEALTH_CHECK_FAILED', 500);
  }
});

export default router; 