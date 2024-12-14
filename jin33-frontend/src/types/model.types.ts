import type { ApiResponse, ResponseStatus } from './api.types';
import type { ID, Nullable } from './index';

// Model Types
export interface Model {
  id: ID;
  name: string;
  description: string;
  version: string;
  provider: string;
  type: ModelType;
  status: ModelStatus;
  config: ModelConfig;
  createdAt: string;
  updatedAt: string;
  createdBy: ID;
}

export enum ModelType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video'
}

export enum ModelStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance'
}

export interface ModelConfig {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  [key: string]: unknown;
}

// Model State Types
export interface ModelState {
  models: Model[];
  currentModel: Nullable<Model>;
  status: ResponseStatus;
  error: Nullable<string>;
}

// Model Request Types
export interface CreateModelParams {
  name: string;
  description: string;
  version: string;
  provider: string;
  type: ModelType;
  config: ModelConfig;
}

export interface UpdateModelParams {
  modelId: ID;
  name?: string;
  description?: string;
  version?: string;
  config?: Partial<ModelConfig>;
  status?: ModelStatus;
}

// Model Response Types
export type ModelResponse = ApiResponse<Model>;
export type ModelsResponse = ApiResponse<Model[]>;

// Model Error Types
export interface ModelError {
  message: string;
  modelId?: ID;
  field?: string;
} 