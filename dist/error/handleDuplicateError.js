"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const handleDuplicateError = (err) => {
    const key = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: ${err.keyValue[key]}. Please use another value!`;
    return new AppError_1.default(400, message, [{ field: key, message: `Duplicate value for field: ${key}` }]);
};
exports.default = handleDuplicateError;
