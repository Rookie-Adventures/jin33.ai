export * from './response.types.js';
export * from './health.types.js';
export * from './trading.types.js';
export * from './config.types.js';

// Add utility types
export type TDeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? TDeepPartial<T[P]> : T[P];
}; 