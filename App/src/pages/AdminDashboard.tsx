import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut,
  TrendingUp, TrendingDown, Search, Filter
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { products } from '../lib/data';
import toast from 'react-hot-toast';

function AdminOverview() {
  const kpis = [
    { label: 'Revenue', value: '$48,520', change: '+12%', up: true, icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Orders', value: '156', change: '+8%', up: true, icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Customers', value: '2,340', change: '+5%', up: true, icon: <Users className="w-5 h-5" /> },
    { label: 'Conversion', value: '3.2%', change: '-0.4%', up: false, icon: <TrendingDown className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-brand-purple">{kpi.icon}</span>
              <span className={`text-xs font-mono ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="font-sans text-xl md:text-2xl text-zinc-800">{kpi.value}</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
          <h3 className="font-sans text-lg text-zinc-800 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[
              { id: 'SUB-123460', customer: 'Jordan Smith', total: 4299, status: 'Delivered' },
              { id: 'SUB-123459', customer: 'Alex Morgan', total: 599, status: 'Processing' },
              { id: 'SUB-123458', customer: 'Sam Johnson', total: 139, status: 'Shipped' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-zinc-50">
                <div>
                  <p className="font-mono text-sm text-zinc-800">{order.id}</p>
                  <p className="text-xs font-mono text-zinc-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{order.status}</span>
                  <p className="font-mono text-sm text-zinc-800 mt-0.5">${order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
          <h3 className="font-sans text-lg text-zinc-800 mb-4">Top Products</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product, i) => (
              <div key={product.id} className="flex items-center gap-3 py-2 border-b border-zinc-50">
                <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center font-mono text-xs">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-zinc-800 truncate">{product.name}</p>
                  <p className="text-xs font-mono text-zinc-500">{product.brand}</p>
                </div>
                <span className="font-mono text-sm text-zinc-800">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsManagement() {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Products</h2>
        <button className="px-4 py-2 bg-brand-lime text-zinc-800 rounded-lg font-mono text-sm hover:bg-brand-lime/90 transition-colors">
          + Add Product
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm"
          />
        </div>
        <button className="flex items-center gap-1 px-3 py-2 border border-zinc-200 rounded-lg font-mono text-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Product</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">SKU</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Price</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Stock</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-lg overflow-hidden">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-sans text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-zinc-600">{product.sku}</td>
                  <td className="px-4 py-3 font-mono text-sm">${product.price}</td>
                  <td className="px-4 py-3 font-mono text-sm">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrdersManagement() {
  const orders = [
    { id: 'SUB-123460', customer: 'Jordan Smith', email: 'customer@suburbia.com', total: 4299, status: 'Delivered', date: '2025-04-15' },
    { id: 'SUB-123459', customer: 'Alex Morgan', email: 'alex@example.com', total: 599, status: 'Processing', date: '2025-04-14' },
    { id: 'SUB-123458', customer: 'Sam Johnson', email: 'employee@suburbia.com', total: 139, status: 'Shipped', date: '2025-04-12' },
    { id: 'SUB-123457', customer: 'Casey Williams', email: 'affiliate@suburbia.com', total: 795, status: 'Delivered', date: '2025-04-10' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Orders</h2>
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Order</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Customer</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Total</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Status</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm">{order.customer}</p>
                    <p className="text-xs font-mono text-zinc-500">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">${order.total}</td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={order.status}
                      className="text-xs font-mono px-2 py-1 rounded border border-zinc-200"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-zinc-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomersPage() {
  const customers = [
    { name: 'Jordan Smith', email: 'customer@suburbia.com', orders: 12, spent: 3240, joined: '2024-02-01' },
    { name: 'Alex Morgan', email: 'alex@example.com', orders: 5, spent: 1200, joined: '2024-06-15' },
    { name: 'Sam Johnson', email: 'employee@suburbia.com', orders: 8, spent: 2100, joined: '2024-01-15' },
    { name: 'Casey Williams', email: 'affiliate@suburbia.com', orders: 3, spent: 895, joined: '2024-03-01' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Customers</h2>
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Name</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Orders</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Total Spent</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-zinc-500">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {customers.map((customer) => (
                <tr key={customer.email} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm">{customer.name}</p>
                    <p className="text-xs font-mono text-zinc-500">{customer.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{customer.orders}</td>
                  <td className="px-4 py-3 font-mono text-sm">${customer.spent}</td>
                  <td className="px-4 py-3 font-mono text-sm text-zinc-500">{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, href: '/admin' },
    { label: 'Products', icon: <Package className="w-4 h-4" />, href: '/admin/products' },
    { label: 'Orders', icon: <ShoppingCart className="w-4 h-4" />, href: '/admin/orders' },
    { label: 'Customers', icon: <Users className="w-4 h-4" />, href: '/admin/customers' },
    { label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, href: '/admin/analytics' },
  ];

  return (
    <div className="min-h-[80dvh] bg-zinc-100">
      <div className="flex flex-col lg:flex-row min-h-[80dvh]">
        <div className="lg:w-64 flex-shrink-0 bg-zinc-900 text-white">
          <div className="p-4 lg:p-6">
            <Link to="/" className="inline-block">
              <span className="font-sans text-xl text-brand-lime">SUBURBIA</span>
            </Link>
          </div>
          <div className="lg:hidden p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full py-2 bg-white/10 rounded-lg font-mono text-sm"
            >
              Toggle Menu
            </button>
          </div>
          <nav className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block space-y-1 px-4 pb-4`}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { logout(); toast.success('Logged out'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </div>

        <div className="flex-1 p-4 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-mono text-zinc-500">Admin Panel</p>
              <p className="font-sans text-lg text-zinc-800">Welcome back, {user?.firstName}</p>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/analytics" element={<AdminOverview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
