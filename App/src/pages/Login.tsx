import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80dvh] bg-brand-pink bg-texture flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 ${shake ? 'animate-shake' : ''}`}
      >
        <div className="text-center mb-8">
          <h1 className="font-sans text-2xl md:text-3xl text-zinc-800">Welcome Back</h1>
          <p className="mt-2 text-zinc-500 font-mono text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-mono text-zinc-600 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-zinc-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-11 pr-11 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-brand-purple" />
              <span className="text-sm font-mono text-zinc-500">Remember me</span>
            </label>
            <Link to="#" className="text-sm font-mono text-brand-blue hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-zinc-400/30 border-t-zinc-800 rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-mono text-zinc-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-purple hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-brand-gray rounded-xl">
          <p className="text-xs font-mono text-zinc-500 mb-2">Demo accounts:</p>
          <div className="space-y-1 text-xs font-mono text-zinc-600">
            <p>admin@suburbia.com / admin123</p>
            <p>customer@suburbia.com / customer123</p>
            <p>employee@suburbia.com / employee123</p>
            <p>affiliate@suburbia.com / affiliate123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
