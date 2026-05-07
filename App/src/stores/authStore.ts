import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const SEED_USERS: Record<string, { password: string; user: User }> = {
  'admin@suburbia.com': {
    password: 'admin123',
    user: {
      id: 'u-admin',
      email: 'admin@suburbia.com',
      firstName: 'Alex',
      lastName: 'Trost',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      phone: '+1-555-0101',
      addresses: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  },
  'employee@suburbia.com': {
    password: 'employee123',
    user: {
      id: 'u-employee',
      email: 'employee@suburbia.com',
      firstName: 'Sam',
      lastName: 'Johnson',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      phone: '+1-555-0102',
      addresses: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      employeeId: 'EMP-001',
    },
  },
  'customer@suburbia.com': {
    password: 'customer123',
    user: {
      id: 'u-customer',
      email: 'customer@suburbia.com',
      firstName: 'Jordan',
      lastName: 'Smith',
      role: 'customer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
      phone: '+1-555-0103',
      addresses: [
        {
          id: 'addr-1',
          type: 'shipping',
          isDefault: true,
          firstName: 'Jordan',
          lastName: 'Smith',
          address1: '123 Main Street',
          address2: 'Apt 4B',
          city: 'Brooklyn',
          state: 'NY',
          zip: '11201',
          country: 'USA',
          phone: '+1-555-0103',
        },
      ],
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01',
    },
  },
  'affiliate@suburbia.com': {
    password: 'affiliate123',
    user: {
      id: 'u-affiliate',
      email: 'affiliate@suburbia.com',
      firstName: 'Casey',
      lastName: 'Williams',
      role: 'affiliate',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
      phone: '+1-555-0104',
      addresses: [],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01',
      affiliateCode: 'SUBURBIA20',
      affiliateEarnings: 1250.50,
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        const record = SEED_USERS[email.toLowerCase()];
        if (!record || record.password !== password) {
          return false;
        }
        set({ user: record.user, isAuthenticated: true, isLoading: false });
        return true;
      },

      register: async (data) => {
        const key = data.email.toLowerCase();
        if (SEED_USERS[key]) return false;
        const newUser: User = {
          id: `u-${Math.random().toString(36).substr(2, 9)}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'customer',
          addresses: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        SEED_USERS[key] = { password: data.password, user: newUser };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'suburbia-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
