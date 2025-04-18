import { MongoServerError } from 'mongodb';
import AppError from './AppError';

const handleDuplicateError = (err: MongoServerError) => {
  const field = err.message.match(/index: (.+?) dup key/);
  const fieldName = field ? field[1] : 'unknown field';
  const message = `Duplicate value found for field: ${fieldName}`;

  return new AppError(400, message, err.stack || '');
};

export default handleDuplicateError;
