import { Types } from "mongoose";
import { Product } from "../product/product.interface";

export interface IOrder {
  user: Types.ObjectId;
  products: Product[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
