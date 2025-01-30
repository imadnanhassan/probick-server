import { OrderModel } from './order.model';
import { ProductModel } from '../product/product.model';
import { IOrder } from './order.interface';
import AppError from '../../error/AppError';

const createOrderinDB = async (data: any): Promise<IOrder> => {
  const { userId, products, totalPrice } = data;

  // Check if the products exist and have enough stock
  const productIds = products.map((prod: any) => prod.productId);
  const foundProducts = await ProductModel.find({ _id: { $in: productIds } });

  if (foundProducts.length !== products.length) {
    throw new AppError(400, 'Some products are invalid or out of stock');
  }

  // Check stock levels
  for (let prod of products) {
    const product = foundProducts.find(
      (p) => p._id.toString() === prod.productId
    );
    if (product && !product.inStock) {
      throw new AppError(400, `Not enough stock for ${product.name}`);
    }
  }

  // Create order
  const order = new OrderModel({
    user: userId,
    products: products.map((prod: any) => prod.productId),
    totalPrice,
    status: 'pending',
  });

  await order.save();
  return order;
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
  createOrderinDB,
  updateOrder,
  getAllOrders,
  getOrderById,
  calculateRevenue,
};
