import { Request, Response } from 'express';
import { apiResponse } from '../../utils/apiResponse';
import { OrderService } from './order.service';
import { OrderSchema } from './order.validation';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = OrderSchema.parse(req.body);
    const order = await OrderService.createOrder(orderData);
    res
      .status(200)
      .json(apiResponse.success(order, 'Order created successfully'));
  } catch (error) {
    res.status(400).json(apiResponse.error(error, 'Invalid order data'));
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
  getTotalRevenue,
};
