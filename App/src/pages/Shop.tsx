import { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, SlidersHorizontal, X, Heart, Eye, ShoppingCart } from 'lucide-react';
import { filterProducts, categories, brands, products } from '../lib/data';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export default function Shop() {
  const { category: paramCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(paramCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<string | null>(null);

  const { addItem } = useCartStore();

  const filteredProducts = useMemo(() => {
    return filterProducts({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      brand: selectedBrand || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: searchQuery || undefined,
      sort: sortBy,
    });
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchQuery]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
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
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm font-mono text-zinc-500 mb-4">
            <Link to="/" className="hover:text-brand-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-800">Shop</span>
            {searchQuery && (
              <>
                <span>/</span>
                <span className="text-brand-purple">Search: "{searchQuery}"</span>
              </>
            )}
          </nav>
          <h1 className="font-sans text-3xl md:text-4xl text-zinc-800">
            {searchQuery ? `Search Results` : 'All Products'}
          </h1>
          <p className="mt-2 font-mono text-sm text-zinc-500">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-60 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-zinc-200 font-mono text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6 bg-white rounded-xl p-5 lg:sticky lg:top-24`}>
              <div>
                <h3 className="font-sans text-sm mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-brand-purple"
                    />
                    <span className="text-sm font-mono">All Categories</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="accent-brand-purple"
                      />
                      <span className="text-sm font-mono">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-sans text-sm mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border border-zinc-200 rounded text-sm font-mono"
                    />
                    <span className="text-zinc-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 px-2 py-1 border border-zinc-200 rounded text-sm font-mono"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-brand-purple"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-sm mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                        className="accent-brand-purple"
                      />
                      <span className="text-sm font-mono">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('');
                  setPriceRange([0, 6000]);
                  setSearchParams({});
                }}
                className="w-full py-2 text-sm font-mono text-brand-purple hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-mono text-zinc-500 hidden md:inline">
                Showing {filteredProducts.length} results
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-mono text-zinc-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                <p className="font-sans text-lg text-zinc-500">No products match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('');
                    setPriceRange([0, 6000]);
                    setSearchParams({});
                  }}
                  className="mt-4 px-6 py-3 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <Link to={`/products/${product.slug}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                      </Link>
                      <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-brand-pink transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-brand-orange text-brand-orange' : 'text-zinc-600'}`} />
                        </button>
                        <button
                          onClick={() => setQuickView(product.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-brand-blue hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4 text-zinc-600" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-lime shadow-md hover:bg-brand-lime/80 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4 text-zinc-800" />
                        </button>
                      </div>
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-brand-lime text-zinc-800 text-xs font-mono px-2.5 py-1 rounded-full">New</span>
                      )}
                      {product.compareAtPrice && (
                        <span className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-mono px-2.5 py-1 rounded-full">Sale</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase text-zinc-500 tracking-wider font-mono">{product.brand}</p>
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="font-sans text-base text-zinc-800 mt-1 hover:text-brand-purple transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Star className="w-4 h-4 fill-brand-lime text-brand-lime" />
                        <span className="text-sm font-mono text-zinc-600">{product.rating}</span>
                        <span className="text-sm font-mono text-zinc-400">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono text-lg text-zinc-800">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="font-mono text-sm text-zinc-400 line-through">${product.compareAtPrice}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {quickView && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setQuickView(null)} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            {(() => {
              const product = products.find((p) => p.id === quickView);
              if (!product) return null;
              return (
                <div className="p-6">
                  <button
                    onClick={() => setQuickView(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img src={product.images[0]} alt={product.name} className="w-full aspect-[4/3] object-cover rounded-xl mb-4" />
                  <p className="text-xs uppercase text-zinc-500 tracking-wider font-mono">{product.brand}</p>
                  <h2 className="font-sans text-xl text-zinc-800 mt-1">{product.name}</h2>
                  <p className="text-sm text-zinc-600 font-mono mt-2 line-clamp-3">{product.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-mono text-2xl text-zinc-800">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="font-mono text-sm text-zinc-400 line-through">${product.compareAtPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => { handleAddToCart(product); setQuickView(null); }}
                      className="flex-1 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={() => setQuickView(null)}
                      className="flex-1 py-3 border-2 border-zinc-800 text-zinc-800 rounded-xl font-mono text-sm text-center hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
}
