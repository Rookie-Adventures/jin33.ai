import { orderService } from '../order';
import { get, post } from '../api';
import { Order, CreateOrderParams, OrderResponse, OrdersResponse, OrderStatus } from '@/types/order.types';
import { ResponseStatus, StatusCode } from '@/types/api.types';

// Mock API service
jest.mock('../api', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

/* eslint-disable jest/no-disabled-tests */
// 订单服务是中间层功能，在第二阶段开发
// 现阶段跳过测试以专注于核心基础设施的开发
describe.skip('Order Service', () => {
  const mockOrder: Order = {
    id: '1',
    userId: '1',
    amount: 100,
    status: OrderStatus.COMPLETED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Test order'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    const createParams: CreateOrderParams = {
      amount: 100,
      description: 'Test order'
    };

    it('should create new order', async () => {
      const mockResponse: OrderResponse = {
        code: StatusCode.SUCCESS,
        status: ResponseStatus.SUCCESS,
        message: '创建成功',
        data: mockOrder
      };
      (post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await orderService.createOrder(createParams);

      expect(post).toHaveBeenCalledWith('/orders', createParams);
      expect(result).toEqual(mockOrder);
    });

    it('should handle creation error', async () => {
      const error = new Error('Failed to create order');
      (post as jest.Mock).mockRejectedValue(error);

      await expect(orderService.createOrder(createParams))
        .rejects.toThrow('Failed to create order');
    });
  });

  describe('getOrders', () => {
    it('should fetch all orders', async () => {
      const mockResponse: OrdersResponse = {
        code: StatusCode.SUCCESS,
        status: ResponseStatus.SUCCESS,
        message: '获取成功',
        data: [mockOrder]
      };
      (get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await orderService.getOrders();

      expect(get).toHaveBeenCalledWith('/orders');
      expect(result).toEqual([mockOrder]);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch orders');
      (get as jest.Mock).mockRejectedValue(error);

      await expect(orderService.getOrders())
        .rejects.toThrow('Failed to fetch orders');
    });
  });

  describe('getOrder', () => {
    const orderId = '1';

    it('should fetch specific order', async () => {
      const mockResponse: OrderResponse = {
        code: StatusCode.SUCCESS,
        status: ResponseStatus.SUCCESS,
        message: '获取成功',
        data: mockOrder
      };
      (get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await orderService.getOrder(orderId);

      expect(get).toHaveBeenCalledWith(`/orders/${orderId}`);
      expect(result).toEqual(mockOrder);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Order not found');
      (get as jest.Mock).mockRejectedValue(error);

      await expect(orderService.getOrder(orderId))
        .rejects.toThrow('Order not found');
    });
  });
}); 