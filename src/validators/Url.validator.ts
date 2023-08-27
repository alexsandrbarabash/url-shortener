import * as yup from 'yup';

import {
  CreateShortUrlBody,
  GetByShortUrlBody,
  RedirectByNanoID,
} from '../models/url/url.query.models';

export const createUrlValidator = yup.object<CreateShortUrlBody>({
  url: yup.string().url().required(),
});

export const getUrlByShortValidator = yup.object<GetByShortUrlBody>({
  shortUrl: yup.string(),
});

export const redirectByNanoIdValidator = yup.object<RedirectByNanoID>({
  nanoId: yup.string().required(),
});
