import mongoose, { Schema, Document } from 'mongoose';
import { Order } from './order.interface';

const OrderSchema = new Schema<Order & Document>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    paymentMethod: { type: String, enum: ['COD', 'SSL'], required: true },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order & Document>(
  'Order',
  OrderSchema
);
