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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../error/AppError"));
const config_1 = require("../config");
const user_model_1 = require("../modules/users/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized: No token provided.');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_ACCESS_SECRET);
        const user = yield user_model_1.UserModel.findById(decoded.userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'User does not exist.');
        }
        if (requiredRoles.length > 0 &&
            !requiredRoles.includes(user.role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden: You do not have permission.');
        }
        req.user = {
            id: user._id,
            role: user.role,
            email: user.email,
        };
        next();
    }));
};
exports.default = auth;
