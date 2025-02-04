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
exports.AuthServices = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../users/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../error/AppError"));
const registerUser = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payload;
    console.log('payload', payload);
    if (!name || !email || !password) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: false,
            message: 'Please provide all the required fields!',
            data: {},
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new user_model_1.UserModel({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
    });
    console.log(newUser);
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({
        userId: newUser._id,
        role: newUser.role,
        name: newUser.name,
        email: newUser.email,
    }, config_1.config.JWT_ACCESS_SECRET, {
        expiresIn: '7days',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: config_1.config.NODE_ENV === 'production',
        sameSite: config_1.config.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
        token,
    };
});
const loginUser = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email and Password are required!');
    }
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        return {
            message: 'User not found!',
        };
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role, name: user.name, email: user.email }, config_1.config.JWT_ACCESS_SECRET, {
        expiresIn: '7days',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: config_1.config.NODE_ENV === 'production',
        sameSite: config_1.config.NODE_ENV === 'production' ? 'none' : 'strict',
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
});
exports.AuthServices = {
    registerUser,
    loginUser,
};
