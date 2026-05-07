# Suburbia Sports — Technical Specification

## 1. Project Overview

Transform the existing Suburbia skateboard showcase (Next.js 15 + Prismic + Three.js + GSAP) into a production-grade sports equipment e-commerce platform with role-based dashboards, AI chat, 3D product visualization, and a full commerce stack.

**Approach**: Evolve the existing codebase rather than replacing it. Keep all original technologies (Next.js, Tailwind, GSAP, Three.js, Fluid Tailwind) and add the e-commerce layer on top. Remove Prismic dependency (requires external account) and replace with local data layer.

---

## 2. Technology Stack

### Core (Existing — Preserved)
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | Full-stack React framework, App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| fluid-tailwind | latest | Fluid typography & spacing |
| GSAP | 3.12.x | Advanced animations, ScrollTrigger |
| Three.js | 0.171.x | 3D rendering engine |
| React Three Fiber | latest | React renderer for Three.js |
| React Three Drei | latest | R3F helpers (OrbitControls, ContactShadows, etc.) |
| Matter.js | latest | 2D physics (footer animation) |

### New Additions
| Technology | Purpose |
|------------|---------|
| shadcn/ui | Pre-built accessible components (forms, tables, dialogs, dropdowns) |
| Zustand | Lightweight state management (cart, auth, UI) |
| React Query (TanStack Query) | Server state management, caching, optimistic updates |
| Framer Motion | Component-level animations, layout animations, AnimatePresence |
| Recharts | Dashboard charts and data visualization |
| bcryptjs | Password hashing |
| jose | JWT signing/verification |
| DOMPurify | XSS input sanitization |
| react-hot-toast | Toast notifications |
| react-hook-form | Form validation and management |
| zod | Schema validation |
| lucide-react | Icon library |

### State Architecture
- **Zustand stores**:
  - `useAuthStore`: User session, role, JWT token
  - `useCartStore`: Cart items, quantities, totals, localStorage persistence
  - `useUIStore`: Theme, modals, drawer states
- **React Query**: Product catalog, orders, user data — server cache with optimistic updates

---

## 3. Project Structure

```
suburbia/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (shop)/                   # Shop layout (with header)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── shop/
│   │   │   │   └── page.tsx          # Product catalog
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx          # Cart page
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx          # Checkout
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── shipping-returns/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Shop layout with Header
│   │   ├── (auth)/                   # Auth layout (no header)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Customer home
│   │   │   │   ├── orders/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── wishlist/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── addresses/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── admin/                    # Admin routes
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── customers/
│   │   │   └── analytics/
│   │   ├── employee/
│   │   ├── affiliate/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── refresh/route.ts
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   └── chat/
│   │   ├── build/                    # 3D customizer (existing)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Homepage
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── Bounded.tsx
│   │   ├── ButtonLink.tsx
│   │   ├── Footer.tsx
│   │   ├── FooterPhysics.tsx
│   │   ├── Header.tsx
│   │   ├── Heading.tsx
│   │   ├── Logo.tsx
│   │   ├── SlideIn.tsx
│   │   ├── SVGFilters.tsx
│   │   ├── Line.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── ProductCard.tsx
│   │   ├── StarRating.tsx
│   │   ├── QuantityStepper.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── Pagination.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── SkeletonTable.tsx
│   │   ├── DataTable.tsx
│   │   ├── StatCard.tsx
│   │   └── ChartCard.tsx
│   ├── slices/                       # Existing homepage sections
│   │   ├── Hero/
│   │   ├── ProductGrid/
│   │   ├── TeamGrid/
│   │   ├── TextAndImage/
│   │   └── VideoBlock/
│   ├── lib/
│   │   ├── utils.ts                  # cn() helper, utilities
│   │   ├── data.ts                   # Product catalog data
│   │   ├── auth.ts                   # JWT helpers, role checks
│   │   ├── rate-limit.ts             # Rate limiting
│   │   ├── sanitize.ts              # XSS sanitization
│   │   └── constants.ts              # App constants
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useScrollPosition.ts
│   │   └── useLocalStorage.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   ├── product.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   └── cart.ts
│   └── middleware.ts                 # Next.js middleware (auth, rate limiting)
├── public/
│   ├── bg-texture.webp
│   ├── skateboard.gltf
│   ├── skateboard.bin
│   ├── hdr/
│   ├── skateboard/
│   └── products/                     # Product images
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Component Inventory

### 4.1 shadcn/ui Components (To Install)

| Component | Usage | Customization |
|-----------|-------|---------------|
| Button | CTAs, form submits | Match `button-cutout` style |
| Input | Form fields | Brand border colors, focus ring |
| Label | Form labels | DM Mono font |
| Select | Sort, filters | Custom dropdown arrow |
| Checkbox | Filters, terms | Brand colors |
| RadioGroup | Shipping, payment | Brand purple for checked |
| Dialog | Quick view, modals | Rounded-2xl, brand style |
| Sheet | Cart drawer, mobile menu | Slide from right |
| Tabs | Product detail tabs | Brand underline indicator |
| Accordion | FAQ, order details | Brand chevron |
| Table | Admin tables, orders | Alternating rows |
| Card | Product cards, dashboard cards | White, rounded-xl |
| Badge | Stock, status, category | Brand color variants |
| Separator | Dividers | zinc-200 |
| Skeleton | Loading states | shimmer animation |
| Avatar | User avatars | Fallback initials |
| Tooltip | Hotspots, info | Brand style |
| DropdownMenu | User menu, actions | Brand style |
| ScrollArea | Chat, cart | Custom scrollbar |
| Slider | Price range | Brand-lime thumb |
| Switch | Toggles | Brand purple |
| Toast | Notifications | Custom positioning |
| Form | Form validation | React Hook Form integration |
| Command | Search, command palette | Brand style |
| Calendar | Date picker | Brand style |
| Popover | Date picker, info | Brand style |
| Breadcrumb | Navigation | DM Mono font |
| Pagination | Product lists | Brand style |
| Progress | Checkout progress | Brand lime |
| Textarea | Contact form | Brand border |
| Toggle | Filters | Brand style |

### 4.2 Custom Components

| Component | Source | Purpose |
|-----------|--------|---------|
| Bounded | Existing | Layout wrapper with consistent padding |
| ButtonLink | Existing | Styled links with cutout effect |
| Header | Existing | Top navigation, now with auth/cart |
| Footer | Existing | Footer with physics animation |
| FooterPhysics | Existing | Matter.js physics in footer |
| Heading | Existing | Display heading component |
| Logo | Existing | SVG wordmark |
| SlideIn | Existing | Scroll-triggered slide animation |
| SVGFilters | Existing | SVG squiggle filters |
| Skateboard | Existing | 3D skateboard model |
| ProductCard | New | Product grid item with hover effects |
| CartDrawer | New | Slide-in cart panel |
| ChatWidget | New | Floating AI chat interface |
| StarRating | New | Review stars display |
| QuantityStepper | New | +/- quantity input |
| FilterSidebar | New | Product filters panel |
| SearchBar | New | Product search input |
| SkeletonCard | New | Product loading skeleton |
| DataTable | New | Sortable, filterable table |
| StatCard | New | Dashboard KPI card |
| ChartCard | New | Recharts wrapper |
| Breadcrumb | New | Navigation breadcrumb |
| Hotspot | Existing | 3D model interactive points |

---

## 5. Animation Implementation Plan

### 5.1 Existing Animations (Preserve)

| Animation | Source | Implementation | Complexity |
|-----------|--------|----------------|------------|
| Squiggle filter | CSS `@keyframes squiggle` | SVG filter, `filter: url("#squiggle-N")` | Low |
| Skater scribble | CSS `stroke-dashoffset` | `transition: stroke-dashoffset 1s ease-in-out` | Low |
| Slide-in | CSS `@keyframes slide-in` | Custom class + IntersectionObserver | Low |
| Button cutout | CSS `::before/::after` | `clip-path` pseudo-elements | Low |
| Footer physics | Matter.js | Existing component, preserve | High |
| 3D skateboard | Three.js / R3F | Existing component, extend for other products | High |
| GSAP scroll | GSAP ScrollTrigger | Existing slices, preserve | High |

### 5.2 New Animations

| Animation | Library | Implementation | Complexity |
|-----------|---------|----------------|------------|
| Page load sequence | GSAP | `gsap.timeline()`, staggered reveals | Medium |
| Scroll-triggered reveals | Framer Motion | `useInView` + `motion.div` variants | Low |
| Card hover lift | CSS | `transform: translateY(-4px)`, `transition` | Low |
| Image hover zoom | CSS | `transform: scale(1.05)`, container `overflow-hidden` | Low |
| Cart drawer slide | Framer Motion | `AnimatePresence` + `motion.div` slide | Low |
| Cart badge bounce | CSS + Framer | `scale(1.3) → scale(1)` with spring | Low |
| Modal open/close | Framer Motion | `scale(0.95) → scale(1)` + overlay fade | Low |
| Toast slide-in | Framer Motion | `x: 100% → 0`, `opacity: 0 → 1` | Low |
| Tab content crossfade | Framer Motion | `AnimatePresence` mode="wait" | Low |
| 3D model float | CSS | `translateY(±10px)`, `3s ease-in-out infinite` | Low |
| AI chat open | Framer Motion | `scale(0) → scale(1)`, origin bottom-right | Low |
| AI typing dots | CSS | `animation: bounce 1s infinite` staggered | Low |
| Checkout progress | CSS | Width transition on step connector | Low |
| Loading shimmer | CSS | `linear-gradient` background position animation | Low |
| Stagger grid items | Framer Motion | `staggerChildren: 0.15` in parent | Low |
| Parallax image | GSAP ScrollTrigger | `yPercent` offset based on scroll | Medium |
| Quantity stepper | CSS | Smooth number transition | Low |
| Quick view open | Framer Motion | Overlay + modal scale animation | Low |
| Form error shake | CSS | `animation: shake 300ms` | Low |
| Password strength bar | CSS | Width + color transition | Low |
| Heart fill | CSS + Framer | `scale(1.3) → scale(1)` on toggle | Low |

### 5.3 Animation Tokens (CSS Custom Properties)

```css
:root {
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-micro: 150ms;
  --duration-standard: 300ms;
  --duration-dramatic: 600ms;
  --duration-cinematic: 1000ms;
}
```

---

## 6. Data Architecture

### 6.1 Product Data Model

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // 'bicycles' | 'ski-snow' | 'climbing' | 'running' | 'tennis' | 'swimming' | 'gym' | 'team-sports'
  subcategory: string;
  description: string;
  features: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  model3d?: string; // GLTF file path
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specifications: Record<string, string>;
  stock: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  weight: number; // kg
  dimensions: { length: number; width: number; height: number };
  createdAt: string;
}

interface ProductVariant {
  id: string;
  name: string;
  color?: { name: string; hex: string };
  size?: string;
  material?: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}
```

### 6.2 User & Auth Data Model

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'guest' | 'customer' | 'employee' | 'admin' | 'affiliate';
  avatar?: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  // Role-specific
  affiliateCode?: string;
  affiliateEarnings?: number;
  employeeId?: string;
}

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}
```

### 6.3 Order Data Model

```typescript
interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
}
```

### 6.4 Cart Data Model

```typescript
interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  variantName?: string;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  count: number;
}
```

---

## 7. API Routes

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Create account, return JWT |
| POST | /api/auth/login | Authenticate, return JWT |
| POST | /api/auth/logout | Clear cookie/token |
| POST | /api/auth/refresh | Refresh JWT token |
| GET | /api/auth/me | Get current user |

### Product Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/products | List products (with filters, sort, pagination) |
| GET | /api/products/[id] | Get single product |
| GET | /api/categories | List categories |
| GET | /api/brands | List brands |

### Order Routes (Protected)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/orders | List user orders |
| POST | /api/orders | Create order |
| GET | /api/orders/[id] | Get order details |
| PATCH | /api/orders/[id] | Update order status (admin/employee) |

### Cart Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/cart | Get cart (or localStorage fallback) |
| POST | /api/cart/items | Add item |
| PATCH | /api/cart/items | Update quantity |
| DELETE | /api/cart/items | Remove item |
| DELETE | /api/cart | Clear cart |

### AI Chat Route
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/chat | AI assistant response |

---

## 8. State Management Plan

### Zustand Stores

**authStore**:
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

**cartStore**:
```typescript
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotals: () => { subtotal: number; count: number; total: number };
}
```

**uiStore**:
```typescript
interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  toastQueue: Toast[];
  theme: 'light' | 'dark';
}
```

### React Query Keys
- `['products']` — Product catalog
- `['products', id]` — Single product
- `['categories']` — Categories
- `['orders']` — User orders
- `['orders', id]` — Single order
- `['user']` — Current user profile

---

## 9. Auth & Security Plan

### Authentication Flow
1. User registers/logs in via API
2. Server returns JWT access token (15 min expiry) + refresh token (7 day expiry, httpOnly cookie)
3. Access token stored in memory (Zustand)
4. Refresh token stored in httpOnly cookie
5. API calls include `Authorization: Bearer <token>` header
6. Token refresh happens automatically on 401 responses

### Role-Based Access Control (RBAC)
| Role | Permissions |
|------|-------------|
| Guest | Browse, cart, checkout (guest checkout) |
| Customer | All guest + orders, wishlist, addresses, dashboard |
| Employee | View orders, update status, view inventory |
| Admin | All employee + CRUD products, users, analytics, settings |
| Affiliate | Dashboard with referral stats, earnings, payout requests |

### Route Protection
- `/dashboard/*` — Customer+
- `/admin/*` — Admin only
- `/employee/*` — Employee+
- `/affiliate/*` — Affiliate+
- Middleware checks JWT + role before serving

### Security Measures
1. **Rate Limiting**: 
   - Auth routes: 5 requests/min per IP
   - API routes: 60 requests/min per user
   - Implementation: In-memory Map with TTL
2. **Input Sanitization**:
   - All user inputs sanitized with DOMPurify
   - Zod schema validation on all API inputs
3. **XSS Protection**:
   - Content-Type headers
   - DOMPurify for rendered HTML
   - CSP headers in next.config
4. **CSRF Protection**:
   - SameSite cookies
   - Custom header verification for state-changing ops
5. **Password Security**:
   - bcryptjs with salt rounds 12
   - Min password requirements enforced
6. **JWT Security**:
   - Short-lived access tokens (15 min)
   - Refresh rotation on use
   - Secure signing with HS256

---

## 10. AI Chat Implementation

### Architecture
- **Frontend**: ChatWidget component (floating, fixed position)
- **Backend**: Simple rule-based AI with product catalog context
- **Touchpoints**:
  1. Product finder (in /shop)
  2. Cart upsell (in cart drawer)
  3. Customer support (floating widget)

### Chat Flow
```
User message → Parse intent → Match product/rule → Generate response → Return
```

### Intents
- `find_product`: "I need running shoes" → Suggest products
- `compare`: "Compare these bikes" → Show comparison
- `cart_help`: "What's in my cart?" → Show cart summary
- `order_status`: "Where's my order?" → Ask for order number
- `general`: Fallback to FAQ responses

---

## 11. Seed Data Plan

### Product Catalog
- 32 products across 8 categories
- Each with variants, images, specs, reviews
- 3 featured products per category

### Users
- 1 admin user
- 1 employee user
- 2 customer users
- 1 affiliate user
- All with sample orders and data

### Orders
- 10+ sample orders across statuses
- Mix of product categories

---

## 12. Performance Plan

### Image Optimization
- Next.js Image component for all product images
- WebP format with fallbacks
- Responsive sizing with sizes prop
- Lazy loading below fold

### 3D Optimization
- Draco-compressed GLTF models
- LOD (Level of Detail) for distant models
- Suspense + loading fallbacks
- Canvas only renders when visible

### Code Splitting
- Dynamic imports for dashboard pages
- Separate chunks for 3D viewer
- Lazy load chart components

### Caching
- React Query staleTime: 5 min for products
- Static generation for product catalog
- ISR for homepage (if needed)

---

## 13. Build Configuration

### next.config.ts
```typescript
const nextConfig = {
  output: 'export', // Static export for deployment
  images: {
    unoptimized: true, // Required for static export
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};
```

### tailwind.config.ts (Extended)
- Add new brand colors for e-commerce (success, error, warning)
- Extend with shadcn/ui theme variables
- Keep existing fluid typography setup

---

## 14. Dependencies

### Install Commands
```bash
# shadcn/ui
npx shadcn add button input label select checkbox radio-group dialog sheet tabs accordion table card badge separator skeleton avatar tooltip dropdown-menu scroll-area slider switch form command calendar popover breadcrumb pagination progress textarea toggle

# State & data
npm install zustand @tanstack/react-query

# Animation
npm install framer-motion

# Charts
npm install recharts

# Auth & security
npm install bcryptjs jose dompurify

# Forms
npm install react-hook-form zod @hookform/resolvers

# Notifications
npm install react-hot-toast

# Icons
npm install lucide-react

# Existing already present: gsap @gsap/react three @react-three/fiber @react-three/drei matter-js
```

---

## 15. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Prismic removal breaks existing slices | High | Mock Prismic client with local data, maintain same API surface |
| 3D model performance | Medium | Optimize models, lazy load, add loading states |
| Auth complexity in static export | High | Use client-side auth with localStorage fallback, document server requirements |
| Cart persistence | Low | localStorage + Zustand, sync to server when authenticated |
| Dashboard data | Medium | Mock data layer, simulate API responses |
| Build size | Medium | Code splitting, dynamic imports, tree shaking |
