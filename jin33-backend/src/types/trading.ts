export interface PriceData {
    symbol: string;
    price: number;
    timestamp: number;
}

export interface SpreadCalculation {
    buyPrice: number;
    sellPrice: number;
    spread: number;
    timestamp: number;
}

export interface TradingPair {
    base: string;
    quote: string;
}

export interface ArbitrageOpportunity {
    pair: TradingPair;
    spread: SpreadCalculation;
    profitPotential: number;
    timestamp: number;
} 