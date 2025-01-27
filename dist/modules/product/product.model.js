"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
var BicycleType;
(function (BicycleType) {
    BicycleType["Mountain"] = "Mountain";
    BicycleType["Road"] = "Road";
    BicycleType["Hybrid"] = "Hybrid";
    BicycleType["BMX"] = "BMX";
    BicycleType["Electric"] = "Electric";
})(BicycleType || (BicycleType = {}));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    type: {
        type: String,
        enum: Object.values(BicycleType),
        required: [true, 'Bicycle type is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a positive number'],
    },
    inStock: { type: Boolean, default: true, },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
