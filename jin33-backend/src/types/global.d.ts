import type { Response } from 'express';
import type { IUser } from '../models/user.model.js';

// Express 全局类型扩展
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// 工具模块声明
declare module '@utils/response' {
  // 使用命名空间组织类型
  namespace ResponseTypes {
    interface TApiResponse<T = unknown> {
      success: boolean;
      data?: T;
      error?: {
        code: string;
        message: string;
      };
    }

    interface IResponseUtil {
      success<T>(res: Response, data: T): Response;
      error(res: Response, code: string, status?: number, message?: string): Response;
    }
  }

  // 只声明类型，不声明具体实现
  type TApiResponse<T = unknown> = ResponseTypes.TApiResponse<T>;
  type IResponseUtil = ResponseTypes.IResponseUtil;
} 