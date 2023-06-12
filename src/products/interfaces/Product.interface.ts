export interface ProductApp {
  brand: string;
  model: string;
  price: number;
  discount?: number;
  images: string[];
  title: string;
  category: string;
  description: string;
  currentStock: number;
  freeShipping: boolean;
  color: string;
  type: 'new' | 'used';
  outstanding?: boolean;
}
