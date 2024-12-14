import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { jwtConfig } from '../config/app';
import logger from '../config/logger';
import { AuthenticationError, ValidationError, DatabaseError } from '../utils/errors';

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ValidationError(
        existingUser.email === email ? '邮箱已被注册' : '用户名已被使用'
      );
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user',
      balance: 0
    });

    await user.save();
    logger.info('New user registered:', { username, email });

    res.status(201).json({
      code: 'SUCCESS',
      message: '注册成功'
    });
  } catch (error) {
    logger.error('Registration failed:', error);
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new DatabaseError('注册失败，请稍后重试');
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      throw new AuthenticationError('用户名或密码错误');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('用户名或密码错误');
    }

    // Generate JWT
    const token = jwt.sign(
      {
        sub: user._id,
        role: user.role
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    logger.info('User logged in:', { username });

    res.json({
      code: 'SUCCESS',
      message: '登录成功',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    logger.error('Login failed:', error);
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new DatabaseError('登录失败，请稍后重试');
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('用户未登录');
    }

    // TODO: Add token to blacklist in Redis
    logger.info('User logged out:', { userId: req.user._id });

    res.json({
      code: 'SUCCESS',
      message: '退出登录成功'
    });
  } catch (error) {
    logger.error('Logout failed:', error);
    throw error;
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw new AuthenticationError('用户未登录');
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      throw new AuthenticationError('用户不存在');
    }

    res.json({
      code: 'SUCCESS',
      message: '获取用户信息成功',
      data: { user: user.toJSON() }
    });
  } catch (error) {
    logger.error('Get profile failed:', error);
    throw error;
  }
};
