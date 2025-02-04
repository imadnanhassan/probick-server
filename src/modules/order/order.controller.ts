import { Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../utils/sendResponse';


export const OrderController = {
  // Create Order
  createOrder: async (req: Request, res: Response) => {
    try {
      const order = await OrderService.createOrder(req.body);
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Error creating order',
        data: error,
      });
    }
  },

  // Get all orders (Admin)
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await OrderService.getAllOrders();
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Error fetching orders',
        data: error,
      });
    }
  },

  // Get user orders
  getOrdersByUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const orders = await OrderService.getOrdersByUser(userId);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Error fetching user orders',
        data: error,
      });
    }
  },

  // Update Order Status (Admin)
  updateOrderStatus: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const updatedOrder = await OrderService.updateOrderStatus(orderId, status);

      if (!updatedOrder) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'Order not found',
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order status updated successfully',
        data: updatedOrder,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Error updating order status',
        data: error,
      });
    }
  },

  // Delete Order
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await OrderService.deleteOrder(orderId);

      if (!deletedOrder) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'Order not found',
          data: null,
        });
      }

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order deleted successfully',
        data: deletedOrder,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Error deleting order',
        data: error,
      });
    }
  },
};
