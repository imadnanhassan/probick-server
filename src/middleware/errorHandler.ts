/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { constants } from '../utils/constants';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = err as CustomError;

  const statusCode =
    error.statusCode || constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
