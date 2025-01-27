"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCustomerIntoDB = (file, password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //set user role
    userData.role = 'user';
    // set user email
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (file) {
            const imageName = `${userData.id}${payload === null || payload === void 0 ? void 0 : payload.name}`;
            const path = file === null || file === void 0 ? void 0 : file.path;
            //   //send image to cloudinary
            //   const { secure_url } = await sendImageToCloudinary(imageName, path);
            //   payload.profileImg = secure_url as string;
        }
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a user
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // create a student (transaction-2)
        const newCustomer = yield user_model_1.User.create([payload], { session });
        if (!newCustomer.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newCustomer;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
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
exports.UserServices = {
    createCustomerIntoDB,
    //   getMe,
    //   changeStatus,
};
