import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware';
import { verifyToken, authorize } from '../middleware/auth.middleware';
import { updatePrice, getSpread, setThreshold } from '../controllers/spread.controller';

const router = Router();

// 验证规则
const priceUpdateValidation = [
  body('symbol').trim().notEmpty().withMessage('交易对不能为空'),
  body('price').isFloat({ min: 0 }).withMessage('价格必须大于0'),
  body('source').trim().notEmpty().withMessage('数据源不能为空')
];

const thresholdValidation = [
  body('symbol').trim().notEmpty().withMessage('交易对不能为空'),
  body('threshold')
    .isFloat({ min: 0, max: 100 })
    .withMessage('阈值必须在0-100之间')
];

// 路由定义
router.use(verifyToken); // 所有价差相关的路由都需要认证

// 更新价格数据 - 只允许管理员和数据提供者
router.post(
  '/price',
  authorize('admin', 'data_provider'),
  validate(priceUpdateValidation),
  updatePrice
);

// 获取价差数据 - 所有认证用户
router.get('/spread/:symbol', getSpread);

// 设置价差阈值 - 只允许管理员
router.post(
  '/threshold',
  authorize('admin'),
  validate(thresholdValidation),
  setThreshold
);

export default router;
