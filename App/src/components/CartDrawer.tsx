import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotals } = useCartStore();
  const navigate = useNavigate();
  const totals = getTotals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-70 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-80 w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-100">
              <h2 className="font-sans text-xl text-zinc-800">Shopping Cart ({totals.count})</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-zinc-300 mb-4" />
                  <p className="font-sans text-lg text-zinc-500 mb-2">Your cart is empty</p>
                  <button
                    onClick={() => { setIsOpen(false); navigate('/shop'); }}
                    className="mt-4 px-6 py-3 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.variantId}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 bg-zinc-50 rounded-xl p-3"
                    >
                      <div className="w-20 h-20 bg-zinc-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm text-zinc-800 truncate">{item.name}</p>
                        {item.variantName && (
                          <p className="text-xs text-zinc-500 font-mono mt-0.5">{item.variantName}</p>
                        )}
                        <p className="font-mono text-sm text-zinc-700 mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="ml-auto p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-zinc-100 p-4 md:p-6 space-y-4">
                <div className="space-y-2 font-mono text-sm">
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
                  <div className="flex justify-between font-sans text-base text-zinc-800 pt-2 border-t border-zinc-100">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setIsOpen(false); navigate('/checkout'); }}
                  className="w-full py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
                >
                  Checkout
                </button>
                <button
                  onClick={() => { setIsOpen(false); navigate('/cart'); }}
                  className="w-full py-2 text-sm font-mono text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  View Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
