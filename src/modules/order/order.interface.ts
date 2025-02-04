import { Product } from "../product/product.interface";
import { TUser } from "../users/user.interface";

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id?: string;
  user: TUser;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: 'COD' | 'SSL';
  createdAt?: Date;
  updatedAt?: Date;
}
