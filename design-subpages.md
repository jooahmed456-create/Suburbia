Suburbia Sports E-Commerce Platform — Subpages Design Document

---

## Product Catalog Page (/shop)

### Purpose
Browse and filter products across all sports categories. The primary shopping interface.

### Layout & Style
- **Background**: `bg-brand-gray bg-texture`
- **Padding**: `~py-8/12` below header
- **Layout**: `grid-cols-1 lg:grid-cols-[240px,1fr]`, `gap-8`

### Filter Sidebar (Left)
- **Width**: `240px`, sticky `top-24`
- **Background**: `bg-white`, `rounded-xl`, `shadow-sm`
- **Padding**: `~p-4/6`
- **Sections**:
  - Category filter: Checkbox list with counts
  - Price range: Dual-handle slider, `bg-brand-lime` thumb
  - Brand filter: Checkbox list
  - Rating filter: Star ratings
  - Availability: Toggle switches

### Product Grid (Right)
- **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-4`
- **Results count**: `font-mono`, `text-sm`, `text-zinc-500`
- **Sort dropdown**: Select input, `bg-white`, `border-zinc-200`
- **Pagination**: Numbered pages + prev/next, `font-mono`

### Product Cards
- Same as homepage ProductGrid cards
- **Quick actions**: Heart (wishlist) and Eye (quick view) icons on hover
- **Overlay**: `opacity-0` → `opacity-1` on hover, `bg-black/30`

### Interactions
- Filter change: Products animate with `fade-up` stagger, `200ms`
- Sort change: Grid reorders with `layout` animation
- Pagination: Smooth scroll to top, `300ms`
- Quick view: Modal opens with product preview
- Wishlist: Heart fills, `scale(1.3) → scale(1)`, `200ms`, `bounce-out`

### Empty State
- Icon: `SearchX`, `text-zinc-300`, `~w-16/24`
- Message: "No products match your filters"
- Action: "Clear Filters" button, `bg-brand-lime`

---

## Product Detail Page (/products/:id)

### Purpose
Showcase individual product with 3D viewer, variants, details, and purchase flow.

### Layout & Style
- **Background**: `bg-brand-gray bg-texture`
- **Padding**: `~py-8/12`
- **Breadcrumb**: `text-sm`, `text-zinc-500`, `font-mono`

### Top Section: 3D Viewer + Product Info
- **Layout**: `grid-cols-1 lg:grid-cols-2`, `gap-8 lg:gap-12`

#### 3D Viewer (Left)
- **Container**: `aspect-square`, `bg-white`, `rounded-2xl`, `shadow-md`, `overflow-hidden`
- **3D Canvas**: Full container, `touch-action: none`
- **Controls**:
  - Rotation hint: `opacity-60`, `text-xs`, `font-mono`, bottom-left
  - Zoom: Mouse wheel or pinch
  - Reset view: Icon button, top-right
  - Fullscreen: Icon button, top-right
- **Hotspots**: Interactive points on model, tooltip on hover
- **Variant selector**: Swatch buttons below viewer (color, material)

#### Product Info (Right)
- **Brand**: `text-xs`, `uppercase`, `text-zinc-500`, `tracking-wider`
- **Name**: `font-sans`, `~text-2xl/4xl`, `text-zinc-800`
- **Rating**: Stars + review count, `text-sm`
- **Price**: `font-mono`, `~text-3xl/4xl`
  - Original: `line-through text-zinc-400`
  - Sale: `text-brand-orange`
- **Stock**: Badge — in stock / low stock / out of stock
- **Description**: `~text-base/lg`, `text-zinc-600`, `leading-relaxed`
- **Variants**:
  - Color: Swatch buttons, `~w-8/10 ~h-8/10`, `rounded-full`, `border-2`, selected has `ring-2 ring-brand-purple`
  - Size: Button group, `bg-white`, `border`, `rounded-lg`, selected `bg-brand-purple text-white`
- **Quantity**: Stepper component
- **Actions**:
  - "Add to Cart": Primary button, `w-full`, `bg-brand-lime`
  - "Add to Wishlist": Secondary button, `w-full`, `border`, `icon:heart`
  - "Buy Now": Tertiary button, `w-full`, `bg-brand-purple text-white`
- **Shipping**: `text-sm`, `text-zinc-500`, "Free shipping over $100"
- **Trust badges**: Icons for secure checkout, returns, warranty

### Tabs Section
- **Tab nav**: `border-b border-zinc-200`, `flex`, `gap-6`
- **Tab item**: `~py-3/4`, `font-mono`, `text-sm`, active has `border-b-2 border-brand-purple`
- **Content**: `~py-6/8`

#### Tab: Description
- Rich text description
- Feature bullets
- Material/specs table

#### Tab: Specifications
- Table: `font-mono`, `text-sm`, alternating row backgrounds
- Two-column layout on desktop

#### Tab: Reviews
- Average rating summary
- Review cards: `bg-white`, `rounded-xl`, `~p-4/6`
  - User avatar, name, date, stars, comment
- "Write a Review" button, `bg-brand-lime`

#### Tab: 3D Model Info
- Material details
- Dimensions
- Care instructions

### Interactions
- 3D viewer: Drag to rotate, scroll to zoom, pinch on mobile
- Variant change: Model texture updates with `300ms` crossfade
- Add to cart: Button pulse, cart drawer slides in, toast notification
- Tab switch: Content crossfade, `200ms`
- Image gallery (if present): Thumbnails with active state, click to swap main image

---

## Cart Page (/cart)

### Purpose
Review cart items, adjust quantities, and proceed to checkout.

### Layout & Style
- **Background**: `bg-brand-gray bg-texture`
- **Padding**: `~py-8/12`
- **Layout**: `grid-cols-1 lg:grid-cols-[1fr,380px]`, `gap-8`

### Cart Items (Left)
- **Header**: "Shopping Cart" + item count, `font-sans`, `~text-2xl/3xl`
- **Item list**: Vertical stack, `gap-4`

#### Cart Item Card
- **Layout**: `flex`, `gap-4`, `bg-white`, `rounded-xl`, `~p-4/6`
- **Image**: `~w-20/24`, `aspect-square`, `rounded-lg`, `object-cover`
- **Details**:
  - Name: `font-sans`, `~text-base/lg`
  - Variant: `text-sm`, `text-zinc-500`, `font-mono`
  - Price: `font-mono`, `~text-lg/xl`
- **Quantity**: Stepper component
- **Subtotal**: `font-mono`, `text-lg`
- **Remove**: Trash icon, `text-zinc-400 hover:text-red-500`

### Cart Summary (Right)
- **Container**: `bg-white`, `rounded-xl`, `shadow-sm`, `~p-4/6`, `sticky top-24`
- **Header**: "Order Summary", `font-sans`, `~text-lg/xl`
- **Line items**:
  - Subtotal: `flex justify-between`, `font-mono`
  - Shipping: "Calculated at checkout" or amount
  - Tax: "Calculated at checkout"
  - Discount: Input field + "Apply" button
- **Total**: `font-sans`, `~text-xl/2xl`, `border-t`, `pt-4`
- **Actions**:
  - "Checkout": Primary button, `w-full`, `bg-brand-lime`
  - "Continue Shopping": Ghost button, `w-full`
- **Trust badges**: Small icons + text, `text-xs`

### Interactions
- Quantity change: Item subtotal updates, cart total animates
- Remove item: Item slides out (`translateX(-100%)`, `300ms`), list reflows
- Empty cart: Illustration + "Start Shopping" CTA
- Discount apply: Loading state, success/error message
- Cart persistence: LocalStorage + server sync

---

## Checkout Page (/checkout)

### Purpose
Multi-step checkout flow: shipping, payment, review, confirmation.

### Layout & Style
- **Background**: `bg-white`
- **Padding**: `~py-8/12`
- **Max-width**: `max-w-3xl mx-auto`
- **Layout**: Single column, centered

### Progress Indicator
- **Steps**: Cart → Shipping → Payment → Review → Confirmation
- **Style**: Horizontal bar, `flex`, `gap-2`
- **Completed**: `bg-brand-lime`, `text-zinc-800`
- **Current**: `bg-brand-purple`, `text-white`
- **Upcoming**: `bg-zinc-200`, `text-zinc-500`
- **Connector line**: `h-1`, `bg-zinc-200`, active `bg-brand-lime`

### Step 1: Shipping Information
- **Fields**:
  - Email: Required, validation
  - First name, Last name
  - Address line 1, line 2
  - City, State/Province, ZIP/Postal code, Country (select)
  - Phone number
- **Layout**: `grid-cols-1 md:grid-cols-2` for side-by-side fields
- **Continue**: Primary button, `w-full`, `bg-brand-lime`

### Step 2: Shipping Method
- **Options**: Radio cards, `bg-white`, `border`, `rounded-xl`, `~p-4/6`
  - Standard, Express, Overnight
  - Price and estimated delivery
- **Selected**: `border-brand-purple`, `ring-2 ring-brand-purple/20`

### Step 3: Payment
- **Payment methods**: Tabs — Credit Card, PayPal, Apple Pay
- **Credit Card form**:
  - Card number: Input with card type icon
  - Expiry, CVV: Side by side
  - Name on card
- **Security**: "Secure 256-bit SSL encrypted" badge

### Step 4: Review
- **Order summary**: Collapsible, shows items
- **Shipping address**: Display with "Edit" link
- **Payment method**: Display with "Edit" link
- **Totals**: Same as cart summary
- **Place Order**: Primary button, `bg-brand-orange`, `w-full`

### Step 5: Confirmation
- **Success icon**: Checkmark in circle, `text-green-500`, `~w-16/24`
- **Message**: "Order Confirmed!", `font-sans`, `~text-2xl/3xl`
- **Order number**: `font-mono`, `bg-brand-lime`, `inline-block`, `~px-3/4 ~py-1/2`, `rounded`
- **Details**: Estimated delivery, email confirmation
- **Actions**:
  - "Continue Shopping": Primary button
  - "View Order": Secondary button
- **Order summary**: Same collapsible format

### Interactions
- Step navigation: Back/continue buttons
- Form validation: Real-time, `border-red-500`, error messages below fields
- Place order: Loading spinner, `3000ms` simulated processing, then confirmation
- Step transitions: Content crossfade, `300ms`

---

## Authentication Pages

### Login Page (/login)

**Layout & Style:**
- **Background**: `bg-brand-pink bg-texture`
- **Min-height**: `min-h-dvh`
- **Layout**: Centered card, `max-w-md mx-auto`
- **Card**: `bg-white`, `rounded-2xl`, `shadow-lg`, `~p-8/12`

**Content:**
- **Header**: "Welcome Back", `font-sans`, `~text-2xl/3xl`, `text-center`
- **Subheader**: "Sign in to your account", `text-zinc-500`, `text-center`
- **Form**:
  - Email: Text input
  - Password: Text input with show/hide toggle
  - "Remember me": Checkbox
  - "Forgot password?": Link, `text-brand-blue`
  - "Sign In": Primary button, `w-full`, `bg-brand-lime`
- **Divider**: "or continue with", `text-zinc-400`, `text-sm`
- **Social login**: Google, Apple buttons, `w-full`, `border`, `rounded-lg`
- **Footer**: "Don't have an account? Sign up", `text-center`

**Interactions:**
- Form validation: Real-time on blur
- Submit: Loading state, spinner in button
- Error: Shake animation on card, `300ms`, error message appears
- Success: Redirect to intended page or dashboard

### Register Page (/register)

**Layout & Style:**
- Same as login page structure

**Content:**
- **Header**: "Create Account", `font-sans`, `~text-2xl/3xl`
- **Form**:
  - First name, Last name
  - Email
  - Password (with strength indicator)
  - Confirm password
  - "I agree to Terms & Privacy Policy": Checkbox
  - "Create Account": Primary button
- **Footer**: "Already have an account? Sign in"

**Password Strength Indicator:**
- Bar: `h-1`, `rounded-full`, segments
- Weak: `bg-red-500`
- Medium: `bg-yellow-500`
- Strong: `bg-green-500`
- Label: `text-xs`, `font-mono`

### Forgot Password Page (/forgot-password)

**Content:**
- **Header**: "Reset Password"
- **Form**: Email input + "Send Reset Link" button
- **Success**: "Check your email for instructions"

---

## User Dashboards

### Customer Dashboard (/dashboard)

**Layout & Style:**
- **Background**: `bg-brand-gray bg-texture`
- **Layout**: `grid-cols-1 lg:grid-cols-[260px,1fr]`, `gap-8`

#### Sidebar
- **Container**: `bg-white`, `rounded-xl`, `shadow-sm`, `~p-4/6`, `sticky top-24`
- **User info**: Avatar, name, email, `text-sm`
- **Nav**: Vertical list, `gap-2`
  - Dashboard (active): `bg-brand-purple text-white`, `rounded-lg`, `~px-3/4 ~py-2/3`
  - Orders: `hover:bg-zinc-100`
  - Addresses: `hover:bg-zinc-100`
  - Wishlist: `hover:bg-zinc-100`
  - Settings: `hover:bg-zinc-100`
  - Logout: `text-red-500`, `hover:bg-red-50`

#### Dashboard Home
- **Welcome**: "Hello, [Name]!", `font-sans`, `~text-xl/2xl`
- **Stats cards**: `grid-cols-2 md:grid-cols-4`, `gap-4`
  - Total orders, Total spent, Wishlist items, Points
  - Card: `bg-white`, `rounded-xl`, `~p-4/6`, `shadow-sm`
  - Value: `font-mono`, `~text-2xl/3xl`
  - Label: `text-sm`, `text-zinc-500`
- **Recent orders**: Table, `bg-white`, `rounded-xl`, `shadow-sm`
  - Columns: Order #, Date, Status, Total, Actions
  - Status badges: Color-coded
  - "View All" link
- **Recommended products**: Product cards, 4 items

### Orders Page (/dashboard/orders)

**Content:**
- **Header**: "My Orders", `font-sans`, `~text-xl/2xl`
- **Filter**: Status dropdown, date range
- **Table**:
  - Order #, Date, Items, Total, Status, Actions
  - Status: `bg-green-100 text-green-700` (delivered), `bg-blue-100 text-blue-700` (shipped), `bg-yellow-100 text-yellow-700` (processing)
- **Order detail modal**: Full order info, items, shipping, tracking

### Wishlist Page (/dashboard/wishlist)

**Content:**
- **Header**: "My Wishlist"
- **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-4`
- **Cards**: Product cards with "Add to Cart" and "Remove" buttons
- **Empty**: Heart icon + "Your wishlist is empty" + "Start Shopping"

### Addresses Page (/dashboard/addresses)

**Content:**
- **Header**: "My Addresses"
- **Cards**: Address cards, `bg-white`, `rounded-xl`, `~p-4/6`
  - Default badge
  - Edit/Delete buttons
- **Add Address**: "+ Add New Address" button, `border-dashed`

### Settings Page (/dashboard/settings)

**Content:**
- **Header**: "Account Settings"
- **Tabs**: Profile, Password, Notifications, Privacy
- **Profile tab**:
  - Avatar upload
  - Name, email, phone
  - "Save Changes" button
- **Password tab**:
  - Current password, new password, confirm
- **Notifications**: Toggle switches for email/push preferences

---

## Admin Dashboard (/admin)

**Layout & Style:**
- **Background**: `bg-zinc-100`
- **Layout**: `grid-cols-1 lg:grid-cols-[260px,1fr]`, `gap-0` (full height)
- **Sidebar**: `bg-zinc-900`, `text-white`, `h-dvh`, `sticky top-0`

### Admin Sidebar
- **Logo**: White version, `~h-8/12`
- **Nav sections**:
  - Overview
  - Products (with sub-items: All, Categories, Inventory)
  - Orders
  - Customers
  - Analytics
  - Marketing
  - Settings
- **Nav item**: `~px-4/6 ~py-3/4`, `rounded-lg`
  - Active: `bg-brand-purple`
  - Hover: `bg-white/10`

### Admin Overview
- **KPI cards**: `grid-cols-2 lg:grid-cols-4`, `gap-4`
  - Revenue, Orders, Customers, Conversion rate
  - Card: `bg-white`, `rounded-xl`, `~p-4/6`, `shadow-sm`
  - Trend: `text-green-500` (up) or `text-red-500` (down), `text-sm`
- **Revenue chart**: Line chart, `bg-white`, `rounded-xl`, `~p-4/6`, `h-64`
- **Recent orders**: Table, `bg-white`, `rounded-xl`
- **Top products**: Bar chart or table

### Products Management (/admin/products)
- **Header**: "Products" + "Add Product" button, `bg-brand-lime`
- **Table**: `bg-white`, `rounded-xl`, `shadow-sm`
  - Image, Name, SKU, Price, Stock, Status, Actions
  - Bulk actions: Checkbox selection
  - Actions: Edit, Duplicate, Delete
- **Filters**: Search, category, stock status

### Orders Management (/admin/orders)
- **Header**: "Orders"
- **Table**: Order #, Customer, Date, Total, Status, Actions
- **Status update**: Dropdown in table
- **Bulk actions**: Update status, print labels

### Customers (/admin/customers)
- **Header**: "Customers"
- **Table**: Name, Email, Orders, Total spent, Joined, Actions
- **Customer detail**: Modal with order history, profile

### Analytics (/admin/analytics)
- **Charts**: Revenue, orders, traffic, conversion funnels
- **Date range picker**: `bg-white`, `rounded-lg`
- **Export**: "Export CSV" button

---

## Employee Dashboard (/employee)

**Layout & Style:**
- Similar to admin but with limited scope
- **Background**: `bg-brand-gray bg-texture`

### Employee Pages
- **Orders processing**: View and update order statuses
- **Inventory**: Stock levels, restock alerts
- **Customer support**: Ticket queue, chat history
- **Shipments**: Print labels, update tracking

---

## Affiliate Dashboard (/affiliate)

**Layout & Style:**
- **Background**: `bg-brand-gray bg-texture`

### Affiliate Pages
- **Overview**: Referral link, clicks, conversions, earnings
- **KPIs**: Total clicks, Conversion rate, Commission earned, Pending
- **Referral link**: Copy-to-clipboard button, `bg-brand-lime`
- **Performance chart**: Line chart, clicks vs conversions
- **Payouts**: History, request payout button
- **Marketing materials**: Banners, logos, product links

---

## Quick View Modal

**Layout & Style:**
- **Overlay**: `bg-black/50 backdrop-blur-sm`
- **Modal**: `max-w-4xl`, `w-full`, `bg-white`, `rounded-2xl`, `shadow-xl`
- **Layout**: `grid-cols-1 md:grid-cols-2`, `gap-6`
- **Image/3D**: Left side, `aspect-square`
- **Info**: Right side, product details + add to cart
- **Close**: X button, top-right, `bg-zinc-100 hover:bg-zinc-200`

**Interactions:**
- Open: Overlay `opacity 0 → 1`, modal `scale(0.95) → scale(1)`, `300ms`
- Close: Reverse, `200ms`
- Click outside: Closes modal

---

## AI Assistant Pages/Flows

### Product Finder (Embedded in Shop)
- **Trigger**: "Find Your Gear" button, `bg-brand-purple text-white`
- **Interface**: Slide-in panel or modal
- **Conversation**:
  - AI: "What sport are you shopping for?"
  - User: Select or type
  - AI: "What's your skill level?"
  - AI: "Any specific brand preference?"
  - AI: Suggests 3 products with links

### Cart Upsell (Embedded in Cart)
- **Trigger**: When cart has items
- **Message**: "Complete your setup with [related product]"
- **Display**: Small product card in cart drawer
- **Action**: "Add" button

### Customer Support (Chat Widget)
- **Position**: Fixed bottom-right
- **Interface**: Chat bubble panel
- **Capabilities**:
  - Order status lookup
  - Shipping questions
  - Product recommendations
  - Return policy info
  - Live handoff to human support

---

## Static Pages

### About Page (/about)
- **Hero**: Brand story, large heading
- **Mission section**: Text + image
- **Values**: Grid of 4 values with icons
- **Team**: Team photos with bios
- **Sustainability**: Environmental commitments

### Contact Page (/contact)
- **Layout**: `grid-cols-1 lg:grid-cols-2`, `gap-8`
- **Form**: Name, email, subject, message + "Send" button
- **Info**: Address, phone, email, hours
- **Map**: Embedded map (static image or iframe)

### FAQ Page (/faq)
- **Header**: "Frequently Asked Questions"
- **Accordion**: Categories — Shipping, Returns, Products, Account
- **Accordion item**: Question, chevron icon, expandable answer
- **Still need help?**: "Contact Us" CTA

### Shipping & Returns (/shipping-returns)
- **Shipping info**: Methods, costs, times
- **Returns policy**: Conditions, process, timeline
- **Tracking**: Order number input + "Track" button

### Size Guide (/size-guide)
- **Category tabs**: Shoes, Clothing, Equipment
- **Tables**: Size conversions, measurement guides
- **How to measure**: Illustration + instructions

---

## Toast Notifications

**Layout & Style:**
- **Position**: `fixed top-4 right-4 z-80`
- **Container**: `max-w-sm`, `bg-white`, `rounded-xl`, `shadow-lg`, `~p-4/6`
- **Types**:
  - Success: `border-l-4 border-green-500`
  - Error: `border-l-4 border-red-500`
  - Info: `border-l-4 border-blue-500`
  - Warning: `border-l-4 border-yellow-500`
- **Content**: Icon + message + close button
- **Auto-dismiss**: `3000ms` (except errors)

**Interactions:**
- Enter: `translateX(100%) → translateX(0)`, `opacity 0 → 1`, `300ms`
- Exit: `translateX(0) → translateX(100%)`, `200ms`
- Stacking: `gap-2`, new toasts appear below

---

## Loading States

### Page Loading
- **Skeleton screen**: Approximates page layout with animated shimmer
- **Header**: Static, always visible
- **Content**: Gray blocks matching component shapes

### Data Loading
- **Table**: Skeleton rows, `4-6` rows
- **Cards**: Skeleton cards with image placeholder
- **Chart**: Skeleton chart area

### Action Loading
- **Button**: Spinner replaces text, `disabled`
- **Form**: Fields disabled, submit button loading
- **Card**: Overlay with centered spinner
