import { Schema, model, Types } from 'mongoose';;
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
    {
    userId: {
      type: Schema.Types.ObjectId,  
      ref: 'User',          
      required: true,      
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          required: true,
        },
        quantity: {
          type: String,      
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const OrderModel = model<IOrder>('Order', orderSchema);
