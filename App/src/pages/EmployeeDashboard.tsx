import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, Truck, Headphones, LogOut,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

function EmployeeOverview() {
  const tasks = [
    { id: 'TK-001', title: 'Process new orders', status: 'pending', priority: 'high', time: '2h ago' },
    { id: 'TK-002', title: 'Update inventory', status: 'completed', priority: 'medium', time: '4h ago' },
    { id: 'TK-003', title: 'Handle return request', status: 'pending', priority: 'medium', time: '6h ago' },
    { id: 'TK-004', title: 'Print shipping labels', status: 'completed', priority: 'low', time: '8h ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Orders', value: '24', icon: <Package className="w-5 h-5" />, color: 'bg-orange-100 text-orange-700' },
          { label: 'Shipped Today', value: '18', icon: <Truck className="w-5 h-5" />, color: 'bg-blue-100 text-blue-700' },
          { label: 'Returns', value: '3', icon: <AlertCircle className="w-5 h-5" />, color: 'bg-red-100 text-red-700' },
          { label: 'Tickets', value: '7', icon: <Headphones className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="font-sans text-xl text-zinc-800">{stat.value}</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
        <h3 className="font-sans text-lg text-zinc-800 mb-4">My Tasks</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                task.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {task.status === 'completed' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className={`font-sans text-sm ${task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                  {task.title}
                </p>
                <p className="text-xs font-mono text-zinc-500">{task.id} · {task.time}</p>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-zinc-100 text-zinc-700'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InventoryPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-sans text-xl md:text-2xl text-zinc-800">Inventory</h2>
      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5">
        <p className="font-mono text-sm text-zinc-600">Inventory management tools will be available here.</p>
      </div>
    </div>
  );
}

export default function EmployeeDashboard() {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, href: '/employee' },
    { label: 'Orders', icon: <Package className="w-4 h-4" />, href: '/employee/orders' },
    { label: 'Inventory', icon: <Truck className="w-4 h-4" />, href: '/employee/inventory' },
    { label: 'Support', icon: <Headphones className="w-4 h-4" />, href: '/employee/support' },
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
                <Package className="w-4 h-4" /> Employee Menu
              </button>
            </div>
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24`}>
              <div className="flex items-center gap-3 mb-6 p-3 border-b border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                  <span className="font-sans text-sm text-brand-purple">{user?.firstName?.[0]}</span>
                </div>
                <div>
                  <p className="font-sans text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs font-mono text-zinc-500">Employee · {user?.employeeId}</p>
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
              <Route path="/" element={<EmployeeOverview />} />
              <Route path="/orders" element={<InventoryPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/support" element={<InventoryPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
