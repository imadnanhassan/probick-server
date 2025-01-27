import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { constants } from '../utils/constants';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          status: 'error',
          message: constants.MESSAGES.VALIDATION_ERROR,
          error: error.errors, 
        });
      } else {
        // Fallback for unexpected errors
        res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          status: 'error',
          message: constants.MESSAGES.VALIDATION_ERROR,
        });
      }
    }
  };
