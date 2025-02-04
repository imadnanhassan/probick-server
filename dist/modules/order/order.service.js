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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.updateOrder = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../users/user.model");
const createOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(orderData.userId);
    if (!user) {
        throw new Error('User not found');
    }
    let totalPrice = 0;
    if (!orderData.products) {
        throw new Error('No products found in order data');
    }
    for (const item of orderData.products) {
        const product = yield product_model_1.ProductModel.findById(item.productId);
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        const quantity = parseInt(item.quantity, 10);
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error(`Invalid quantity for product ${item.productId}`);
        }
        totalPrice += Number(product.price) * quantity;
        const newOrder = new order_model_1.OrderModel({
            userId: orderData.userId,
            customerName: user.name,
            customerEmail: user.email,
            products: orderData.products,
            totalPrice,
            status: 'pending',
        });
        return yield newOrder.save();
    }
});
const updateOrder = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
        throw new AppError_1.default(404, 'Order not found');
    }
    return order;
});
exports.updateOrder = updateOrder;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find().populate('user').populate('products');
    return orders;
});
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(orderId)
        .populate('user')
        .populate('products');
    if (!order) {
        throw new AppError_1.default(404, 'Order not found');
    }
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
exports.OrderService = {
    createOrderInDB,
    updateOrder: exports.updateOrder,
    getAllOrders,
    getOrderById,
    calculateRevenue,
};
