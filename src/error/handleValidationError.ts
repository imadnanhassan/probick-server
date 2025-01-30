import { Error } from 'mongoose';
import AppError from './AppError';

const handleValidationError = (err: Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => ({
    field: el.path,
    message: el.message,
  }));

  return new AppError(400, 'Validation error', errors);
};

export default handleValidationError;
