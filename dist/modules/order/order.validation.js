"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty('User ID is required'),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().nonempty('Product ID is required'),
        quantity: zod_1.z.string().regex(/^\d+$/, 'Quantity must be a valid number'), // Quantity should be a string representing a number
    })),
    totalPrice: zod_1.z.number().min(0, 'Total price must be greater than 0'),
});
exports.updateOrderStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'shipped', 'delivered']),
});
