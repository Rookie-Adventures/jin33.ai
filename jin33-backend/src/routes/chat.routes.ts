import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, checkBalance } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { limiter } from '../middleware/rateLimit.middleware';
import {
  getConversations,
  getConversation,
  createConversation,
  deleteConversation,
} from '../controllers/chat.controller';

const router = Router();

// 消息验证规则
const messageValidation = [
  body('content').trim().notEmpty().withMessage('消息内容不能为空'),
  body('modelId').trim().notEmpty().withMessage('模型ID不能为空'),
];

// 路由定义
router.use(verifyToken); // 所有聊天路由都需要认证
router.use(limiter); // 应用速率限制

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.post('/conversations', validate(messageValidation), checkBalance, createConversation);
router.delete('/conversations/:id', deleteConversation);

export default router;
