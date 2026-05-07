import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin, Settings, LogOut,
  ChevronRight, Package, CreditCard, User, Bell
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

function DashboardHome() {
  const { user } = useAuthStore();
  const stats = [
    { label: 'Total Orders', value: '12', icon: <Package className="w-5 h-5" /> },
    { label: 'Total Spent', value: '$3,240', icon: <CreditCard className="w-5 h-5" /> },
    { label: 'Wishlist', value: '8', icon: <Heart className="w-5 h-5" /> },
    { label: 'Loyalty Points', value: '340', icon: <Bell className="w-5 h-5" /> },
  ];

  const recentOrders = [
    { id: 'SUB-123456', date: '2025-04-15', status: 'Delivered', total: 4299, items: 1 },
    { id: 'SUB-123455', date: '2025-03-28', status: 'Shipped', total: 499, items: 1 },
    { id: 'SUB-123454', date: '2025-03-10', status: 'Delivered', total: 139, items: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Hello, {user?.firstName || 'Athlete'}!</h2>
        <p className="text-sm font-mono text-zinc-500 mt-1">Welcome back to your dashboard</p>
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
            <p className="font-sans text-xl md:text-2xl text-zinc-800">{stat.value}</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="font-sans text-lg text-zinc-800">Recent Orders</h3>
          <Link to="/dashboard/orders" className="text-sm font-mono text-brand-purple hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-zinc-100">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div>
                <p className="font-mono text-sm text-zinc-800">{order.id}</p>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block text-xs font-mono px-2.5 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
                <p className="font-mono text-sm text-zinc-800 mt-1">${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersPage() {
  const orders = [
    { id: 'SUB-123456', date: '2025-04-15', status: 'Delivered', total: 4299, items: 1 },
    { id: 'SUB-123455', date: '2025-03-28', status: 'Shipped', total: 499, items: 1 },
    { id: 'SUB-123454', date: '2025-03-10', status: 'Delivered', total: 139, items: 1 },
    { id: 'SUB-123453', date: '2025-02-22', status: 'Delivered', total: 795, items: 1 },
    { id: 'SUB-123452', date: '2025-01-15', status: 'Cancelled', total: 210, items: 1 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">My Orders</h2>
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="divide-y divide-zinc-100">
          {orders.map((order) => (
            <div key={order.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div>
                <p className="font-mono text-sm text-zinc-800">{order.id}</p>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block text-xs font-mono px-2.5 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
                <p className="font-mono text-sm text-zinc-800 mt-1">${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WishlistPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">My Wishlist</h2>
      <div className="text-center py-16 bg-white rounded-xl">
        <Heart className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
        <p className="font-sans text-lg text-zinc-500">Your wishlist is empty</p>
        <Link to="/shop" className="mt-4 inline-block px-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

function AddressesPage() {
  const { user } = useAuthStore();
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">My Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user?.addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
            {addr.isDefault && (
              <span className="inline-block text-xs font-mono bg-brand-purple text-white px-2 py-0.5 rounded-full mb-2">
                Default
              </span>
            )}
            <p className="font-sans text-sm text-zinc-800">{addr.firstName} {addr.lastName}</p>
            <p className="text-sm font-mono text-zinc-600 mt-1">{addr.address1}</p>
            {addr.address2 && <p className="text-sm font-mono text-zinc-600">{addr.address2}</p>}
            <p className="text-sm font-mono text-zinc-600">{addr.city}, {addr.state} {addr.zip}</p>
            <p className="text-sm font-mono text-zinc-600">{addr.country}</p>
            <p className="text-sm font-mono text-zinc-500 mt-2">{addr.phone}</p>
          </div>
        ))}
        <button className="border-2 border-dashed border-zinc-300 rounded-xl p-5 flex items-center justify-center gap-2 text-zinc-500 hover:border-brand-purple hover:text-brand-purple transition-colors">
          <MapPin className="w-5 h-5" />
          <span className="font-mono text-sm">Add New Address</span>
        </button>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuthStore();
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'password' | 'notifications'>('profile');

  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Account Settings</h2>
      <div className="flex gap-4 border-b border-zinc-200">
        {(['profile', 'password', 'notifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSettingsTab(tab)}
            className={`py-3 font-mono text-sm capitalize border-b-2 transition-colors ${
              activeSettingsTab === tab ? 'border-brand-purple text-brand-purple' : 'border-transparent text-zinc-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
        {activeSettingsTab === 'profile' && (
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <img src={user?.avatar} alt={user?.firstName} className="w-16 h-16 rounded-full bg-zinc-200" />
              <button className="text-sm font-mono text-brand-purple hover:underline">Change Avatar</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1">First Name</label>
                <input type="text" defaultValue={user?.firstName} className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1">Last Name</label>
                <input type="text" defaultValue={user?.lastName} className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1">Email</label>
              <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1">Phone</label>
              <input type="tel" defaultValue={user?.phone} className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
            </div>
            <button className="px-6 py-2 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors">
              Save Changes
            </button>
          </div>
        )}
        {activeSettingsTab === 'password' && (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1">Current Password</label>
              <input type="password" className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1">New Password</label>
              <input type="password" className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1">Confirm New Password</label>
              <input type="password" className="w-full px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm" />
            </div>
            <button className="px-6 py-2 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors">
              Update Password
            </button>
          </div>
        )}
        {activeSettingsTab === 'notifications' && (
          <div className="space-y-4 max-w-md">
            {[
              { label: 'Order updates', desc: 'Get notified when your order status changes' },
              { label: 'Promotions', desc: 'Receive exclusive deals and offers' },
              { label: 'New arrivals', desc: 'Be the first to know about new products' },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-sans text-sm">{setting.label}</p>
                  <p className="text-xs font-mono text-zinc-500">{setting.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-brand-purple w-5 h-5" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/dashboard' },
    { label: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, href: '/dashboard/orders' },
    { label: 'Wishlist', icon: <Heart className="w-4 h-4" />, href: '/dashboard/wishlist' },
    { label: 'Addresses', icon: <MapPin className="w-4 h-4" />, href: '/dashboard/addresses' },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/dashboard/settings' },
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
                <User className="w-4 h-4" /> Account Menu
              </button>
            </div>
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24`}>
              <div className="flex items-center gap-3 mb-6 p-3 border-b border-zinc-100">
                <img src={user?.avatar} alt={user?.firstName} className="w-10 h-10 rounded-full bg-zinc-200" />
                <div>
                  <p className="font-sans text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs font-mono text-zinc-500">{user?.role}</p>
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
              <Route path="/" element={<DashboardHome />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/addresses" element={<AddressesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
