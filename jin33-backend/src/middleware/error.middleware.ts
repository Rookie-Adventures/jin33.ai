import { Request, Response, NextFunction } from 'express';
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  AppError
} from '../utils/errors';
import logger from '../config/logger';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  // Handle known errors
  if (error instanceof ValidationError) {
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: error.message,
      errors: error.errors
    });
    return;
  }

  if (error instanceof AuthenticationError) {
    res.status(401).json({
      code: 'AUTHENTICATION_ERROR',
      message: error.message
    });
    return;
  }

  if (error instanceof AuthorizationError) {
    res.status(403).json({
      code: 'AUTHORIZATION_ERROR',
      message: error.message
    });
    return;
  }

  if (error instanceof RateLimitError) {
    res.status(429).json({
      code: 'RATE_LIMIT_ERROR',
      message: error.message
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.code,
      message: error.message
    });
    return;
  }

  // Handle unknown errors
  res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: '服务器内部错误'
  });
};

// 404 错误处理
export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const err = new AppError('找不到请求的资源', 404, 'NOT_FOUND');
  next(err);
};