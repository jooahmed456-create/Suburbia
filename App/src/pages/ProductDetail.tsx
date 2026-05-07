import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { getProductBySlug } from '../lib/data';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-[60dvh] flex items-center justify-center bg-brand-gray bg-texture">
        <div className="text-center">
          <h1 className="font-sans text-2xl text-zinc-800">Product Not Found</h1>
          <Link to="/shop" className="mt-4 inline-block text-brand-purple font-mono hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      sku: selectedVariant?.sku || product.sku,
      image: product.images[0] || '',
      price: selectedVariant?.price || product.price,
      quantity,
      variantName: selectedVariant?.name,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const stockStatus = product.stock > 10 ? { text: 'In Stock', color: 'bg-green-100 text-green-700' } :
    product.stock > 0 ? { text: 'Low Stock', color: 'bg-orange-100 text-orange-700' } :
    { text: 'Out of Stock', color: 'bg-red-100 text-red-700' };

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-mono text-zinc-500 mb-6">
          <Link to="/" className="hover:text-brand-purple transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-brand-purple transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-lime text-zinc-800 text-xs font-mono px-3 py-1.5 rounded-full uppercase tracking-wider">
                New
              </span>
            )}
            {product.compareAtPrice && (
              <span className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-mono px-3 py-1.5 rounded-full uppercase tracking-wider">
                Sale
              </span>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div>
              <p className="text-xs uppercase text-zinc-500 tracking-wider font-mono">{product.brand}</p>
              <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl text-zinc-800 mt-2">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-lime text-brand-lime' : 'text-zinc-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono text-zinc-600">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl md:text-4xl text-zinc-800">
                ${selectedVariant?.price || product.price}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-lg text-zinc-400 line-through">${product.compareAtPrice}</span>
              )}
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>

            <p className="text-zinc-600 font-mono text-sm leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <p className="font-sans text-sm mb-2">Variant: <span className="font-mono text-zinc-600">{selectedVariant?.name}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-2 rounded-lg text-sm font-mono border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                          : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border-2 border-zinc-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-zinc-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-mono text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-zinc-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="px-4 py-3 border-2 border-zinc-200 rounded-xl hover:border-brand-purple hover:text-brand-purple transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-brand-orange text-brand-orange' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping $100+' },
                { icon: <Shield className="w-4 h-4" />, text: '1 Year Warranty' },
                { icon: <RotateCcw className="w-4 h-4" />, text: '30-Day Returns' },
              ].map((badge) => (
                <div key={badge.text} className="flex flex-col items-center text-center gap-1.5 p-3 bg-white rounded-xl">
                  <span className="text-brand-purple">{badge.icon}</span>
                  <span className="text-xs font-mono text-zinc-600">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12 md:mt-16">
          <div className="border-b border-zinc-200 flex gap-6">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 md:py-4 font-mono text-sm capitalize border-b-2 transition-colors ${
                  activeTab === tab ? 'border-brand-purple text-brand-purple' : 'border-transparent text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : tab}
              </button>
            ))}
          </div>

          <div className="py-6 md:py-8">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="max-w-3xl">
                  <p className="text-zinc-700 font-mono leading-relaxed">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-zinc-700 font-mono text-sm">
                        <Check className="w-4 h-4 text-brand-lime" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-zinc-100">
                        <span className="font-mono text-sm text-zinc-500">{key}</span>
                        <span className="font-mono text-sm text-zinc-800 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 text-center">
                      <p className="font-sans text-5xl text-zinc-800">{product.rating}</p>
                      <div className="flex justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-brand-lime text-brand-lime' : 'text-zinc-300'}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-mono text-zinc-500">{product.reviewCount} reviews</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                            <span className="font-sans text-sm text-brand-purple">{review.userName[0]}</span>
                          </div>
                          <div>
                            <p className="font-sans text-sm">{review.userName}</p>
                            <p className="text-xs font-mono text-zinc-400">{review.date}</p>
                          </div>
                          <div className="ml-auto flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-brand-lime text-brand-lime' : 'text-zinc-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="font-sans text-sm text-zinc-800">{review.title}</p>
                        <p className="mt-1 text-sm font-mono text-zinc-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
