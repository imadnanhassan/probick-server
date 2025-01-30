import { ZodError } from 'zod';
import AppError from './AppError';

const handleZodError = (err: ZodError) => {
  const errors = err.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));

  return new AppError(400, 'Validation failed', errors);
};

export default handleZodError;
