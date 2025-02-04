import { OrderModel } from './order.model';
import { Order } from './order.interface';

// Create an order
 const createOrder = async (orderData: Order): Promise<Order> => {
  return await OrderModel.create(orderData);
};

// Get all orders (Admin)
 const getAllOrders = async (): Promise<Order[]> => {
  return await OrderModel.find().populate('user').populate('items.product');
};

// Get user-specific orders
const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  return await OrderModel.find({ user: userId }).populate('items.product');
};

// Update order status (Admin)
 const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<Order | null> => {
  return await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
};

// Delete order
 const deleteOrder = async (orderId: string): Promise<Order | null> => {
  return await OrderModel.findByIdAndDelete(orderId);
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
};