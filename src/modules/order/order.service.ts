import { OrderModel } from './order.model';
import { ProductModel } from '../product/product.model';
import { IOrder } from './order.interface';
import AppError from '../../error/AppError';
import { UserModel } from '../users/user.model';

const createOrderInDB = async (orderData: IOrder) => {
  const user = await UserModel.findById(orderData.userId);
  if (!user) {
    throw new Error('User not found');
  }
  let totalPrice: number = 0;
  if (!orderData.products) {
    throw new Error('No products found in order data');
  }
  for (const item of orderData.products) {
    const product = await ProductModel.findById(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }

    const quantity = parseInt(item.quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error(`Invalid quantity for product ${item.productId}`);
    }

    totalPrice += Number(product.price) * quantity;

    const newOrder = new OrderModel({
      userId: orderData.userId,
      customerName: user.name,
      customerEmail: user.email,
      products: orderData.products,
      totalPrice,
      status: 'pending',
    });

    return await newOrder.save();
  }
};

export const updateOrder = async (orderId: string, status: string) => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  if (!order) {
    throw new AppError(404, 'Order not found');
  }
  return order;
};

const getAllOrders = async () => {
  const orders = await OrderModel.find().populate('user').populate('products');
  return orders;
};

const getOrderById = async (orderId: string) => {
  const order = await OrderModel.findById(orderId)
    .populate('user')
    .populate('products');
  if (!order) {
    throw new AppError(404, 'Order not found');
  }
  return order;
};

const calculateRevenue = async () => {
  const revenueData = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        totalPrice: { $multiply: ['$productDetails.price', '$quantity'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return revenueData.length > 0 ? revenueData[0] : { totalRevenue: 0 };
};

export const OrderService = {
  createOrderInDB,
  updateOrder,
  getAllOrders,
  getOrderById,
  calculateRevenue,
};
