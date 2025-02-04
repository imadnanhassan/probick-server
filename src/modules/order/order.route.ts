import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { createOrderSchema, updateOrderStatusSchema } from './order.validation';

const router = express.Router();

router.post(
  '/add',
  auth('admin', 'user'),
//   validateRequest(createOrderSchema),
  OrderController.createOrder
);

router.put(
  '/:orderId',
  auth('admin'),
  validateRequest(updateOrderStatusSchema),
  OrderController.updateOrder
);

router.get('/', auth('admin'), OrderController.getOrders);
router.get('/:orderId', auth('user', 'admin'), OrderController.getOrderById);
router.get('/revenue', OrderController.getTotalRevenue);

export const OrderRoutes = router;
