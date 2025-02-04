import mongoose, { Types } from 'mongoose';

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  quantity: string;
}

export interface IOrder {
  userId: Types.ObjectId;
  products?: IOrderProduct[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
