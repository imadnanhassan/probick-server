import express from 'express';

const router = express.Router();

router.post('/login');

router.post('/register');

export const AuthRoutes = router;
