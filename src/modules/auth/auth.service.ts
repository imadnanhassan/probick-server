import { config } from '../../config';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken, verifyToken } from './auth.utils';
import AppError from '../../error/AppError';
import bcrypt from 'bcrypt';
import { TUser } from '../users/user.interface';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  // }

  const jwtPayload = {
    userId: user.id || '',
    role: user.role || 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    parseInt(config.jwt_access_expires_in as string)
  );

  return {
    accessToken,
  };
};

const register = async (payload: TUser) => {
  const { email, password, role } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists.');
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const newUser = new User({
    email,
    password: hashedPassword,
    role: role || 'user',
  });

  await newUser.save();

  const jwtPayload = {
    userId: newUser.id || '',
    role: newUser.role || 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    parseInt(config.jwt_access_expires_in as string)
  );

  return {
    message: 'User registered successfully.',
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  register,
};