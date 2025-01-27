import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createCustomerIntoDB = async (
  file: any,
  password: string,
  payload: TUser
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //set user role
  userData.role = 'user';
  // set user email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (file) {
      const imageName = `${userData.id}${payload?.name}`;
      const path = file?.path;

      //   //send image to cloudinary
      //   const { secure_url } = await sendImageToCloudinary(imageName, path);
      //   payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // create a student (transaction-2)
    const newCustomer = await User.create([payload], { session });

    if (!newCustomer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// const getMe = async (userId: string, role: string) => {
//   let result = null;
//   if (role === 'student') {
//     result = await Student.findOne({ id: userId }).populate('user');
//   }
//   if (role === 'admin') {
//     result = await Admin.findOne({ id: userId }).populate('user');
//   }

//   if (role === 'faculty') {
//     result = await Faculty.findOne({ id: userId }).populate('user');
//   }

//   return result;
// };

export const UserServices = {
  createCustomerIntoDB,

//   getMe,
//   changeStatus,
};