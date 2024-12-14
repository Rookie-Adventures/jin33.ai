// Status Codes
export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

// Response Status
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  IDLE = 'idle',
}

// Base Response Type
export interface ApiResponse<T = unknown> {
  code: StatusCode;
  data: T;
  message: string;
  status: ResponseStatus;
  timestamp?: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type PaginatedData<T> = {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;

// Error Types
export interface ApiError {
  code: StatusCode;
  message: string;
  data?: unknown;
  stack?: string;
}

// Request Types
export type ApiRequestParams = Record<string, unknown>;
export type ApiQueryParams = Record<string, string | number | boolean>;

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API Options
export interface ApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: ApiQueryParams;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer';
}

// API Response Handlers
export type ApiSuccessHandler<T> = (response: ApiResponse<T>) => void;
export type ApiErrorHandler = (error: ApiError) => void;

// API Cache Types
export interface ApiCache {
  data: unknown;
  timestamp: number;
  expiry: number;
}
