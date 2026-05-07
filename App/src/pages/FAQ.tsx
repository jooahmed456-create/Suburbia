import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Package, CreditCard, Truck, RotateCcw, Search } from 'lucide-react';

const faqCategories = [
  {
    id: 'orders',
    label: 'Orders',
    icon: <Package className="w-5 h-5" />,
    questions: [
      { q: 'How do I track my order?', a: 'Once your order ships, you will receive an email with a tracking number. You can also track your order in your account dashboard under "Orders".' },
      { q: 'Can I modify or cancel my order?', a: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters our fulfillment process and cannot be changed.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.' },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping',
    icon: <Truck className="w-5 h-5" />,
    questions: [
      { q: 'How much does shipping cost?', a: 'Standard shipping is $15 for orders under $100. Orders over $100 qualify for free standard shipping. Express shipping is available for $25.' },
      { q: 'How long will my order take to arrive?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International orders may take 7-14 business days.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.' },
    ],
  },
  {
    id: 'returns',
    label: 'Returns',
    icon: <RotateCcw className="w-5 h-5" />,
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy. Items must be unused, in original packaging, with all tags attached. Custom or personalized items cannot be returned.' },
      { q: 'How do I start a return?', a: 'Log into your account, go to "Orders," select the order you want to return, and click "Request Return." We will send you a prepaid shipping label.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 3-5 business days after we receive your returned item. It may take an additional 2-5 business days for the refund to appear in your account.' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      { q: 'Are your products authentic?', a: 'Absolutely. We are an authorized retailer for all brands we carry. Every product comes with the manufacturer\'s warranty and authenticity guarantee.' },
      { q: 'How do I find the right size?', a: 'Each product page includes a detailed size guide. For shoes, we recommend measuring your foot length and comparing it to our size chart. For clothing, check the measurements provided.' },
      { q: 'Do you offer warranty on products?', a: 'All products come with the manufacturer\'s standard warranty, typically 1 year. Some premium items include extended 2-year coverage. Contact us for warranty claims.' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      { q: 'How do I create an account?', a: 'Click "Sign Up" in the top navigation. Fill in your details, verify your email, and you are ready to shop.' },
      { q: 'I forgot my password. What should I do?', a: 'Click "Forgot Password" on the login page, enter your email, and we will send you a password reset link.' },
      { q: 'How do I become an affiliate?', a: 'Contact us at affiliate@suburbia.com with your website or social media details. Our team will review your application within 2-3 business days.' },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = searchQuery
    ? faqCategories.flatMap((cat) =>
        cat.questions
          .filter((q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((q) => ({ ...q, category: cat.label }))
      )
    : [];

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl text-zinc-800">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg font-mono text-zinc-600">
            Everything you need to know about shopping with us
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 shadow-sm"
          />
        </div>

        {searchQuery ? (
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <p className="text-center text-zinc-500 font-mono">No results found for "{searchQuery}"</p>
            ) : (
              filteredQuestions.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
                  <span className="text-xs font-mono text-brand-purple uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-sans text-base text-zinc-800 mt-2">{item.q}</h3>
                  <p className="mt-2 text-sm font-mono text-zinc-600 leading-relaxed">{item.a}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-purple text-white'
                      : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {faqCategories
                .find((cat) => cat.id === activeCategory)
                ?.questions.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === `${activeCategory}-${i}` ? null : `${activeCategory}-${i}`)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-sans text-base text-zinc-800 pr-4">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform ${
                          openQuestion === `${activeCategory}-${i}` ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openQuestion === `${activeCategory}-${i}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <p className="text-sm font-mono text-zinc-600 leading-relaxed">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <p className="text-zinc-500 font-mono text-sm">
            Still have questions?{' '}
            <a href="/contact" className="text-brand-purple hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
