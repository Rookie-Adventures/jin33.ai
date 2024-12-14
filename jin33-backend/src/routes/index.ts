import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import orderRoutes from './order.routes';
import spreadRoutes from './spread.routes';

const router = Router();

// API 版本前缀
const API_PREFIX = '/api/v1';

// 注册路由
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/chat`, chatRoutes);
router.use(`${API_PREFIX}/order`, orderRoutes);
router.use(`${API_PREFIX}/spread`, spreadRoutes);

// 健康检查
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
