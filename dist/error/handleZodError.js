"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const handleZodError = (err) => {
    const errors = err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
    }));
    return new AppError_1.default(400, 'Validation failed', errors);
};
exports.default = handleZodError;
