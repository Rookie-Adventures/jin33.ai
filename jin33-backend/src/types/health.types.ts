/**
 * 健康检查状态接口
 * @interface IHealthStatus
 */
export interface IHealthStatus {
  /** 服务状态 */
  status: 'OK' | 'ERROR';
  /** 检查时间戳 */
  timestamp: string;
  /** 详细状态信息 */
  details: {
    /** 数据库状态 */
    database: string;
    /** 其他状态信息 */
    [key: string]: string;
  };
} 