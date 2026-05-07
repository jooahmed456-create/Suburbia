import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotals, applyDiscount, discountCode } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [discountInput, setDiscountInput] = useState('');
  const totals = getTotals();

  const handleApplyDiscount = () => {
    if (!discountInput.trim()) return;
    const success = applyDiscount(discountInput.trim());
    if (success) {
      toast.success('Discount applied!');
      setDiscountInput('');
    } else {
      toast.error('Invalid discount code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60dvh] bg-brand-gray bg-texture flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-20 h-20 text-zinc-300 mx-auto mb-6" />
          <h1 className="font-sans text-2xl md:text-3xl text-zinc-800 mb-3">Your Cart is Empty</h1>
          <p className="text-zinc-500 font-mono text-sm mb-8 max-w-sm mx-auto">
            Looks like you have not added anything yet. Explore our collections and find your perfect gear.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-sans text-2xl md:text-3xl text-zinc-800 mb-8">Shopping Cart ({totals.count} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variantId}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 bg-white rounded-xl p-4"
              >
                <div className="w-24 h-24 bg-zinc-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-base text-zinc-800">{item.name}</h3>
                  {item.variantName && <p className="text-xs text-zinc-500 font-mono mt-0.5">{item.variantName}</p>}
                  <p className="font-mono text-sm text-zinc-700 mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center font-mono text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => { removeItem(item.productId, item.variantId); toast.success('Item removed'); }}
                      className="ml-auto p-2 text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-mono text-lg text-zinc-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => { clearCart(); toast.success('Cart cleared'); }}
                className="text-sm font-mono text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
              <Link
                to="/shop"
                className="text-sm font-mono text-brand-purple hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit lg:sticky lg:top-24">
            <h2 className="font-sans text-lg text-zinc-800 mb-5">Order Summary</h2>

            {/* Discount code */}
            <div className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="Discount code"
                  className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                />
              </div>
              <button
                onClick={handleApplyDiscount}
                className="px-4 py-2.5 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-mono hover:bg-zinc-200 transition-colors"
              >
                Apply
              </button>
            </div>
            {discountCode && (
              <p className="text-xs font-mono text-green-600 mb-3">Code "{discountCode}" applied!</p>
            )}

            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Tax</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-lg text-zinc-800 pt-3 border-t border-zinc-100">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast('Please sign in to checkout', { icon: '👋' });
                  navigate('/login');
                  return;
                }
                navigate('/checkout');
              }}
              className="w-full mt-5 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-4 mt-4">
              {[
                { icon: <Shield className="w-4 h-4" />, text: 'Secure' },
                { icon: <Truck className="w-4 h-4" />, text: 'Free over $100' },
                { icon: <RotateCcw className="w-4 h-4" />, text: '30-day returns' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
