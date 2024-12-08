import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '@/utils/error';
import { config } from '@/config';
import { UserDocument } from '@/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 获取token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    // 验证token
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    if (!decoded) {
      throw new AuthenticationError('Invalid token');
    }

    // 将用户信息添加到请求对象
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError());
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AuthorizationError('You do not have permission to perform this action')
      );
    }

    next();
  };
};
