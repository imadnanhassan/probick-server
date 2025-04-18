import express from 'express';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get('/');
router.post('/add', upload.single('image'));
router.get('/:id');
router.patch('/:id', upload.single('image'));
router.delete('/:id');

export const ProductRoutes = router;
