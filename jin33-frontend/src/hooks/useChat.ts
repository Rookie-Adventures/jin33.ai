import { useState, useCallback } from 'react';

interface Message {
  content: string;
  isUser: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    try {
      setLoading(true);
      setError(null);

      // 添加用户消息
      setMessages(prev => [...prev, { content, isUser: true }]);

      // TODO: 实现实际的API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟AI响应
      setMessages(prev => [...prev, {
        content: '这是一个模拟的AI响应。实际功能正在开发中...',
        isUser: false
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送消息失败');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearError,
    clearMessages
  };
};
