import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required.' }),
    role: z.string().optional().default('customer'),
  }),
});

const refreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  refreshTokenValidationSchema,
};
