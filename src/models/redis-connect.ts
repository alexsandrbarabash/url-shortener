import { Redis } from 'ioredis';

import { appConfig } from '../config';

let redis: Redis | null = null;

export const getConnection = async (): Promise<Redis> => {
  if (!redis) {
    redis = new Redis({
      host: appConfig.redisConfig.host,
      db: appConfig.redisConfig.db,
      password: appConfig.redisConfig.password,
      username: appConfig.redisConfig.username,
      port: appConfig.redisConfig.port,
    });
  }

  return redis;
};
