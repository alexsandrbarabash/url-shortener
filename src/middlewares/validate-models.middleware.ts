import { NextFunction, Request, Response } from 'express';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

export const validateModelBody =
  <A extends Maybe<AnyObject>, B, C>(validator: ObjectSchema<A, B, C>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await validator.validate(body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(new Error('Validation error'));
      }
      next(new Error('Validation error'));
    }
  };

export const validateModelParams =
  <A extends Maybe<AnyObject>, B, C>(validator: ObjectSchema<A, B, C>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      await validator.validate(params, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(new Error('Validation error'));
      }
      next(new Error('Validation error'));
    }
  };

export const validateModelQuery =
  <A extends Maybe<AnyObject>, B, C>(validator: ObjectSchema<A, B, C>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      await validator.validate(query, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(new Error('Validation error'));
      }
      next(new Error('Validation error'));
    }
  };
