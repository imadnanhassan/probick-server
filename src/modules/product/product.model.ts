import { model, Schema } from 'mongoose';
import { Product } from './product.interface';
import { string } from 'zod';

enum BicycleType {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    price: {
      type: String,
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
      type: String,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: { type: Boolean, default: true },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export const ProductModel = model<Product>('Product', productSchema);
