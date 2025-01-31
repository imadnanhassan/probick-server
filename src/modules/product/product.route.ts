import express from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/add', upload.single('image'), ProductController.addProduct);
router.get('/:productId', ProductController.getSingleProductById);
router.patch(
  '/:productId',
  upload.single('image'),
  ProductController.updateProduct
);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
