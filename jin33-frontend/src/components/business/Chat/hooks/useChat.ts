import { useState, useCallback } from 'react';
import { MessageRole } from '../../../../types/chat.types';
import type { Message } from '../../../../types/chat.types';
import { ResponseStatus } from '../../../../types/api.types';

interface ChatState {
  messages: Message[];
  status: ResponseStatus;
  error: string | null;
}

interface UseChatReturn {
  messages: Message[];
  status: ResponseStatus;
  error: string | null;
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

// 临时服务的模拟数据
const MOCK_DELAY = 1000;
const MOCK_RESPONSES = [
  "这是一个模拟的AI回复",
  "我是临时服务器的回复",
  "您好,我是测试助手"
];

export const useChat = (): UseChatReturn => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    status: ResponseStatus.IDLE,
    error: null
  });

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content,
      timestamp: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      status: ResponseStatus.LOADING,
      error: null
    }));

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      // 随机选择一个模拟回复
      const mockResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.ASSISTANT,
        content: mockResponse,
        timestamp: new Date().toISOString()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        status: ResponseStatus.SUCCESS
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        status: ResponseStatus.ERROR,
        error: error instanceof Error ? error.message : '发送消息失败'
      }));
    }
  }, []);

  const clearMessages = useCallback((): void => {
    setState({
      messages: [],
      status: ResponseStatus.IDLE,
      error: null
    });
  }, []);

  const clearError = useCallback((): void => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  return {
    ...state,
    loading: state.status === ResponseStatus.LOADING,
    sendMessage,
    clearMessages,
    clearError
  };
};

export default useChat;
