import { Error } from 'mongoose';
import AppError from './AppError';

const handleCastError = (err: Error.CastError) => {
  return new AppError(400, `Invalid ${err.path}: ${err.value}.`, [
    { field: err.path, message: `Invalid value for field ${err.path}` },
  ]);
};

export default handleCastError;
