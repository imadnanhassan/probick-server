import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser
);



export const AuthRoutes = router;
