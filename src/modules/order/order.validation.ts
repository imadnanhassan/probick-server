import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  products: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'), // assuming quantity is a string in your schema
    })
  ),
  totalPrice: z.number().min(0, 'Total price must be greater than 0'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'shipped', 'delivered']),
});
