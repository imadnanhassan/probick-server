"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => ({
        field: el.path,
        message: el.message,
    }));
    return new AppError_1.default(400, 'Validation error', errors);
};
exports.default = handleValidationError;
