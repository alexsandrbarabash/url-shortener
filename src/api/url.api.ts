import { Router } from 'express';

import {
  tryCatchWrapper,
  validateModelBody,
  validateModelParams,
  validateModelQuery,
} from '../middlewares';
import { UrlController } from '../controllers';
import {
  createUrlValidator,
  getUrlByShortValidator,
  redirectByNanoIdValidator,
} from '../validators';

export const UrlRouter = Router();

UrlRouter.get(
  '/url/by-short',
  validateModelQuery(getUrlByShortValidator),
  tryCatchWrapper(UrlController.getUrlByShortHandler),
);

UrlRouter.post(
  '/create-url',
  validateModelBody(createUrlValidator),
  tryCatchWrapper(UrlController.createUrlHandler),
);

UrlRouter.get(
  '/:nanoId',
  validateModelParams(redirectByNanoIdValidator),
  tryCatchWrapper(UrlController.getByNanoidHandler),
);
