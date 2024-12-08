import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/error';
import { logError } from '@/utils/logger';
import { config } from '@/config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 默认错误
  let error = err;

  // 如果不是AppError实例，转换为AppError
  if (!(error instanceof AppError)) {
    error = new AppError(
      500,
      'An unexpected error occurred',
      false,
      err.stack
    );
  }

  const appError = error as AppError;

  // 记录错误日志
  logError(`${req.method} ${req.path}`, {
    error: appError,
    body: req.body,
    user: req.user,
  });

  // 发送错误响应
  const response = {
    code: appError.statusCode,
    message: appError.message,
    ...(config.env === 'development' && { stack: appError.stack }),
  };

  res.status(appError.statusCode).json(response);
};

// 捕获未处理的Promise rejection
export const unhandledRejection = (server: any) => {
  process.on('unhandledRejection', (reason: Error) => {
    logError('Unhandled Rejection', reason);
    server.close(() => {
      process.exit(1);
    });
  });
};

// 捕获未捕获的异常
export const uncaughtException = () => {
  process.on('uncaughtException', (err: Error) => {
    logError('Uncaught Exception', err);
    process.exit(1);
  });
};
