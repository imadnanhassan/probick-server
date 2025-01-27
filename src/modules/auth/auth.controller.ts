import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
    },
  });
});


const registerUser = catchAsync(async (req, res) => {

  
    const result = await AuthServices.register(req.body);
  const { accessToken, refreshToken } = result;

  // Set the refresh token in a cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production', 
    httpOnly: true, 
    sameSite: 'none', 
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  // Send the success response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: {
      accessToken, // Send access token to the client
    },
  });
});



const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
    loginUser,
    registerUser,
  refreshToken,
};
