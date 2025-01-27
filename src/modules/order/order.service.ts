import { OrderModel } from './order.model';
import { ProductModel } from '../product/product.model';
import { Order } from './order.interface';

const createOrder = async (orderData: Order) => {
  const { product: productId, quantity } = orderData;

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (Number(product.quantity) < quantity) {
    throw new Error('Insufficient stock available');
  }

  product.quantity = (Number(product.quantity) - quantity).toString();
  if (Number(product.quantity) === 0) {
    product.inStock = false;
  }
  await product.save();

  const order = await OrderModel.create(orderData);
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

// const calculateRevenue = async () => {
//   const revenueData = await OrderModel.aggregate([
//     {
//       $project: {
//         totalPrice: { $multiply: ['$price', '$quantity'] },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: '$totalPrice' },
//       },
//     },
//   ]);

//   return revenueData.length > 0 ? revenueData[0] : { totalRevenue: 0 };
// };

export const OrderService = {
  createOrder,
  calculateRevenue,
};
