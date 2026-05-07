import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShippingReturns() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    setTrackingResult(`Order ${trackingNumber} is currently in transit. Estimated delivery: 2-3 business days.`);
    toast.success('Tracking updated!');
  };

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl text-zinc-800">Shipping & Returns</h1>
          <p className="mt-4 text-lg font-mono text-zinc-600">
            Everything you need to know about delivery and returns
          </p>
        </motion.div>

        <div className="bg-brand-purple rounded-2xl p-6 md:p-8 mb-12 md:mb-16">
          <h2 className="font-sans text-xl text-white mb-4">Track Your Order</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter order number (e.g., SUB-123456)"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-mono text-sm placeholder:text-white/50 focus:outline-none focus:border-brand-lime"
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button
              onClick={handleTrack}
              className="px-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Track
            </button>
          </div>
          {trackingResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/10 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
                <p className="text-sm font-mono text-white">{trackingResult}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="font-sans text-2xl text-zinc-800 mb-6">Shipping Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Standard',
                price: 'Free over $100',
                time: '3-5 business days',
                icon: <Truck className="w-6 h-6" />,
                features: ['Tracking included', 'Insured up to $500', 'Delivered to your door'],
              },
              {
                name: 'Express',
                price: '$25',
                time: '1-2 business days',
                icon: <Clock className="w-6 h-6" />,
                features: ['Priority processing', 'Real-time tracking', 'Insured up to $1000'],
              },
              {
                name: 'Overnight',
                price: '$45',
                time: 'Next business day',
                icon: <Package className="w-6 h-6" />,
                features: ['Guaranteed delivery', 'Signature required', 'Insured up to $2000'],
              },
            ].map((method) => (
              <div key={method.name} className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple mb-4">
                  {method.icon}
                </div>
                <h3 className="font-sans text-lg text-zinc-800">{method.name}</h3>
                <p className="font-mono text-sm text-brand-purple mt-1">{method.price}</p>
                <p className="font-mono text-sm text-zinc-500 mt-1">{method.time}</p>
                <ul className="mt-4 space-y-2">
                  {method.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm font-mono text-zinc-600">
                      <CheckCircle className="w-4 h-4 text-brand-lime" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="font-sans text-2xl text-zinc-800 mb-6">Returns Policy</h2>
          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-sans text-lg text-zinc-800 mb-3">Our Promise</h3>
                <p className="text-sm font-mono text-zinc-600 leading-relaxed">
                  We offer a hassle-free 30-day return policy. If you are not completely satisfied 
                  with your purchase, you can return it for a full refund or exchange.
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { text: '30-day return window' },
                    { text: 'Full refund to original payment' },
                    { text: 'Free return shipping on defective items' },
                    { text: 'Easy online return process' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-mono text-zinc-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-sans text-lg text-zinc-800 mb-3">Return Process</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Request Return', desc: 'Log into your account and select the order' },
                    { step: '2', title: 'Print Label', desc: 'We will email you a prepaid shipping label' },
                    { step: '3', title: 'Ship Item', desc: 'Drop off at any authorized carrier location' },
                    { step: '4', title: 'Get Refunded', desc: 'Refund processed within 3-5 business days' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-brand-lime rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-xs font-bold">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-sans text-sm text-zinc-800">{item.title}</p>
                        <p className="text-xs font-mono text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm text-zinc-800">Important Notes</p>
                  <p className="text-sm font-mono text-zinc-600 mt-1">
                    Custom or personalized items cannot be returned unless defective. Swimwear and 
                    undergarments must have hygiene seals intact. Items must be unused with all original 
                    tags and packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
