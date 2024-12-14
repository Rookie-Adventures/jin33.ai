import type { Message } from '@/types/chat.types';
import type { ModelConfig, ModelSelectProps } from './types/model.types';

// Component Props Types
export interface ChatProps {
  className?: string;
}

export interface ChatHeaderProps {
  onClear?: () => void;
  onSettings?: () => void;
}

export interface MessageListProps {
  messages: Message[];
}

export interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

// Component State Types
export interface ChatComponentState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// Re-export for convenience
export type { Message, ModelConfig, ModelSelectProps }; 