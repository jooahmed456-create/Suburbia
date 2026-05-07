import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-gray">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-sans text-2xl text-brand-lime">SUBURBIA</span>
            </Link>
            <p className="text-sm text-brand-gray/70 font-mono leading-relaxed">
              Premium sports equipment for athletes who demand the best. From mountain peaks to city streets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-brand-lime hover:text-brand-navy transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-brand-lime hover:text-brand-navy transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-brand-lime hover:text-brand-navy transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-brand-lime hover:text-brand-navy transition-all duration-200">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-sans text-lg text-brand-lime mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {['Bicycles', 'Ski & Snow', 'Climbing', 'Running', 'Tennis', 'Swimming', 'Gym', 'Team Sports'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/shop`}
                    className="text-sm text-brand-gray/70 hover:text-brand-lime transition-colors font-mono"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-sans text-lg text-brand-lime mb-4">Support</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Shipping & Returns', href: '/shipping-returns' },
                { label: 'Size Guide', href: '/shipping-returns' },
                { label: 'Warranty', href: '/faq' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-brand-gray/70 hover:text-brand-lime transition-colors font-mono">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-lg text-brand-lime mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-brand-gray/70 font-mono">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-lime" />
                <span>1234 Sport Ave, Portland, OR 97201</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-gray/70 font-mono">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-lime" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-gray/70 font-mono">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand-lime" />
                <span>hello@suburbia.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-brand-gray/70 font-mono mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-mono text-white placeholder:text-white/40 focus:outline-none focus:border-brand-lime"
                />
                <button className="px-4 py-2 bg-brand-lime text-brand-navy rounded-lg text-sm font-mono hover:bg-brand-lime/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-gray/50 font-mono">
            © 2025 Suburbia Sports. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="text-xs text-brand-gray/50 hover:text-brand-lime transition-colors font-mono">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-xs text-brand-gray/50 hover:text-brand-lime transition-colors font-mono">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
