"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const handleCastError = (err) => {
    return new AppError_1.default(400, `Invalid ${err.path}: ${err.value}.`, [
        { field: err.path, message: `Invalid value for field ${err.path}` },
    ]);
};
exports.default = handleCastError;
