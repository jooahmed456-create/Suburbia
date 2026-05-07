import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, ChevronDown, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items, toggleCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Support', href: '/faq' },
  ];

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin': return '/admin';
      case 'employee': return '/employee';
      case 'affiliate': return '/affiliate';
      default: return '/dashboard';
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-gray/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            <Link to="/" className="flex-shrink-0">
              <span className="font-sans text-xl md:text-2xl tracking-tight text-brand-purple">
                SUBURBIA
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-sans text-sm lg:text-base text-zinc-700 hover:text-brand-purple transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-purple transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-zinc-700" />
              </button>

              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 text-zinc-700" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-brand-orange text-white text-xs font-mono rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {isAuthenticated && user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-zinc-100 transition-colors"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full bg-zinc-200"
                    />
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-100 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-zinc-100">
                          <p className="font-sans text-sm">{user.firstName} {user.lastName}</p>
                          <p className="text-xs font-mono text-zinc-500">{user.role}</p>
                        </div>
                        <Link
                          to={getDashboardLink()}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-mono text-zinc-700 hover:text-brand-purple transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-mono bg-brand-lime text-zinc-800 rounded-lg hover:bg-brand-lime/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-xl font-mono text-lg border-0 focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-brand-pink bg-texture md:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-20">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10"
              >
                <X className="w-6 h-6" />
              </button>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-sans text-2xl text-zinc-800 hover:text-brand-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl">
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                      className="flex items-center gap-2 px-4 py-3 bg-brand-orange text-white rounded-xl"
                    >
                      <LogOut className="w-5 h-5" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-3 bg-white rounded-xl text-center font-mono">
                      Sign In
                    </Link>
                    <Link to="/register" className="px-4 py-3 bg-brand-lime rounded-xl text-center font-mono">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
