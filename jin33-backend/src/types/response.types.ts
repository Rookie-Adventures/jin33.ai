import type { Response } from 'express';

/**
 * API响应数据结构
 * @template T - 响应数据类型
 */
export interface TApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * 响应工具接口
 * @interface IResponseUtil
 */
export interface IResponseUtil {
  /**
   * 成功响应
   * @template T - 响应数据类型
   * @param {Response} res - Express响应对象
   * @param {T} data - 响应数据
   * @returns {Response} Express响应对象
   */
  success<T>(res: Response, data: T): Response;

  /**
   * 错误响应
   * @param {Response} res - Express响应对象
   * @param {string} code - 错误代码
   * @param {number} [status=400] - HTTP状态码
   * @param {string} [message] - 错误信息
   * @returns {Response} Express响应对象
   */
  error(res: Response, code: string, status?: number, message?: string): Response;
} 