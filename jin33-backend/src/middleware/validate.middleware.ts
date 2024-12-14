import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult, ValidationError as ExpressValidationError } from 'express-validator';
import { ValidationError } from '../utils/errors';
import logger from '../config/logger';

interface ValidationErrorDetail {
  field: string;
  message: string;
  value?: unknown;
}

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Execute all validations
      await Promise.all(validations.map(validation => validation.run(req)));

      // Get validation results
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      // Log validation failures
      logger.warn('Validation failed:', {
        path: req.path,
        method: req.method,
        errors: errors.array()
      });

      // Format error messages
      const formattedErrors: ValidationErrorDetail[] = errors.array().map((err: ExpressValidationError) => ({
        field: err.type === 'field' ? err.path : err.type,
        message: err.msg,
        value: err.type === 'field' ? err.value : undefined
      }));

      // Return error response
      res.status(400).json({
        code: 'VALIDATION_FAILED',
        message: '请求参数验证失败',
        errors: formattedErrors
      });
    } catch (error) {
      logger.error('Validation middleware error:', error);
      next(new ValidationError('验证中间件异常'));
    }
  };
};
