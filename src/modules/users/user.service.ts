import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';



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
  // createCustomerIntoDB,

//   getMe,
//   changeStatus,
};