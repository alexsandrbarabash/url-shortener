import { config } from 'dotenv';

config();

export type RedisConfig = {
  host: string;
  password?: string;
  db: number;
  username: string;
  port: number;
  ttl: number;
};

const configSelector = (): RedisConfig => {
  const port = Number(process.env.REDIS_PORT);
  const host = process.env.REDIS_HOST;
  const password = process.env.REDIS_PASSWORD;
  const username = process.env.REDIS_USERNAME;
  const ttl = Number(process.env.REDIS_TTL);
  const db = Number(process.env.REDIS_DB);

  if (!port || !host || isNaN(db) || !username || isNaN(ttl)) {
    throw new Error(
      'REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_USERNAME, REDIS_DB required',
    );
  }

  return { port, host, password, username, db, ttl };
};

export const redisConfig = configSelector();
