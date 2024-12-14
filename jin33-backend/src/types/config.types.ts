/**
 * 应用配置接口
 * @interface IAppConfig
 */
export interface IAppConfig {
  /** 服务端口号 */
  port: number;
  /** 运行环境 */
  env: string;
  /** API前缀 */
  apiPrefix: string;
  /** CORS允许的源 */
  corsOrigin: string | string[];
  /** JWT密钥 */
  jwtSecret: string;
  /** JWT过期时间 */
  jwtExpiration: string;
}

/**
 * 数据库配置接口
 * @interface IDbConfig
 */
export interface IDbConfig {
  /** MongoDB连接URI */
  uri: string;
  /** MongoDB连接选项 */
  options: {
    /** 使用新的URL解析器 */
    useNewUrlParser: boolean;
    /** 使用统一的拓扑结构 */
    useUnifiedTopology: boolean;
    /** 自动创建索引 */
    autoIndex: boolean;
    /** 服务器选择超时时间(ms) */
    serverSelectionTimeoutMS: number;
  };
}

/**
 * Redis配置接口
 * @interface IRedisConfig
 */
export interface IRedisConfig {
  /** Redis主机地址 */
  host: string;
  /** Redis端口号 */
  port: number;
  /** Redis密码 */
  password?: string;
  /** Redis数据库索引 */
  db?: number;
}

/**
 * 完整配置接口
 * @interface IConfig
 */
export interface IConfig {
  /** 应用配置 */
  app: IAppConfig;
  /** 数据库配置 */
  db: IDbConfig;
  /** Redis配置 */
  redis: IRedisConfig;
}

export interface LoggerConfig {
  level: string;
  format: string[];
  datePattern: string;
  dirname: string;
  filename: string;
}

export interface AppConfig {
  port: number;
  env: string;
  apiPrefix: string;
  corsOrigin: string | string[];
  jwtSecret: string;
  jwtExpiration: string;
}

export interface DbConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    autoIndex: boolean;
    serverSelectionTimeoutMS: number;
  };
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export interface Config {
  app: AppConfig;
  db: DbConfig;
  redis: RedisConfig;
  logger: LoggerConfig;
}

export interface RateLimitOptions {
  /** 时间窗口(毫秒) */
  windowMs: number;
  /** 最大请求次数 */
  max: number;
  /** 标准头部 */
  standardHeaders: boolean;
  /** 旧版头部 */
  legacyHeaders: boolean;
  /** 限制消息 */
  message: string;
} 