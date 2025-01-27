"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const constants_1 = require("../utils/constants");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(constants_1.constants.HTTP_STATUS.BAD_REQUEST).json({
                status: 'error',
                message: constants_1.constants.MESSAGES.VALIDATION_ERROR,
                error: error.errors,
            });
        }
        else {
            // Fallback for unexpected errors
            res.status(constants_1.constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: constants_1.constants.MESSAGES.VALIDATION_ERROR,
            });
        }
    }
};
exports.validate = validate;
