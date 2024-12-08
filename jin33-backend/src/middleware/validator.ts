import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '@/utils/error';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 执行所有验证
    await Promise.all(validations.map(validation => validation.run(req)));

    // 获取验证结果
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // 格式化错误信息
    const errorMessages = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
    }));

    // 抛出验证错误
    throw new ValidationError(JSON.stringify(errorMessages));
  };
};
