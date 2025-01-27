import { config } from '../../config';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken, verifyToken } from './auth.utils';
import AppError from '../../error/AppError';
import bcrypt from 'bcrypt';
import { TUser } from '../users/user.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistByCustomId(payload.email);

  console.log(user);
  console.log(payload.password, 'Payload Password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user.id || '',
    role: user.role || 'customer',
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRE as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const register = async (payload: TUser) => {
  const { email, password, role } = payload;
  console.log(payload);

  // Check if user already exists by email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  // Create a new user with customer role
  const newUser = new User({
    email,
    password: hashedPassword,
    role: role || 'customer',
  });

  // Save the new user
  await newUser.save();

  // JWT payload
  const jwtPayload = {
    userId: newUser.id || '',
    role: newUser.role || 'customer',
  };

  // Generate the access token
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.jwt_access_expires_in as string
  );

  // Generate the refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRE as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    message: 'User registered successfully.',
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    jwtPayload,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.JWT_REFRESH_SECRE as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    userId: user.id || '',
    role: user.role || 'customer',
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
  register,
  refreshToken,
};
