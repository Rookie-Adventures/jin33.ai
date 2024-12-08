declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGODB_URI: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      RATE_LIMIT_WINDOW: string;
      RATE_LIMIT_MAX_REQUESTS: string;
      LOG_LEVEL: string;
      HF_API_KEY: string;
      HF_MODEL_ENDPOINT: string;
      PROXY_HOST?: string;
      PROXY_PORT?: string;
      PROXY_USERNAME?: string;
      PROXY_PASSWORD?: string;
    }
  }
}

export {};
