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
exports.OrderController = void 0;
const apiResponse_1 = require("../../utils/apiResponse");
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = order_validation_1.OrderSchema.parse(req.body);
        const order = yield order_service_1.OrderService.createOrder(orderData);
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(order, 'Order created successfully'));
    }
    catch (error) {
        res.status(400).json(apiResponse_1.apiResponse.error(error, 'Invalid order data'));
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
    getTotalRevenue,
};
