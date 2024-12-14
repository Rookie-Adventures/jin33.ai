/**
 * 全局环境变量声明
 */
declare global {
  namespace NodeJS {
    /** 进程环境变量接口 */
    interface ProcessEnv {
      /** 运行环境 */
      NODE_ENV: 'development' | 'production' | 'test';
      /** 服务端口 */
      PORT: string;
      /** MongoDB连接URI */
      MONGODB_URI: string;
      /** Redis主机地址 */
      REDIS_HOST: string;
      /** Redis端口 */
      REDIS_PORT: string;
      /** Redis密码 */
      REDIS_PASSWORD: string;
      /** JWT密钥 */
      JWT_SECRET: string;
      /** JWT过期时间 */
      JWT_EXPIRES_IN: string;
      /** 限流时间窗口 */
      RATE_LIMIT_WINDOW: string;
      /** 限流最大请求数 */
      RATE_LIMIT_MAX_REQUESTS: string;
      /** 日志级别 */
      LOG_LEVEL: string;
      /** HuggingFace API密钥 */
      HF_API_KEY: string;
      /** HuggingFace模型端点 */
      HF_MODEL_ENDPOINT: string;
      /** 代理主机地址 */
      PROXY_HOST?: string;
      /** 代理端口 */
      PROXY_PORT?: string;
      /** 代理用户名 */
      PROXY_USERNAME?: string;
      /** 代理密码 */
      PROXY_PASSWORD?: string;
    }
  }
}

// 确保这个文件被视为一个模块
export {};
