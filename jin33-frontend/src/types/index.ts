// Base Types
export * from './api.types';

// Feature Types
export * from './auth.types';
export * from './chat.types';
export * from './model.types';
export * from './order.types';
export * from './route.types';
export * from './theme.types';

// Common Types
export type ID = string | number;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Utility Types
export type AsyncReturnType<T extends (...args: any[]) => Promise<any>> = 
  T extends (...args: any[]) => Promise<infer R> ? R : any; 