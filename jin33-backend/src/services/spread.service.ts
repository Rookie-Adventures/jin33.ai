import { PriceData, SpreadCalculation, TradingPair, ArbitrageOpportunity } from '../types/trading';
import logger from '../config/logger';

export class SpreadService {
  private static instance: SpreadService;
  private priceCache: Map<string, PriceData[]>;
  private spreadThresholds: Map<string, number>;

  private constructor() {
    this.priceCache = new Map();
    this.spreadThresholds = new Map();
  }

  public static getInstance(): SpreadService {
    if (!SpreadService.instance) {
      SpreadService.instance = new SpreadService();
    }
    return SpreadService.instance;
  }

  // 更新价格数据
  public updatePrice(data: PriceData): void {
    const key = `${data.symbol}_${data.source}`;
    let prices = this.priceCache.get(key) || [];

    // 保留最近100条数据
    prices = [data, ...prices].slice(0, 100);
    this.priceCache.set(key, prices);

    // 触发价差计算
    this.calculateSpread(data.symbol);
  }

  // 计算价差
  private calculateSpread(symbol: string): SpreadCalculation | null {
    try {
      const sources = Array.from(this.priceCache.keys())
        .filter(key => key.startsWith(symbol))
        .map(key => key.split('_')[1]);

      if (sources.length < 2) {
        return null;
      }

      // 获取最新价格
      const prices = sources.map(source => {
        const key = `${symbol}_${source}`;
        const priceData = this.priceCache.get(key)?.[0];
        return priceData ? { source, price: priceData.price } : null;
      }).filter(Boolean);

      if (prices.length < 2) {
        return null;
      }

      // 找出最高和最低价
      const sortedPrices = prices.sort((a, b) => a!.price - b!.price);
      const buyPrice = sortedPrices[0]!.price;
      const sellPrice = sortedPrices[sortedPrices.length - 1]!.price;

      const spread = sellPrice - buyPrice;
      const spreadPercentage = (spread / buyPrice) * 100;

      const calculation: SpreadCalculation = {
        symbol,
        buyPrice,
        sellPrice,
        spread,
        timestamp: new Date()
      };

      // 检查是否超过阈值
      const threshold = this.spreadThresholds.get(symbol) || 0.5; // 默认0.5%
      if (spreadPercentage > threshold) {
        this.notifyArbitrageOpportunity({
          pair: {
            baseSymbol: symbol,
            quoteSymbol: 'USDT',
            minQuantity: 0.001,
            maxQuantity: 1000,
            spreadThreshold: threshold
          },
          buyExchange: sortedPrices[0]!.source,
          sellExchange: sortedPrices[sortedPrices.length - 1]!.source,
          potentialProfit: spread,
          timestamp: new Date(),
          confidence: this.calculateConfidence(spreadPercentage)
        });
      }

      return calculation;
    } catch (error) {
      logger.error('Error calculating spread:', error);
      return null;
    }
  }

  // 计算置信度
  private calculateConfidence(spreadPercentage: number): number {
    // 基于价差百分比计算置信度
    // 价差越大,置信度越高,但有上限
    const baseConfidence = Math.min(spreadPercentage * 10, 95);

    // 根据数据量调整置信度
    const dataPoints = Array.from(this.priceCache.values())
      .reduce((sum, prices) => sum + prices.length, 0);
    const dataConfidence = Math.min(dataPoints / 1000, 1);

    return baseConfidence * dataConfidence;
  }

  // 通知套利机会
  private notifyArbitrageOpportunity(opportunity: ArbitrageOpportunity): void {
    // TODO: 实现通知机制
    logger.info('Arbitrage opportunity found:', opportunity);
  }

  // 设置价差阈值
  public setSpreadThreshold(symbol: string, threshold: number): void {
    this.spreadThresholds.set(symbol, threshold);
  }

  // 获取特定交易对的价差数据
  public getSpreadData(symbol: string): SpreadCalculation | null {
    return this.calculateSpread(symbol);
  }

  // 清理过期数据
  public cleanupOldData(): void {
    const now = Date.now();
    for (const [key, prices] of this.priceCache.entries()) {
      const filteredPrices = prices.filter(
        price => now - price.timestamp.getTime() < 24 * 60 * 60 * 1000 // 保留24小时内的数据
      );
      if (filteredPrices.length === 0) {
        this.priceCache.delete(key);
      } else {
        this.priceCache.set(key, filteredPrices);
      }
    }
  }
}
