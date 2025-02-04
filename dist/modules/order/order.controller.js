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
exports.OrderController = void 0;
const apiResponse_1 = require("../../utils/apiResponse");
const order_service_1 = require("./order.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const order = yield order_service_1.OrderService.createOrderInDB(req.body);
    console.log(order);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Order created successfully',
        data: { order },
    });
}));
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.OrderService.updateOrder(req.params.orderId, req.body.status);
        res.status(200).json({ order });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrders();
        res.status(200).json({ orders });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_service_1.OrderService.getOrderById(req.params.orderId);
        res.status(200).json({ order });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenueData = yield order_service_1.OrderService.calculateRevenue();
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(revenueData, 'Revenue calculated successfully'));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error calculating revenue';
        res
            .status(500)
            .json(apiResponse_1.apiResponse.error(errorMessage, 'Revenue calculation failed'));
    }
});
exports.OrderController = {
    createOrder,
    updateOrder,
    getOrders,
    getOrderById,
    getTotalRevenue,
};
