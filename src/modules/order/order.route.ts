import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { createOrderSchema, updateOrderStatusSchema } from './order.validation';

const router = express.Router();


router.get('/revenue', OrderController.getTotalRevenue);

router.post(
  '/add',
  auth('user', 'admin'),
  validateRequest(createOrderSchema),
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

export const OrderRoutes = router;
