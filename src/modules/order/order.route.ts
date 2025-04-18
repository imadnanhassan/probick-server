import express from 'express';
const router = express.Router();

router.post('/add');
router.get('/');
router.get('/:id');
router.patch('/:id/status');
router.delete('/:id');

export const OrderRoutes = router;
