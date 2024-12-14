import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express';
import { Conversation } from '../models/conversation.model';
import logger from '../config/logger';

export const getConversations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(20);

    res.json({
      message: '获取对话列表成功',
      data: { conversations },
    });
  } catch (error) {
    logger.error('Get conversations failed:', error);
    res.status(500).json({
      message: '获取对话列表失败，请稍后重试'
    });
  }
};

export const getConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      res.status(404).json({
        message: '对话不存在'
      });
      return;
    }

    res.json({
      message: '获取对话详情成功',
      data: { conversation },
    });
  } catch (error) {
    logger.error('Get conversation failed:', error);
    res.status(500).json({
      message: '获取对话详情失败，请稍后重试'
    });
  }
};

export const createConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { content, modelId } = req.body;

    // 创建新对话
    const conversation = await Conversation.create({
      userId: req.user._id,
      modelId,
      messages: [{
        content,
        role: 'user',
        timestamp: new Date(),
      }],
    });

    // TODO: 调用 AI 服务处理用户消息
    // const aiResponse = await aiService.processMessage(content, modelId);

    // 模拟 AI 响应
    await Conversation.findByIdAndUpdate(conversation._id, {
      $push: {
        messages: {
          content: '抱歉，AI 服务还在开发中...',
          role: 'assistant',
          timestamp: new Date(),
        },
      },
    });

    res.status(201).json({
      message: '创建对话成功',
      data: { conversation },
    });
  } catch (error) {
    logger.error('Create conversation failed:', error);
    res.status(500).json({
      message: '创建对话失败，请稍后重试'
    });
  }
};

export const deleteConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      res.status(404).json({
        message: '对话不存在'
      });
      return;
    }

    res.json({
      message: '删除对话成功'
    });
  } catch (error) {
    logger.error('Delete conversation failed:', error);
    res.status(500).json({
      message: '删除对话失败，请稍后重试'
    });
  }
};