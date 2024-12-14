import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { User, IUser } from '../models/user.model';
import { AuthenticationError } from '../utils/errors';
import logger from '../config/logger';

// 扩展 Request 类型
interface AuthenticatedRequest extends Request {
  user: IUser;
}

export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;

    if (!req.user) {
      throw new AuthenticationError('用户未认证');
    }

    // 创建订单
    const order = await Order.create({
      userId: req.user._id,
      amount,
      status: 'pending',
    });

    // TODO: 调用支付服务处理订单
    // const paymentResult = await paymentService.processOrder(order);

    // 模拟支付成功
    order.status = 'completed';
    await order.save();

    // 更新用户余额
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { balance: amount },
    });

    res.status(201).json({
      message: '充值成功',
      data: { order },
    });
  } catch (error) {
    logger.error('Create order failed:', error);
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        message: error.message
      });
      return;
    }
    res.status(500).json({
      message: '创建订单失败，请稍后重试'
    });
  }
};

export const getOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('用户未认证');
    }

    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      message: '获取订单列表成功',
      data: { orders },
    });
  } catch (error) {
    logger.error('Get orders failed:', error);
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        message: error.message
      });
      return;
    }
    res.status(500).json({
      message: '获取订单列表失败，请稍后重试'
    });
  }
};

export const getOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('用户未认证');
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!order) {
      res.status(404).json({
        message: '订单不存在'
      });
      return;
    }

    res.json({
      message: '获取订单详情成功',
      data: { order },
    });
  } catch (error) {
    logger.error('Get order failed:', error);
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        message: error.message
      });
      return;
    }
    res.status(500).json({
      message: '获取订单详情失败，请稍后重试'
    });
  }
};
