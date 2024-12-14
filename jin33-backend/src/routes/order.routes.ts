import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createOrder, getOrders, getOrder } from '../controllers/order.controller';

const router = Router();

// 创建订单验证规则
const createOrderValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('充值金额必须大于0'),
];

// 路由定义
router.use(verifyToken); // 所有订单路由都需要认证

router.post('/orders', validate(createOrderValidation), createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);

export default router;
