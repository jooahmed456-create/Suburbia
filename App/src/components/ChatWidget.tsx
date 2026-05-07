import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { getProductById } from '../lib/data';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: string[];
}

const KNOWLEDGE_BASE: Record<string, string> = {
  shipping: 'We offer free shipping on orders over $100. Standard shipping takes 3-5 business days, express 1-2 days.',
  returns: 'You can return any item within 30 days of purchase for a full refund. Items must be unused with original packaging.',
  warranty: 'All products come with a 1-year manufacturer warranty. Some premium items include extended 2-year coverage.',
  sizing: 'Check our detailed size guides on each product page. For shoes, we recommend measuring your foot and comparing to our chart.',
  payment: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are securely encrypted.',
  discount: 'Use code SAVE10 for 10% off, WELCOME20 for 20% off first orders, or SUMMER15 for 15% off seasonal items.',
};

function generateResponse(input: string): { text: string; products?: string[] } {
  const lower = input.toLowerCase();
  
  if (lower.includes('ship') || lower.includes('delivery')) {
    return { text: KNOWLEDGE_BASE.shipping };
  }
  if (lower.includes('return') || lower.includes('refund')) {
    return { text: KNOWLEDGE_BASE.returns };
  }
  if (lower.includes('warranty')) {
    return { text: KNOWLEDGE_BASE.warranty };
  }
  if (lower.includes('size') || lower.includes('fit')) {
    return { text: KNOWLEDGE_BASE.sizing };
  }
  if (lower.includes('pay')) {
    return { text: KNOWLEDGE_BASE.payment };
  }
  if (lower.includes('discount') || lower.includes('code') || lower.includes('coupon')) {
    return { text: KNOWLEDGE_BASE.discount };
  }
  if (lower.includes('bike') || lower.includes('bicycle') || lower.includes('trek')) {
    return { 
      text: 'I recommend the Trek Domane SL 6 for road cycling and the Trek Fuel EX 9.8 for mountain trails. Both are excellent choices with great reviews.',
      products: ['trek-domane-sl6', 'trek-fuel-ex-9']
    };
  }
  if (lower.includes('ski') || lower.includes('boot') || lower.includes('salomon')) {
    return { 
      text: 'The Salomon S/Pro 100 ski boots are our top seller for intermediate to advanced skiers. They offer heat-moldable liners for a custom fit.',
      products: ['salomon-s-pro-100']
    };
  }
  if (lower.includes('run') || lower.includes('shoe') || lower.includes('nike')) {
    return { 
      text: 'The Nike Pegasus 41 is our most popular daily trainer. It features ReactX foam and Air Zoom units for responsive cushioning.',
      products: ['nike-pegasus-41']
    };
  }
  if (lower.includes('snowboard') || lower.includes('burton')) {
    return { 
      text: 'The Burton Process Flying V is a versatile all-mountain board perfect for park, powder, and everything in between.',
      products: ['burton-process-fv']
    };
  }
  if (lower.includes('climb') || lower.includes('harness') || lower.includes('patagonia')) {
    return { 
      text: 'The Patagonia Refuge harness is excellent for both gym sessions and multi-pitch routes. It features adjustable leg loops and breathable mesh.',
      products: ['patagonia-refugee']
    };
  }
  if (lower.includes('tennis') || lower.includes('racket') || lower.includes('wilson')) {
    return { 
      text: 'The Wilson Pro Staff 97 v14 offers incredible control and feel. It is perfect for advanced players who want precision on every shot.',
      products: ['wilson-pro-staff']
    };
  }
  if (lower.includes('swim') || lower.includes('speedo')) {
    return { 
      text: 'The Speedo LZR Pure Intent 2.0 is a technical racing suit with triple-fabric construction and targeted compression zones.',
      products: ['speedo-fastskin']
    };
  }
  if (lower.includes('gym') || lower.includes('cardio') || lower.includes('rogue')) {
    return { 
      text: 'The Rogue Echo Bike is built for high-intensity training. The fan resistance increases with your output - perfect for HIIT and CrossFit.',
      products: ['rogue-echo-bike']
    };
  }
  if (lower.includes('soccer') || lower.includes('cleat') || lower.includes('adidas')) {
    return { 
      text: 'The Adidas Predator Elite FG features Strikeskin rubber fins for elite ball control. Designed for players who dictate the tempo.',
      products: ['adidas-predator']
    };
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return { text: 'Hey there! I am your Suburbia Sports assistant. I can help you find products, check order status, or answer questions about shipping, returns, and sizing. What can I help you with today?' };
  }
  if (lower.includes('help') || lower.includes('support')) {
    return { text: 'I am here to help! I can assist with product recommendations, order inquiries, shipping questions, returns, sizing advice, and more. What do you need help with?' };
  }
  
  return { 
    text: 'I am not sure I understood that. I can help you find products, check shipping info, answer questions about returns, sizing, or warranties. What would you like to know?' 
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hey there! I am your Suburbia Sports assistant. I can help you find the perfect gear, answer questions, or assist with orders. What can I help you with?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: response.text,
        products: response.products,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-90 w-14 h-14 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center hover:bg-brand-purple/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-24 right-6 z-90 w-[360px] max-w-[calc(100vw-48px)] h-[480px] max-h-[calc(100dvh-140px)] bg-white rounded-2xl shadow-2xl border border-zinc-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-brand-purple text-white">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-sans text-sm">Suburbia Assistant</p>
                <p className="text-xs text-white/70 font-mono">AI-powered support</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' ? 'bg-brand-purple/10' : 'bg-brand-lime'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-brand-purple" /> : <User className="w-4 h-4 text-zinc-700" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-zinc-100 text-zinc-800'
                      : 'bg-brand-purple text-white'
                  }`}>
                    <p>{msg.content}</p>
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.products.map((pid) => {
                          const product = getProductById(pid);
                          if (!product) return null;
                          return (
                            <a
                              key={pid}
                              href={`/products/${product.slug}`}
                              onClick={(e) => { e.preventDefault(); window.location.href = `/products/${product.slug}`; }}
                              className="block bg-white rounded-lg p-2 border border-zinc-200 hover:border-brand-purple transition-colors"
                            >
                              <p className="font-sans text-xs">{product.name}</p>
                              <p className="font-mono text-xs text-zinc-500">${product.price}</p>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-purple/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand-purple" />
                  </div>
                  <div className="bg-zinc-100 rounded-xl px-3 py-2 flex items-center gap-1">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-zinc-400"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-zinc-400"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-zinc-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-zinc-100 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-zinc-50 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-brand-purple text-white disabled:opacity-40 hover:bg-brand-purple/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
