import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, CreditCard, Truck, Package, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotals, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const totals = getTotals();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [shippingData, setShippingData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    phone: user?.phone || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (items.length === 0) {
    return (
      <div className="min-h-[60dvh] bg-brand-gray bg-texture flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h1 className="font-sans text-2xl text-zinc-800 mb-3">Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOrderNumber(`SUB-${Math.floor(Math.random() * 900000) + 100000}`);
      setIsProcessing(false);
      setCurrentStep(3);
      clearCart();
    }, 2500);
  };

  return (
    <div className="bg-white min-h-[80dvh]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {currentStep < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.slice(0, 3).map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                    i <= currentStep ? 'bg-brand-purple text-white' : 'bg-zinc-200 text-zinc-500'
                  }`}>
                    {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`ml-2 text-sm font-mono hidden sm:inline ${i <= currentStep ? 'text-zinc-800' : 'text-zinc-400'}`}>
                    {step}
                  </span>
                  {i < 2 && (
                    <div className={`w-12 md:w-24 h-1 mx-2 md:mx-4 rounded-full ${
                      i < currentStep ? 'bg-brand-lime' : 'bg-zinc-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-sans text-xl md:text-2xl text-zinc-800 mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-zinc-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-mono text-zinc-600 mb-1.5">Address</label>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    placeholder="Street address"
                    className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">City</label>
                    <input
                      type="text"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">State</label>
                    <input
                      type="text"
                      value={shippingData.state}
                      onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">ZIP</label>
                    <input
                      type="text"
                      value={shippingData.zip}
                      onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-mono text-zinc-600 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full mt-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
              >
                Continue to Payment
              </button>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-1 text-sm font-mono text-zinc-500 hover:text-zinc-800 mb-4"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Shipping
              </button>
              <h2 className="font-sans text-xl md:text-2xl text-zinc-800 mb-6">Payment Method</h2>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'paypal', label: 'PayPal', icon: <span className="font-sans text-sm font-bold text-blue-600">Pay</span> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-3 p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === method.id ? 'border-brand-purple bg-brand-purple/5' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    {method.icon}
                    <span className="font-mono text-sm">{method.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-mono text-zinc-600 mb-1.5">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono text-zinc-600 mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-zinc-600 mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-mono text-green-700">Secure 256-bit SSL encrypted payment</span>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full mt-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
              >
                Review Order
              </button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 text-sm font-mono text-zinc-500 hover:text-zinc-800 mb-4"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Payment
              </button>
              <h2 className="font-sans text-xl md:text-2xl text-zinc-800 mb-6">Review Your Order</h2>

              <div className="bg-zinc-50 rounded-xl p-4 mb-6 space-y-3">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm truncate">{item.name}</p>
                      <p className="text-xs font-mono text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-brand-purple" />
                  <span className="font-sans text-sm">Shipping to:</span>
                </div>
                <p className="text-sm font-mono text-zinc-600">
                  {shippingData.firstName} {shippingData.lastName}<br />
                  {shippingData.address}<br />
                  {shippingData.city}, {shippingData.state} {shippingData.zip}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-4 space-y-2 font-mono text-sm">
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
                <div className="flex justify-between font-sans text-lg text-zinc-800 pt-2">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-6 py-3 bg-brand-orange text-white rounded-xl font-mono text-sm hover:bg-brand-orange/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-sans text-2xl md:text-3xl text-zinc-800">Order Confirmed!</h2>
              <p className="mt-2 text-zinc-500 font-mono text-sm">
                Thank you for your purchase. A confirmation email has been sent.
              </p>
              <div className="mt-4 inline-block bg-brand-lime px-4 py-2 rounded-lg">
                <span className="font-mono text-sm font-medium">Order #{orderNumber}</span>
              </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/dashboard/orders')}
                  className="w-full py-3 border-2 border-zinc-800 text-zinc-800 rounded-xl font-mono text-sm hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  View Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
