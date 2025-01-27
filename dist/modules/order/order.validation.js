"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    product: zod_1.z.string().nonempty({ message: 'Product ID is required' }),
    quantity: zod_1.z
        .number()
        .min(1, { message: 'Quantity must be at least 1' })
        .int({ message: 'Quantity must be an integer' }),
    totalPrice: zod_1.z.number().positive({ message: 'Total price must be positive' }),
});
