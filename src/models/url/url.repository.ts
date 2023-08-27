import { RedisKey } from 'ioredis';

import { Url } from './url.entity';
import { IUrl } from './url.query.models';
import { getConnection } from '../redis-connect';
import { appConfig } from '../../config';

class Repository {
  private async get<T = any>(key: RedisKey): Promise<T | null> {
    const redisClient = await getConnection();

    const data = await redisClient.get(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  private async set<T = any>(
    key: RedisKey,
    value: T,
    expire?: number,
  ): Promise<void> {
    const redisClient = await getConnection();

    if (expire) {
      await redisClient.set(key, JSON.stringify(value), 'PX', expire);
      return;
    }
    await redisClient.set(key, JSON.stringify(value));
  }

  private async expire(key: RedisKey, ms: number): Promise<boolean> {
    const redisClient = await getConnection();

    const res = await redisClient.pexpire(key, ms);

    return res === 1;
  }

  private makeUrlRecord(entity: Url): IUrl {
    return {
      id: entity.id,
      nanoId: entity.nanoId,
      url: entity.url,
    };
  }

  async findOne(params: Partial<IUrl>): Promise<IUrl | null> {
    if (params.nanoId) {
      const entity = await this.get(params.nanoId);

      if (entity) {
        await this.expire(params.nanoId, appConfig.redisConfig.ttl);
      }

      return entity;
    }

    const entity = await Url.findOne({ where: params });

    if (entity) {
      const record = this.makeUrlRecord(entity);
      await this.set(record.nanoId, record, appConfig.redisConfig.ttl);
    }

    return entity;
  }

  async create(params: Omit<IUrl, 'id'>): Promise<IUrl> {
    const entity = await Url.create({ url: params.url, nanoId: params.nanoId });

    const record = this.makeUrlRecord(entity);

    await this.set(params.nanoId, record, appConfig.redisConfig.ttl);

    return entity;
  }
}

export const UrlRepository = new Repository();
