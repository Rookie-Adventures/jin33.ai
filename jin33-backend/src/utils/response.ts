import { Response } from 'express';
import type { TApiResponse, IResponseUtil } from '../types/response.types.js';

class ResponseUtilImpl implements IResponseUtil {
  success<T>(res: Response, data: T): Response {
    const response: TApiResponse<T> = {
      success: true,
      data
    };
    return res.json(response);
  }

  error(res: Response, code: string, status = 400, message?: string): Response {
    const response: TApiResponse = {
      success: false,
      error: {
        code,
        message: message || code
      }
    };
    return res.status(status).json(response);
  }
}

// 创建单例实例
const responseHandler = new ResponseUtilImpl();
export default responseHandler; 