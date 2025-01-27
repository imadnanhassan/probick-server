"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product: productId, quantity } = orderData;
    const product = yield product_model_1.ProductModel.findById(productId);
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
    yield product.save();
    const order = yield order_model_1.OrderModel.create(orderData);
    return order;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueData = yield order_model_1.OrderModel.aggregate([
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
});
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
exports.OrderService = {
    createOrder,
    calculateRevenue,
};
