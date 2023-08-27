import { Response } from 'express';

import {
  CreateShortUrlRequest,
  RedirectByNanoIDRequest,
  GetByShortUrlBodyRequest,
} from '../models/url/url.query.models';
import { UrlService } from '../services/url.service';

class Controller {
  async createUrlHandler(
    req: CreateShortUrlRequest,
    res: Response,
  ): Promise<void> {
    const url = await UrlService.createUrl(req.body);
    res.status(200).json(url);
  }

  async getByNanoidHandler(
    req: RedirectByNanoIDRequest,
    res: Response,
  ): Promise<void> {
    const data = await UrlService.getByNanoid(req.params.nanoId);

    res.redirect(data.url);
  }

  async getUrlByShortHandler(
    req: GetByShortUrlBodyRequest,
    res: Response,
  ): Promise<void> {
    const result = await UrlService.getUrlByShort(req.query.shortUrl);
    res.status(200).send(result);
  }
}

export const UrlController = new Controller();
