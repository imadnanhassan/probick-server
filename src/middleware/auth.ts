import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import { config } from '../config';
import { User } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer '

    console.log(token, 'token'); // Debugging: Log the token

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string);
    } catch (error) {
      console.error('Token verification failed:', error); // Debugging: Log the error
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Extract user details from token
    const { role, userId, iat } = decoded as JwtPayload;

    // Check if user exists
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // Check if user role is authorized
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Attach user details to the request object
    req.user = decoded as JwtPayload & { role: string };

    // Proceed to the next middleware or route handler
    next();
  });
};

export default auth;



