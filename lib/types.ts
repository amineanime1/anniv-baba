export interface Product {
  id: number;
  name: string;
  description: string | null; // Allow description to be null
  price: number;
  stock: number;
  category: string;
  images: string[];
  created_at: string;
  updated_at: string;
}
export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}