"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
exports.apiResponse = {
    success: (data, message = 'Success') => ({
        message,
        success: true,
        data,
    }),
    error: (error, message = 'Error occurred') => {
        if (error instanceof Error && error.name === 'ValidationError') {
            return {
                message: 'Validation failed',
                success: false,
                error: error,
            };
        }
        return {
            message,
            success: false,
            error,
        };
    },
};
