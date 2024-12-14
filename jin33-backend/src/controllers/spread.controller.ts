import { Request, Response } from 'express';
import { SpreadService } from '../services/spread.service';
import { PriceData } from '../types/trading';
import logger from '../config/logger';
import { ValidationError } from '../utils/errors';

// 更新价格数据
export const updatePrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const priceData: PriceData = {
      ...req.body,
      timestamp: new Date()
    };

    // 验证价格数据
    if (!priceData.symbol || !priceData.price || !priceData.source) {
      throw new ValidationError('缺少必要的价格数据字段');
    }

    // 更新价格
    SpreadService.getInstance().updatePrice(priceData);

    res.json({
      code: 'SUCCESS',
      message: '价格数据更新成功'
    });
  } catch (error) {
    logger.error('Update price failed:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: error.message
      });
    } else {
      res.status(500).json({
        code: 'SERVER_ERROR',
        message: '服务器内部错误'
      });
    }
  }
};

// 获取价差数据
export const getSpread = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol } = req.params;

    if (!symbol) {
      throw new ValidationError('缺少交易对参数');
    }

    const spreadData = SpreadService.getInstance().getSpreadData(symbol);

    if (!spreadData) {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: '未找到价差数据'
      });
      return;
    }

    res.json({
      code: 'SUCCESS',
      data: spreadData,
      message: '获取价差数据成功'
    });
  } catch (error) {
    logger.error('Get spread failed:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: error.message
      });
    } else {
      res.status(500).json({
        code: 'SERVER_ERROR',
        message: '服务器内部错误'
      });
    }
  }
};

// 设置价差阈值
export const setThreshold = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, threshold } = req.body;

    if (!symbol || typeof threshold !== 'number') {
      throw new ValidationError('缺少必要的阈值设置参数');
    }

    if (threshold < 0 || threshold > 100) {
      throw new ValidationError('阈值必须在0-100之间');
    }

    SpreadService.getInstance().setSpreadThreshold(symbol, threshold);

    res.json({
      code: 'SUCCESS',
      message: '价差阈值设置成功'
    });
  } catch (error) {
    logger.error('Set threshold failed:', error);
    if (error instanceof ValidationError) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: error.message
      });
    } else {
      res.status(500).json({
        code: 'SERVER_ERROR',
        message: '服务器内部错误'
      });
    }
  }
};
