import express from 'express';
import { OrderController } from './order.controller';
const router = express.Router();

router.post('/add', OrderController.createOrder); // Place an order
router.get('/', OrderController.getAllOrders); // Get all orders (Admin)
router.get('/:userId', OrderController.getOrdersByUser); // Get user orders
router.patch('/:orderId/status', OrderController.updateOrderStatus); // Update order status
router.delete('/:orderId', OrderController.deleteOrder);

export const OrderRoutes = router;
