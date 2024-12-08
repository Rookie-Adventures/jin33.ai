export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> extends ApiResponse<{
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}> {}

export interface ApiError {
  code: number;
  message: string;
  data?: any;
}
