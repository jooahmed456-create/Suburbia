export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  model3d?: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specifications: Record<string, string>;
  stock: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: { name: string; hex: string };
  size?: string;
  material?: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'guest' | 'customer' | 'employee' | 'admin' | 'affiliate';
  avatar?: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  affiliateCode?: string;
  affiliateEarnings?: number;
  employeeId?: string;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  variantName?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  count: number;
}
