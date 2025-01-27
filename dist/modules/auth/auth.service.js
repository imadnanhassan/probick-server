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
const config_1 = require("../../config");
const user_model_1 = require("../users/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const AppError_1 = __importDefault(require("../../error/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistByCustomId(payload.email);
    console.log(user);
    console.log(payload.password, 'Payload Password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    //checking if the password is correct
    // if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    // }
    //create token and sent to the  client
    const jwtPayload = {
        userId: user.id || '',
        role: user.role || 'customer',
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.config.JWT_ACCESS_SECRET, parseInt(config_1.config.jwt_access_expires_in));
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.config.JWT_REFRESH_SECRE, parseInt(config_1.config.jwt_refresh_expires_in));
    return {
        accessToken,
        refreshToken,
    };
});
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = payload;
    console.log(payload);
    // Check if user already exists by email
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists.');
    }
    // Hash the password
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.config.bcrypt_salt_rounds));
    // Create a new user with customer role
    const newUser = new user_model_1.User({
        email,
        password: hashedPassword,
        role: role || 'customer',
    });
    // Save the new user
    yield newUser.save();
    // JWT payload
    const jwtPayload = {
        userId: newUser.id || '',
        role: newUser.role || 'customer',
    };
    // Generate the access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.config.JWT_ACCESS_SECRET, parseInt(config_1.config.jwt_access_expires_in));
    // Generate the refresh token
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.config.JWT_REFRESH_SECRE, parseInt(config_1.config.jwt_refresh_expires_in));
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
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.config.JWT_REFRESH_SECRE);
    const { userId, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const jwtPayload = {
        userId: user.id || '',
        role: user.role || 'customer',
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.config.JWT_ACCESS_SECRET, parseInt(config_1.config.jwt_access_expires_in));
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    register,
    refreshToken,
};
