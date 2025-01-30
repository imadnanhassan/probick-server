import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { ZodError } from 'zod';
import AppError from '../error/AppError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';


export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  let processedError: AppError = new AppError(
    500,
    'An unexpected error occurred'
  );

  if (err instanceof AppError) {
    processedError = err;
  } else if (err instanceof MongooseError.CastError) {
    processedError = handleCastError(err);
  } else if (err instanceof MongoServerError && err.code === 11000) {
    processedError = handleDuplicateError(err);
  } else if (err instanceof MongooseError.ValidationError) {
    processedError = handleValidationError(err);
  } else if (err instanceof ZodError) {
    processedError = handleZodError(err);
  } else if (err instanceof Error) {
    processedError = new AppError(500, err.message);
  }

  res.status(processedError.statusCode).json({
    success: false,
    statusCode: processedError.statusCode,
    message: processedError.message,
    errors: processedError.errors || [],
    stack:
      process.env.NODE_ENV === 'development' ? processedError.stack : undefined,
  });
};
