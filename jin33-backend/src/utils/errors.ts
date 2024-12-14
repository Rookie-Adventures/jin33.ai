// Base error class for application
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation errors (400)
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// Authentication errors (401)
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

// Authorization errors (403)
export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 403);
  }
}

// Not found errors (404)
export class NotFoundError extends AppError {
  constructor(message: string = '资源不存在') {
    super(message, 404, 'NOT_FOUND_ERROR');
  }
}

// Rate limit errors (429)
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

// Database errors (500)
export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

// Helper function for type checking
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
