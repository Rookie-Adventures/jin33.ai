import { Order, CreateOrderParams, OrderResponse, OrdersResponse } from '../types/order.types';
import { get, post } from './api';

/**
 * 创建订单
 * @param params 创建订单参数
 * @returns 创建的订单
 */
const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  const response = await post<OrderResponse>('/orders', {
    ...params,
    timestamp: new Date().toISOString()
  });
  return response.data;
};

/**
 * 获取订单列表
 * @returns 订单列表
 */
const getOrders = async (): Promise<Order[]> => {
  const response = await get<OrdersResponse>('/orders');
  return response.data;
};

/**
 * 获取指定订单
 * @param orderId 订单ID
 * @returns 订单信息
 */
const getOrder = async (orderId: string): Promise<Order> => {
  const response = await get<OrderResponse>(`/orders/${orderId}`);
  return response.data;
};

export const orderService = {
  createOrder,
  getOrders,
  getOrder
}; 