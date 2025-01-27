import { z } from 'zod';

// Enum for Bicycle Types
export enum BicycleType {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

// Zod validation schema for Product
export const ProductSchema = z.object({
  
    name: z
      .string()
      .min(10, 'Name must be at least 10 characters long')
      .max(100, 'Name must not be longer than 100 characters')
      .trim(),
    brand: z
      .string()
      .min(5, 'Brand name must be at least 5 characters long')
      .max(50, 'Brand name must not be longer than 50 characters')
      .trim(),
    price: z
      .string()
      
      .min(1, 'Price must be at least 1')
      .max(10000, 'Price must be less than 10000'),
    model: z
    .string(),
    
      
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .max(500, 'Description must not be longer than 500 characters')
      .trim(),
    quantity: z
      .string()
      .min(0, 'Quantity must be at least 0'),
    inStock: z.boolean().optional().default(true),
    imageUrl: z.string().url().optional(),
  
});