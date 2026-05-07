import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return { strength, label: labels[strength] || 'Weak', color: colors[strength] || 'bg-red-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreed) {
      toast.error('Please agree to the terms');
      return;
    }
    setIsLoading(true);
    const success = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    setIsLoading(false);
    if (success) {
      toast.success('Account created!');
      navigate('/');
    } else {
      toast.error('Email already registered');
    }
  };

  return (
    <div className="min-h-[80dvh] bg-brand-pink bg-texture flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-sans text-2xl md:text-3xl text-zinc-800">Create Account</h1>
          <p className="mt-2 text-zinc-500 font-mono text-sm">Join the Suburbia community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1.5">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full pl-10 pr-3 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono text-zinc-600 mb-1.5">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="w-full px-3 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-zinc-600 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-zinc-600 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min 8 characters"
                required
                minLength={8}
                className="w-full pl-11 pr-11 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 h-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i <= passwordStrength.strength ? passwordStrength.color : 'bg-zinc-200'}`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-mono mt-1 ${passwordStrength.strength >= 2 ? 'text-green-600' : 'text-zinc-500'}`}>
                  {passwordStrength.label}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-mono text-zinc-600 mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className={`w-full px-4 py-3 border-2 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple ${
                formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300' : 'border-zinc-200'
              }`}
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs font-mono text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-brand-purple"
            />
            <span className="text-sm font-mono text-zinc-500">
              I agree to the <Link to="#" className="text-brand-purple hover:underline">Terms of Service</Link> and{' '}
              <Link to="#" className="text-brand-purple hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-zinc-400/30 border-t-zinc-800 rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-mono text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-purple hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
