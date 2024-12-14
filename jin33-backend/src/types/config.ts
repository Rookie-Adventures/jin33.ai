import { ConnectOptions } from 'mongoose';

export interface DatabaseConfig {
    uri: string;
    options: ConnectOptions;
}

export interface RateLimitOptions {
    windowMs: number;
    max: number;
    message: string;
}

export interface JwtConfig {
    secret: string;
    expiresIn: string | number;
}

export interface AppConfig {
    port: number;
    env: string;
    database: DatabaseConfig;
    jwt: JwtConfig;
    rateLimit: RateLimitOptions;
} 