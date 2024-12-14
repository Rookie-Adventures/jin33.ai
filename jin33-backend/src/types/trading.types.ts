import type { Types } from 'mongoose';

/**
 * 交易价格数据接口
 * @interface ITradingPriceData
 */
export interface ITradingPriceData {
  /** 交易对符号 */
  symbol: string;
  /** 价格 */
  price: number;
  /** 时间戳 */
  timestamp: Date;
  /** 数据来源 */
  source: string;
}

/**
 * 价差计算接口
 * @interface ISpreadCalculation
 */
export interface ISpreadCalculation {
  /** 交易对符号 */
  symbol: string;
  /** 买入价格 */
  buyPrice: number;
  /** 卖出价格 */
  sellPrice: number;
  /** 价差 */
  spread: number;
  /** 计算时间 */
  timestamp: Date;
}

/**
 * 交易对配置接口
 * @interface ITradingPair
 */
export interface ITradingPair {
  /** 基础货币符号 */
  baseSymbol: string;
  /** 计价货币符号 */
  quoteSymbol: string;
  /** 最小交易数量 */
  minQuantity: number;
  /** 最大交易数量 */
  maxQuantity: number;
  /** 价差阈值 */
  spreadThreshold: number;
}

/**
 * 套利机会接口
 * @interface IArbitrageOpportunity
 */
export interface IArbitrageOpportunity {
  /** 交易对 */
  pair: ITradingPair;
  /** 买入交易所 */
  buyExchange: string;
  /** 卖出交易所 */
  sellExchange: string;
  /** 潜在利润 */
  potentialProfit: number;
  /** 发现时间 */
  timestamp: Date;
  /** 置信度 */
  confidence: number;
}

/**
 * 交易执行接口
 * @interface ITradeExecution
 */
export interface ITradeExecution {
  /** 交易ID */
  _id?: Types.ObjectId;
  /** 用户ID */
  userId: Types.ObjectId;
  /** 交易对 */
  pair: ITradingPair;
  /** 交易方向 */
  side: 'buy' | 'sell';
  /** 交易价格 */
  price: number;
  /** 交易数量 */
  quantity: number;
  /** 交易总额 */
  total: number;
  /** 手续费 */
  fee: number;
  /** 交易状态 */
  status: 'pending' | 'executed' | 'failed';
  /** 交易时间 */
  timestamp: Date;
} 