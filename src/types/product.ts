export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  featured: boolean;
  visible: boolean;
  created_at: string;
  slug: string
}