import { render, screen, fireEvent } from '@testing-library/react';
import Chat from './Chat';
import { useChat } from './hooks/useChat';
import { MessageRole } from '@/types/chat.types';
import type { Message } from '@/types/chat.types';

// Mock useChat hook
jest.mock('./hooks/useChat', () => ({
  useChat: jest.fn()
}));

describe('Chat Component', () => {
  const mockMessages: Message[] = [
    {
      id: '1',
      role: MessageRole.USER,
      content: 'Hello',
      timestamp: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      role: MessageRole.ASSISTANT,
      content: 'Hi there!',
      timestamp: '2024-01-01T00:00:01Z'
    }
  ];

  const mockChatHook = {
    messages: mockMessages,
    loading: false,
    error: null,
    sendMessage: jest.fn(),
    clearError: jest.fn(),
    clearMessages: jest.fn()
  };

  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue(mockChatHook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render chat component', (): void => {
    render(<Chat />);
    expect(screen.getByTestId('chat-container')).toBeInTheDocument();
  });

  it('should display messages', (): void => {
    render(<Chat />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('should show loading state', (): void => {
    (useChat as jest.Mock).mockReturnValue({
      ...mockChatHook,
      loading: true
    });
    render(<Chat />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show error message', (): void => {
    const errorMessage = 'Test error message';
    (useChat as jest.Mock).mockReturnValue({
      ...mockChatHook,
      error: errorMessage
    });
    render(<Chat />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should handle message input', (): void => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/type a message/i);
    fireEvent.change(input, { target: { value: 'New message' } });
    expect(input).toHaveValue('New message');
  });

  it('should send message on button click', (): void => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByLabelText(/send message/i);

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    expect(mockChatHook.sendMessage).toHaveBeenCalledWith('Test message');
    expect(input).toHaveValue('');
  });

  it('should clear messages when header clear button is clicked', (): void => {
    render(<Chat />);
    const clearButton = screen.getByLabelText(/clear messages/i);
    fireEvent.click(clearButton);
    expect(mockChatHook.clearMessages).toHaveBeenCalled();
  });

  it('should disable input when loading', (): void => {
    (useChat as jest.Mock).mockReturnValue({
      ...mockChatHook,
      loading: true
    });
    render(<Chat />);
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByLabelText(/send message/i);

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it('should clear error when error alert is closed', (): void => {
    (useChat as jest.Mock).mockReturnValue({
      ...mockChatHook,
      error: 'Error message'
    });
    render(<Chat />);
    const closeButton = screen.getByTitle('Close');

    fireEvent.click(closeButton);
    expect(mockChatHook.clearError).toHaveBeenCalled();
  });
}); 