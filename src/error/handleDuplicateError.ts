import { MongoServerError } from 'mongodb';
import AppError from './AppError';

const handleDuplicateError = (err: MongoServerError) => {
  const key = Object.keys(err.keyValue)[0];
  const message = `Duplicate field value: ${err.keyValue[key]}. Please use another value!`;

  return new AppError(400, message, [{ field: key, message: `Duplicate value for field: ${key}` }]);
};

export default handleDuplicateError;
