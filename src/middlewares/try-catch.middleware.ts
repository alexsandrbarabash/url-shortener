import { Request, Response, NextFunction } from 'express';

export const tryCatchWrapper =
  (cb: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res);
    } catch (e) {
      next(e);
    }
  };
