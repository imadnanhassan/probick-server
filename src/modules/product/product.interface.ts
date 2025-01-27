export enum BicycleType {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

export interface Product {
  name: string;
  brand: string;
  price: string;
  type: BicycleType;
  description: string;
  quantity: string;
  inStock: boolean;
  imageUrl?: string | null;
}
