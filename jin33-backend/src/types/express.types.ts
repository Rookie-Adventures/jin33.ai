import type { Request } from 'express';
import type { IUser } from '../models/user.model.js';

// 认证请求接口
export interface IAuthenticatedRequest extends Request {
  user: IUser;  // 这里是必需的，不是可选的
} 