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
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string);
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const { role, userId, iat } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await User.isUserExistByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    

  

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!'
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
