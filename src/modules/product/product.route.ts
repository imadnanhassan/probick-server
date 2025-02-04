import express from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
ProductController.getAllProducts;
router.post('/add', upload.single('image'),auth(USER_ROLE.admin),  ProductController.addProduct);
router.get('/:productId', ProductController.getSingleProductById);
router.patch(
  '/:productId',
  upload.single('image'),
  ProductController.updateProduct
);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
