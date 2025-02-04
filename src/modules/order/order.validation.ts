import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  products: z.array(
    z.object({
      productId: z.string().nonempty('Product ID is required'),
      quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid number'), // Quantity should be a string representing a number
    })
  ),
  totalPrice: z.number().min(0, 'Total price must be greater than 0'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'shipped', 'delivered']),
});
