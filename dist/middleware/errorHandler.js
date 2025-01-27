"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../utils/constants");
const errorHandler = (err, _req, res, _next) => {
    const error = err;
    const statusCode = error.statusCode || constants_1.constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'An unexpected error occurred';
    res.status(statusCode).json({
        status: 'error',
        message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
