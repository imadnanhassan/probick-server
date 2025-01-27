import { z } from 'zod';

export const OrderSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().nonempty({ message: 'Product ID is required' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .int({ message: 'Quantity must be an integer' }),
  totalPrice: z.number().positive({ message: 'Total price must be positive' }),
});
