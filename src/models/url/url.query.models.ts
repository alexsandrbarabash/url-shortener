import { Request } from 'express';

export interface IUrl {
  id: number;
  url: string;
  nanoId: string;
}

export type RedirectByNanoID = {
  nanoId: string;
};

export type CreateShortUrlBody = {
  url: string;
};

export type GetUrlByShortQuery = {
  shortUrl: string;
};

export type GetByShortUrlBody = {
  shortUrl: string;
};

export type GetByShortUrlBodyRequest = Request<{}, {}, {}, GetUrlByShortQuery>;
export type RedirectByNanoIDRequest = Request<RedirectByNanoID, {}, {}>;
export type CreateShortUrlRequest = Request<{}, {}, CreateShortUrlBody>;
export type GetByShortUrlRequest = Request<{}, {}, GetByShortUrlBody>;
