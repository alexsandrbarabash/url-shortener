import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const defaultError = 'Internal server error';
  const serverStatus = err.status || 500;
  const serverMessage = err.message || defaultError;
  const serverErrors: string[] = err.errors || [];

  return res.status(serverStatus).json({
    message: serverMessage,
    errors: serverErrors,
  });
};
