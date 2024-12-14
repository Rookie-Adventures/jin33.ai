import winston from 'winston';
import type { LoggerConfig } from '../types/config.types.js';

const config: LoggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: ['timestamp', 'json'],
  datePattern: 'YYYY-MM-DD',
  dirname: 'logs',
  filename: '%DATE%.log'
};

const logger = winston.createLogger({
  level: config.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // 文件输出
    new winston.transports.File({
      dirname: config.dirname,
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.File({
      dirname: config.dirname,
      filename: 'combined.log'
    })
  ]
});

// 开发环境下的额外配置
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
