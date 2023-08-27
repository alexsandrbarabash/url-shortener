import { config } from 'dotenv';

config();

export type DbConfig = {
  port: number;
  host: string;
  password: string;
  databaseName: string;
  username: string;
  poolSize: number;
};

const configSelector = (): DbConfig => {
  const port = Number(process.env.DB_PORT);
  const host = process.env.DB_HOST;
  const password = process.env.DB_PASSWORD;
  const databaseName = process.env.DB_NAME;
  const username = process.env.DB_USERNAME;
  const poolSize = Number(process.env.DB_POOL_SIZE);

  if (!port || !host || !password || !databaseName || !username) {
    throw new Error(
      'DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME required',
    );
  }

  return {
    port,
    host,
    password,
    databaseName,
    username,
    poolSize: poolSize || 40,
  };
};

export const dbConfig = configSelector();
