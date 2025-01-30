import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/revenue', OrderController.getTotalRevenue);




// router.post('/', auth('user', 'admin'), validateRequest(createOrder), createOrder); // Create order
// router.put('/:orderId', auth('admin'), validateRequest(updateOrderStatusSchema), updateOrder); // Update order status
// router.get('/', auth('admin'), getOrders); // Get all orders
// router.get('/:orderId', auth('user', 'admin'), getOrderById); // Get order by ID

export const OrderRoutes = router;
