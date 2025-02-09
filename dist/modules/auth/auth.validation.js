"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email('Invalid email address')
            .min(1, 'Email is required'),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required.' }),
        role: zod_1.z.string().optional().default('customer'),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    refreshToken: zod_1.z.string({
        required_error: 'Refresh token is required!',
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
    refreshTokenValidationSchema,
};
