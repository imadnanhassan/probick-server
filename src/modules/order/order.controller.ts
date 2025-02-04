import { Request, Response } from 'express';
import { apiResponse } from '../../utils/apiResponse';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const order = await OrderService.createOrderInDB(req.body);
  console.log(order);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: { order },
  });
});

const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.updateOrder(
      req.params.orderId,
      req.body.status
    );
    res.status(200).json({ order });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrderById(req.params.orderId);
    res.status(200).json({ order });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

const getTotalRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenueData = await OrderService.calculateRevenue();
    res
      .status(200)
      .json(
        apiResponse.success(revenueData, 'Revenue calculated successfully')
      );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error calculating revenue';
    res
      .status(500)
      .json(apiResponse.error(errorMessage, 'Revenue calculation failed'));
  }
};

export const OrderController = {
  createOrder,
  updateOrder,
  getOrders,
  getOrderById,
  getTotalRevenue,
};
