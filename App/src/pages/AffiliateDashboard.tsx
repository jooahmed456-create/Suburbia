import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Link2, DollarSign, Image, Settings, LogOut,
  TrendingUp, MousePointer, ShoppingBag, Copy, Check
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

function AffiliateOverview() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://suburbia.com/ref/${user?.affiliateCode || 'CODE'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Total Clicks', value: '2,840', icon: <MousePointer className="w-5 h-5" />, change: '+15%' },
    { label: 'Conversions', value: '142', icon: <ShoppingBag className="w-5 h-5" />, change: '+8%' },
    { label: 'Commission', value: `$${user?.affiliateEarnings?.toFixed(2) || '0.00'}`, icon: <DollarSign className="w-5 h-5" />, change: '+12%' },
    { label: 'Conversion Rate', value: '5.0%', icon: <TrendingUp className="w-5 h-5" />, change: '+0.3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-brand-purple rounded-xl p-5 md:p-6 text-white">
        <h3 className="font-sans text-lg mb-3">Your Referral Link</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/10 rounded-lg px-4 py-3 font-mono text-sm truncate">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="mt-3 text-sm font-mono text-white/70">
          Share this link and earn 10% commission on every sale
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100"
          >
            <div className="text-brand-purple mb-2">{stat.icon}</div>
            <p className="font-sans text-xl text-zinc-800">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs font-mono text-green-600">{stat.change}</span>
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
        <h3 className="font-sans text-lg text-zinc-800 mb-4">Performance Overview</h3>
        <div className="space-y-4">
          {[
            { month: 'January', clicks: 420, conversions: 21, commission: 210 },
            { month: 'February', clicks: 580, conversions: 29, commission: 290 },
            { month: 'March', clicks: 720, conversions: 36, commission: 360 },
            { month: 'April', clicks: 640, conversions: 32, commission: 320 },
            { month: 'May', clicks: 480, conversions: 24, commission: 240 },
          ].map((month) => (
            <div key={month.month} className="flex items-center gap-4">
              <span className="w-20 font-mono text-sm text-zinc-600">{month.month}</span>
              <div className="flex-1 h-8 bg-zinc-50 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(month.clicks / 800) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-brand-lime rounded-lg"
                />
              </div>
              <span className="w-16 text-right font-mono text-sm text-zinc-800">{month.clicks}</span>
              <span className="w-16 text-right font-mono text-sm text-zinc-600">${month.commission}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
        <h3 className="font-sans text-lg text-zinc-800 mb-4">Payout History</h3>
        <div className="space-y-3">
          {[
            { date: '2025-04-01', amount: 450, status: 'Paid' },
            { date: '2025-03-01', amount: 380, status: 'Paid' },
            { date: '2025-02-01', amount: 420, status: 'Paid' },
          ].map((payout) => (
            <div key={payout.date} className="flex items-center justify-between py-2 border-b border-zinc-50">
              <div>
                <p className="font-mono text-sm text-zinc-800">{payout.date}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-zinc-800">${payout.amount}</p>
                <span className="text-xs font-mono text-green-600">{payout.status}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-2 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors">
          Request Payout
        </button>
      </div>
    </div>
  );
}

function MarketingMaterials() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Marketing Materials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Suburbia Logo (PNG)', size: '24KB' },
          { name: 'Banner 728x90', size: '156KB' },
          { name: 'Banner 300x250', size: '98KB' },
          { name: 'Product Feed CSV', size: '12KB' },
        ].map((asset) => (
          <div key={asset.name} className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image className="w-5 h-5 text-brand-purple" />
              <div>
                <p className="font-sans text-sm">{asset.name}</p>
                <p className="text-xs font-mono text-zinc-500">{asset.size}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-zinc-100 rounded-lg font-mono text-xs hover:bg-zinc-200 transition-colors">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AffiliateDashboard() {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: <DollarSign className="w-4 h-4" />, href: '/affiliate' },
    { label: 'Links', icon: <Link2 className="w-4 h-4" />, href: '/affiliate/links' },
    { label: 'Materials', icon: <Image className="w-4 h-4" />, href: '/affiliate/materials' },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/affiliate/settings' },
  ];

  return (
    <div className="min-h-[80dvh] bg-brand-gray bg-texture">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-zinc-200 font-mono text-sm"
              >
                <DollarSign className="w-4 h-4" /> Affiliate Menu
              </button>
            </div>
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24`}>
              <div className="flex items-center gap-3 mb-6 p-3 border-b border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-brand-lime flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-zinc-800" />
                </div>
                <div>
                  <p className="font-sans text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs font-mono text-zinc-500">Affiliate</p>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => { logout(); toast.success('Logged out'); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<AffiliateOverview />} />
              <Route path="/links" element={<AffiliateOverview />} />
              <Route path="/materials" element={<MarketingMaterials />} />
              <Route path="/settings" element={<MarketingMaterials />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
