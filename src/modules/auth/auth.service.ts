import sendResponse from '../../utils/sendResponse';
import { TLoginUser, TRegisterUser } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { UserModel } from '../users/user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';

const registerUser = async (payload: TRegisterUser, res: any) => {
  const { name, email, password } = payload;
  console.log('payload', payload);

  if (!name || !email || !password) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: 'Please provide all the required fields!',
      data: {},
    });

    return;
  }
  const existingUser = await UserModel.findOne({ email });
  console.log(existingUser);

  if (!existingUser) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User not found',
      data: {},
    });

    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: payload.role,
  });

  console.log(newUser);
  await newUser.save();
  const token = jwt.sign(
    {
      userId: newUser._id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
    },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: '7days',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return {
    token,
  };
};

const loginUser = async (payload: TLoginUser, res: any) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email and Password are required!'
    );
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      message: 'User not found!',
    };
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role, name: user.name, email: user.email },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: '7days',
    }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
