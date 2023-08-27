import { config } from 'dotenv';

import { dbConfig, DbConfig } from './db.config';
import { redisConfig, RedisConfig } from './redis.config';

config();

export type AppConfig = {
  isProduction: boolean;
  port: number;
  baseUrl: string;
  dbConfig: DbConfig;
  redisConfig: RedisConfig;
};

const configSelector = (): AppConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT);
  const baseUrl = process.env.BASE_URL;

  if (!port || !baseUrl) {
    throw new Error('Port & BASE_URL required');
  }

  return {
    isProduction,
    port,
    baseUrl,
    dbConfig,
    redisConfig,
  };
};

export const appConfig = configSelector();
