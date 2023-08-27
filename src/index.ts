import express from 'express';

import { appConfig } from './config/app.config';
import { getConnection as getDbConnection } from './models/db-connect';
import { getConnection as getRedisConnection } from './models/redis-connect';
import { errorMiddleware } from './middlewares';
import { UrlRouter } from './api';

const app = express();
app.use(express.json());

app.use('/', UrlRouter);

app.use(errorMiddleware);

const main = async () => {
  app.listen(appConfig.port, async () => {
    await getDbConnection();
    await getRedisConnection();
    console.log(`Server started at PORT:${appConfig.port}`);
  });
};

main();
