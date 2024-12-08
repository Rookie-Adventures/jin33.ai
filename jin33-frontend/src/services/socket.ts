import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat.types';

class SocketService {
  private socket: Socket | null = null;
  private messageHandlers: ((message: Message) => void)[] = [];

  // 初始化连接
  connect() {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'ws://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  // 设置事件监听
  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    this.socket.on('message', (message: Message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }

  // 添加消息处理器
  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
  }

  // 移除消息处理器
  offMessage(handler: (message: Message) => void) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  // 发送消息
  sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    if (!this.socket?.connected) {
      throw new Error('WebSocket not connected');
    }
    this.socket.emit('message', message);
  }

  // 断开连接
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.messageHandlers = [];
    }
  }

  // 获取连接状态
  isConnected(): boolean {
    return !!this.socket?.connected;
  }
}

// 导出单例实例
export const socketService = new SocketService();
