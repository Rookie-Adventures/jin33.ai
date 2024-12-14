import mongoose from 'mongoose';
import { DbConfig } from '../types/config.types.js';
import logger from './logger.js';

const config: DbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jin33',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 10000
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.uri, config.options);
    logger.info('Successfully connected to MongoDB.');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
