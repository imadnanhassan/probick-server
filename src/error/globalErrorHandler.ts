/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ZodError } from 'zod';
import { handleZodValidationError } from './zodError';
import httpStatus from 'http-status';
import { ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const result = handleZodValidationError(error);

    res.status(result.statusCode).json({
      success: false,
      message: result.errorMessage,
      errorDetails: result.errorDetails,
    });
    return;
  }

  // Handle Duplicate Error
  if (error.code === 'P2002') {
    let message;
    const errorMessage = error.message;
    const regex = /Unique constraint failed on the fields: \(`(.+?)`\)/;
    const match = errorMessage.match(regex);

    if (match) {
      const constraintFields = match[1];
      message = `Duplicate error constraint failed on fields: ${constraintFields}`;
    } else {
      message = 'Failed to extract constraint details from error message';
    }
    res.status(httpStatus.CONFLICT).json({
      success: false,
      message,
      errorDetails: error as Record<string, unknown>,
    });
    return;
  }

  // Handle other errors
  const statusCode = error.statusCode || 500;
  const message = error.message || 'An unexpected error occurred';
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: error,
  });
  return;
};
