// Model Configuration Types
export interface ModelConfig {
    id: string;
    name: string;
    description?: string;
    maxTokens?: number;
    temperature?: number;
    provider: 'openai' | 'anthropic' | 'huggingface';
    baseUrl?: string;
    apiVersion?: string;
    disabled?: boolean;
}

// Model Selection Props
export interface ModelSelectProps {
    value?: string;
    onChange: (value: string) => void;
    models: ModelConfig[];
    disabled?: boolean;
} 