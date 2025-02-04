import { model, Schema } from 'mongoose';
import { Product } from './product.interface';




const productSchema = new Schema<Product>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    price: {
      type: String,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    model: {
      type: String,
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
