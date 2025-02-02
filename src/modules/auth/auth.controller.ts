import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import AppError from '../../error/AppError';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body, res);
  if (!result || !result.token) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'User registration failed!'
    );
  }
  const { token } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: {
      token,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body, res);


  if (!result) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }
  const { token } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      token: token,
    },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
