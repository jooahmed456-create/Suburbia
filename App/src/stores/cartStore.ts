import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  discountCode: string;
  discountAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  applyDiscount: (code: string) => boolean;
  getTotals: () => { subtotal: number; count: number; shipping: number; tax: number; discount: number; total: number };
}

const DISCOUNT_CODES: Record<string, number> = {
  'SAVE10': 0.10,
  'WELCOME20': 0.20,
  'SUMMER15': 0.15,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: '',
      discountAmount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], discountCode: '', discountAmount: 0 });
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),

      applyDiscount: (code) => {
        const discount = DISCOUNT_CODES[code.toUpperCase()];
        if (!discount) return false;
        set({ discountCode: code.toUpperCase(), discountAmount: discount });
        return true;
      },

      getTotals: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
        const shipping = subtotal > 100 ? 0 : 15;
        const discount = subtotal * state.discountAmount;
        const tax = (subtotal - discount) * 0.08;
        const total = subtotal - discount + shipping + tax;
        return { subtotal, count, shipping, tax, discount, total };
      },
    }),
    {
      name: 'suburbia-cart',
      partialize: (state) => ({ items: state.items, discountCode: state.discountCode, discountAmount: state.discountAmount }),
    }
  )
);
