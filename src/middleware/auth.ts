import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import { config } from '../config';
import { UserModel } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized: No token provided.'
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string
    ) as JwtPayload & { userId: string; role: TUserRole };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User does not exist.');
    }

    if (
      requiredRoles.length > 0 &&
      !requiredRoles.includes(user.role as TUserRole)
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Forbidden: You do not have permission.'
      );
    }
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  });
};

export default auth;
