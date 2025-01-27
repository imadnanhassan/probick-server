import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = model<Order>('Order', OrderSchema);
