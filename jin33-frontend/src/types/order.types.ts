import type { ApiResponse, ResponseStatus } from './api.types';
import type { ID, Nullable } from './index';
import type { User } from './auth.types';

// Order Types
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled'
}

export interface Order {
  id: ID;
  userId: ID;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  description?: string;
  metadata?: Record<string, unknown>;
}

// Order State Types
export interface OrderState {
  orders: Order[];
  currentOrder: Nullable<Order>;
  status: ResponseStatus;
  error: Nullable<string>;
}

// Order Request Types
export interface CreateOrderParams {
  amount: number;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateOrderParams {
  orderId: ID;
  status?: OrderStatus;
  description?: string;
  metadata?: Record<string, unknown>;
}

// Order Response Types
export type OrderResponse = ApiResponse<Order>;
export type OrdersResponse = ApiResponse<Order[]>;

// Order Error Types
export interface OrderError {
  message: string;
  orderId?: ID;
  field?: string;
} 