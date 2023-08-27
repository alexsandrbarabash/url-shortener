import { nanoid } from 'nanoid/non-secure';
import { URL } from 'url';

import { CreateShortUrlBody, IUrl } from '../models/url/url.query.models';
import { UrlRepository } from '../models/url/url.repository';
import { appConfig } from '../config';

class Service {
  async createUrl(createShortUrlBody: CreateShortUrlBody): Promise<string> {
    const data = await UrlRepository.findOne({ url: createShortUrlBody.url });
    if (data) {
      return new URL(data.nanoId, appConfig.baseUrl).href;
    }
    const id = nanoid();
    await UrlRepository.create({ nanoId: id, url: createShortUrlBody.url });
    return new URL(id, appConfig.baseUrl).href;
  }

  async getUrlByShort(shortUrl: string): Promise<string> {
    const nanoId = new URL(shortUrl).pathname.slice(1);
    const result = await this.getByNanoid(nanoId);
    return result.url;
  }

  async getByNanoid(nanoId: string): Promise<IUrl> {
    const url = await UrlRepository.findOne({ nanoId });

    if (!url) {
      throw new Error('Url not found');
    }
    return url;
  }
}

export const UrlService = new Service();
