import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config";
import { unauthorizedErrorResponse } from "../error/unauthorizeError";
import { TUserRole } from "../modules/users/user.constant";
import { TUser } from '../modules/users/user.interface';
import { UserModel } from "../modules/users/user.model";


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    // Checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    const { id, email, role } = decoded;

    const user = await UserModel.findOne({
      where: { id, email },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      res.status(httpStatus.UNAUTHORIZED).json(unauthorizedErrorResponse);
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
