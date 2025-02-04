"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message, errors = [], isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
