"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../error/AppError"));
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../error/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err);
    let processedError = new AppError_1.default(500, 'An unexpected error occurred');
    if (err instanceof AppError_1.default) {
        processedError = err;
    }
    else if (err instanceof mongoose_1.Error.CastError) {
        processedError = (0, handleCastError_1.default)(err);
    }
    else if (err instanceof mongodb_1.MongoServerError && err.code === 11000) {
        processedError = (0, handleDuplicateError_1.default)(err);
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        processedError = (0, handleValidationError_1.default)(err);
    }
    else if (err instanceof zod_1.ZodError) {
        processedError = (0, handleZodError_1.default)(err);
    }
    else if (err instanceof Error) {
        processedError = new AppError_1.default(500, err.message);
    }
    res.status(processedError.statusCode).json({
        success: false,
        statusCode: processedError.statusCode,
        message: processedError.message,
        errors: processedError.errors || [],
        stack: process.env.NODE_ENV === 'development' ? processedError.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
