import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Shield, Truck, RotateCcw, Bike, Snowflake, Mountain, Footprints, CircleDot, Waves, Dumbbell, Trophy } from 'lucide-react';
import { getFeaturedProducts, categories } from '../lib/data';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

const categoryIcons: Record<string, React.ReactNode> = {
  bicycles: <Bike className="w-6 h-6" />,
  'ski-snow': <Snowflake className="w-6 h-6" />,
  climbing: <Mountain className="w-6 h-6" />,
  running: <Footprints className="w-6 h-6" />,
  tennis: <CircleDot className="w-6 h-6" />,
  swimming: <Waves className="w-6 h-6" />,
  gym: <Dumbbell className="w-6 h-6" />,
  'team-sports': <Trophy className="w-6 h-6" />,
};

function ProductCard({ product, index }: { product: ReturnType<typeof getFeaturedProducts>[0]; index: number }) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      image: product.images[0] || '',
      price: product.price,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.165, 0.84, 0.44, 1] }}
      className="group bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-brand-lime transition-all duration-300"
    >
      <Link to={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-brand-lime text-zinc-800 text-xs font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        {product.compareAtPrice && (
          <span className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
            Sale
          </span>
        )}
      </Link>
      <div className="p-4 md:p-5">
        <p className="text-xs uppercase text-zinc-500 tracking-wider font-mono">{product.brand}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-sans text-base md:text-lg text-zinc-800 mt-1 group-hover:text-brand-purple transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-2">
          <Star className="w-4 h-4 fill-brand-lime text-brand-lime" />
          <span className="text-sm font-mono text-zinc-600">{product.rating}</span>
          <span className="text-sm font-mono text-zinc-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg text-zinc-800">${product.price}</span>
            {product.compareAtPrice && (
              <span className="font-mono text-sm text-zinc-400 line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-brand-lime text-zinc-800 rounded-lg text-xs font-mono hover:bg-brand-lime/90 transition-colors active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div>
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] bg-brand-pink bg-texture overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-sans text-[20vw] text-brand-purple opacity-10 tracking-tight whitespace-nowrap">
            SUBURBIA
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-800 leading-none"
              >
                Gear Up.
                <br />
                <span className="text-brand-purple">Go Beyond.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg text-zinc-600 font-mono max-w-md leading-relaxed"
              >
                Premium sports equipment for athletes who demand the best. From mountain peaks to city streets, we have got you covered.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm md:text-base hover:bg-brand-lime/90 transition-colors shadow-lg shadow-brand-lime/30"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-zinc-800 text-zinc-800 rounded-xl font-mono text-sm md:text-base hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Explore Categories
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {[
                  { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping $100+' },
                  { icon: <Shield className="w-4 h-4" />, text: '1 Year Warranty' },
                  { icon: <RotateCcw className="w-4 h-4" />, text: '30-Day Returns' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    {badge.icon}
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute inset-0 bg-white/50 rounded-3xl backdrop-blur-sm" />
                <img
                  src="/products/trek-fuel.jpg"
                  alt="Featured Mountain Bike"
                  className="relative w-full h-full object-contain p-6 animate-float"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 right-4 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-purple" />
                    <span className="font-mono text-xs">Best Seller</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-12 left-4 bg-brand-lime rounded-xl shadow-lg p-3"
                >
                  <span className="font-mono text-xs font-medium">New Arrival</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-gray bg-texture">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="font-sans text-3xl md:text-4xl text-zinc-800">Shop by Category</h2>
            <p className="mt-3 text-zinc-500 font-mono text-sm md:text-base max-w-lg mx-auto">
              Explore our curated collections across every sport
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Link
                  to={`/shop/${cat.slug}`}
                  className="flex flex-col items-center gap-3 p-4 md:p-5 bg-white rounded-xl hover:bg-brand-lime transition-all duration-300 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gray group-hover:bg-white transition-colors">
                    {categoryIcons[cat.id]}
                  </div>
                  <span className="font-sans text-xs md:text-sm text-zinc-700 text-center">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="font-sans text-3xl md:text-4xl text-zinc-800">Fresh Drops</h2>
            <p className="mt-3 text-zinc-500 font-mono text-sm md:text-base max-w-lg mx-auto">
              The latest arrivals from the world's top sports brands
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-purple text-white rounded-xl font-mono text-sm hover:bg-brand-purple/90 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-lime">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-sm uppercase tracking-wider text-brand-navy">New This Season</span>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-zinc-800 mt-3">
                Speed Meets Style
              </h2>
              <p className="mt-4 text-zinc-700 font-mono text-base leading-relaxed max-w-md">
                Discover our latest running collection. Engineered for performance, designed to turn heads on every mile.
              </p>
              <Link
                to="/shop/running"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-zinc-800 text-white rounded-xl font-mono text-sm hover:bg-zinc-700 transition-colors"
              >
                Shop Running <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src="/products/nike-pegasus.jpg"
                alt="Running Shoes"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50K+', label: 'Happy Athletes' },
              { value: '200+', label: 'Top Brands' },
              { value: '8', label: 'Sport Categories' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-sans text-3xl md:text-4xl text-brand-lime">{stat.value}</p>
                <p className="mt-2 text-sm text-brand-gray/70 font-mono">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-pink bg-texture">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-3xl md:text-4xl text-zinc-800">Join the Club</h2>
            <p className="mt-3 text-zinc-600 font-mono text-sm md:text-base">
              Get exclusive deals, early access to drops, and training tips delivered to your inbox.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white rounded-xl border border-zinc-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
              />
              <button className="px-6 py-3 bg-brand-purple text-white rounded-xl font-mono text-sm hover:bg-brand-purple/90 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
