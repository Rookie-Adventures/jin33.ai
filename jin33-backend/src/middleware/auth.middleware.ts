import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/app';
import logger from '../config/logger';
import { User, IUser } from '../models/user.model';
import { AuthenticationError, AuthorizationError } from '../utils/errors';

// JWT payload type
interface JwtPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Verify JWT token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthenticationError('未提供认证令牌');
    }

    const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;
    const user = await User.findById(decoded.sub).select('-password');

    if (!user) {
      throw new AuthenticationError('用户不存在');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthenticationError('无效的认证令牌'));
    } else {
      next(error);
    }
  }
};

// Check user balance
export const checkBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('用户未认证');
    }

    const user = await User.findById(req.user._id);
    if (!user || user.balance <= 0) {
      throw new AuthorizationError('余额不足，请充值');
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AuthenticationError('用户未认证'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AuthorizationError('没有执行此操作的权限'));
      return;
    }

    next();
  };
};
