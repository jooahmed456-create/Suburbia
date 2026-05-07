import type { Product } from '../types';

export const categories = [
  { id: 'bicycles', name: 'Bicycles', slug: 'bicycles', icon: 'Bike' },
  { id: 'ski-snow', name: 'Ski & Snow', slug: 'ski-snow', icon: 'Snowflake' },
  { id: 'climbing', name: 'Climbing', slug: 'climbing', icon: 'Mountain' },
  { id: 'running', name: 'Running', slug: 'running', icon: 'Footprints' },
  { id: 'tennis', name: 'Tennis', slug: 'tennis', icon: 'CircleDot' },
  { id: 'swimming', name: 'Swimming', slug: 'swimming', icon: 'Waves' },
  { id: 'gym', name: 'Gym', slug: 'gym', icon: 'Dumbbell' },
  { id: 'team-sports', name: 'Team Sports', slug: 'team-sports', icon: 'Trophy' },
];

export const brands = ['Trek', 'Salomon', 'Nike', 'Adidas', 'Wilson', 'Speedo', 'Rogue', 'Patagonia', 'The North Face', 'Oakley'];

function createReview(userName: string, rating: number, comment: string, date: string) {
  return {
    id: `rev-${Math.random().toString(36).substr(2, 9)}`,
    userId: `user-${Math.random().toString(36).substr(2, 9)}`,
    userName,
    rating,
    title: rating >= 4 ? 'Great product!' : rating >= 3 ? 'Good, but...' : 'Disappointed',
    comment,
    date,
    helpful: Math.floor(Math.random() * 20),
  };
}

export const products: Product[] = [
  {
    id: 'trek-domane-sl6',
    slug: 'trek-domane-sl6',
    name: 'Trek Domane SL 6',
    brand: 'Trek',
    category: 'bicycles',
    subcategory: 'Road Bikes',
    description: 'The Domane SL 6 is an endurance road bike with a lightweight OCLV Carbon frame, IsoSpeed decoupler for smooth rides, and Shimano 105 Di2 electronic shifting. Built for long days in the saddle with all-day comfort.',
    features: ['OCLV Carbon frame', 'IsoSpeed decoupler', 'Shimano 105 Di2', 'Tubeless ready wheels', 'Internal cable routing'],
    price: 4299,
    compareAtPrice: 4599,
    currency: 'USD',
    images: ['/products/trek-domane.jpg'],
    variants: [
      { id: 'v1', name: 'Matte Deep Smoke', color: { name: 'Matte Deep Smoke', hex: '#3a3a3a' }, size: '54cm', price: 4299, stock: 5, sku: 'TREK-DSL6-54', images: ['/products/trek-domane.jpg'] },
      { id: 'v2', name: 'Matte Deep Smoke', color: { name: 'Matte Deep Smoke', hex: '#3a3a3a' }, size: '56cm', price: 4299, stock: 3, sku: 'TREK-DSL6-56', images: ['/products/trek-domane.jpg'] },
      { id: 'v3', name: 'Radioactive Coral', color: { name: 'Radioactive Coral', hex: '#ff6b6b' }, size: '54cm', price: 4299, stock: 2, sku: 'TREK-DSL6-54C', images: ['/products/trek-domane.jpg'] },
    ],
    rating: 4.7,
    reviewCount: 42,
    reviews: [
      createReview('Alex M.', 5, 'Incredible comfort on long rides. The IsoSpeed really makes a difference on rough roads.', '2024-12-15'),
      createReview('Sarah K.', 4, 'Great bike, smooth shifting. A bit pricey but worth it for the electronic groupset.', '2024-11-20'),
      createReview('James T.', 5, 'Best endurance bike I have owned. Handles beautifully and the carbon frame absorbs vibrations perfectly.', '2024-10-08'),
    ],
    specifications: { Frame: 'OCLV 500 Series Carbon', Groupset: 'Shimano 105 Di2 R7100', Wheels: 'Bontrager Paradigm SL', Weight: '8.9 kg', 'Max Tire Clearance': '38mm' },
    stock: 10,
    sku: 'TREK-DSL6',
    tags: ['road', 'carbon', 'electronic-shifting', 'endurance'],
    isFeatured: true,
    isNew: false,
    weight: 8.9,
    dimensions: { length: 170, width: 60, height: 110 },
    createdAt: '2024-01-15',
  },
  {
    id: 'trek-fuel-ex-9',
    slug: 'trek-fuel-ex-9',
    name: 'Trek Fuel EX 9.8 XT',
    brand: 'Trek',
    category: 'bicycles',
    subcategory: 'Mountain Bikes',
    description: 'The Fuel EX 9.8 combines a lightweight OCLV Mountain Carbon frame with a 150mm FOX Performance 36 fork and Shimano XT drivetrain. It is our most popular trail bike for a reason.',
    features: ['OCLV Mountain Carbon', 'FOX Performance 36 fork', 'Shimano XT 12-speed', 'RE:aktiv damper', 'Mino Link adjustable geometry'],
    price: 5999,
    currency: 'USD',
    images: ['/products/trek-fuel.jpg'],
    variants: [
      { id: 'v1', name: 'Matte Carbon Smoke', color: { name: 'Matte Carbon Smoke', hex: '#2a2a2a' }, size: 'M', price: 5999, stock: 4, sku: 'TREK-FEX98-M', images: ['/products/trek-fuel.jpg'] },
      { id: 'v2', name: 'Matte Carbon Smoke', color: { name: 'Matte Carbon Smoke', hex: '#2a2a2a' }, size: 'L', price: 5999, stock: 6, sku: 'TREK-FEX98-L', images: ['/products/trek-fuel.jpg'] },
    ],
    rating: 4.8,
    reviewCount: 38,
    reviews: [
      createReview('Mike R.', 5, 'This bike climbs like a goat and descends like a demon. The carbon frame makes it incredibly nimble.', '2024-12-01'),
      createReview('Laura B.', 4, 'Fantastic trail bike. The adjustable geometry is a game changer for different terrain.', '2024-11-15'),
    ],
    specifications: { Frame: 'OCLV Mountain Carbon', Fork: 'FOX Performance 36, 150mm', Shock: 'FOX Float X Performance', Groupset: 'Shimano XT M8100', Weight: '13.4 kg' },
    stock: 10,
    sku: 'TREK-FEX98',
    tags: ['mountain', 'carbon', 'trail', 'full-suspension'],
    isFeatured: true,
    isNew: true,
    weight: 13.4,
    dimensions: { length: 180, width: 70, height: 120 },
    createdAt: '2024-03-20',
  },
  {
    id: 'salomon-s-pro-100',
    slug: 'salomon-s-pro-100',
    name: 'Salomon S/Pro 100 Ski Boots',
    brand: 'Salomon',
    category: 'ski-snow',
    subcategory: 'Ski Boots',
    description: 'The S/Pro 100 delivers a perfect balance of performance and comfort with Coreframe technology, Sensifit shell, and Seamless Liner. Ideal for intermediate to advanced skiers.',
    features: ['Coreframe technology', 'Sensifit shell', 'Seamless Liner', 'My CustomFit 3D liner', '4 micro-adjust aluminum buckles'],
    price: 499,
    compareAtPrice: 599,
    currency: 'USD',
    images: ['/products/salomon-ski-boots.jpg'],
    variants: [
      { id: 'v1', name: 'Black/Red', color: { name: 'Black/Red', hex: '#1a1a1a' }, size: '26.5', price: 499, stock: 8, sku: 'SAL-SPRO100-265', images: ['/products/salomon-ski-boots.jpg'] },
      { id: 'v2', name: 'Black/Red', color: { name: 'Black/Red', hex: '#1a1a1a' }, size: '27.5', price: 499, stock: 5, sku: 'SAL-SPRO100-275', images: ['/products/salomon-ski-boots.jpg'] },
      { id: 'v3', name: 'Black/Red', color: { name: 'Black/Red', hex: '#1a1a1a' }, size: '28.5', price: 499, stock: 3, sku: 'SAL-SPRO100-285', images: ['/products/salomon-ski-boots.jpg'] },
    ],
    rating: 4.5,
    reviewCount: 67,
    reviews: [
      createReview('Chris P.', 5, 'Most comfortable boots I have ever owned. The heat moldable liner makes a huge difference.', '2024-12-10'),
      createReview('Anna W.', 4, 'Great performance for the price. Good response and the buckles are solid.', '2024-11-22'),
    ],
    specifications: { Flex: '100', Last: '100mm', Shell: 'Polyurethane', Liner: 'My CustomFit 3D', Weight: '1.8 kg/pair', 'Sole': 'GripWalk' },
    stock: 16,
    sku: 'SAL-SPRO100',
    tags: ['alpine', 'ski', 'performance', 'heat-moldable'],
    isFeatured: true,
    isNew: false,
    weight: 1.8,
    dimensions: { length: 40, width: 30, height: 35 },
    createdAt: '2024-02-10',
  },
  {
    id: 'burton-process-fv',
    slug: 'burton-process-fv',
    name: 'Burton Process Flying V Snowboard',
    brand: 'Burton',
    category: 'ski-snow',
    subcategory: 'Snowboards',
    description: 'The Process Flying V is a versatile twin-shaped board with a medium flex, perfect for park, all-mountain, and powder. The Flying V profile gives you the best of both rocker and camber.',
    features: ['Flying V profile', 'Twin shape', 'Super Fly II core', 'Squeezebox', 'The Channel mounting'],
    price: 549,
    currency: 'USD',
    images: ['/products/burton-snowboard.jpg'],
    variants: [
      { id: 'v1', name: 'Graphic', color: { name: 'Multicolor', hex: '#ff6b35' }, size: '155cm', price: 549, stock: 7, sku: 'BUR-PROCESS-155', images: ['/products/burton-snowboard.jpg'] },
      { id: 'v2', name: 'Graphic', color: { name: 'Multicolor', hex: '#ff6b35' }, size: '157cm', price: 549, stock: 4, sku: 'BUR-PROCESS-157', images: ['/products/burton-snowboard.jpg'] },
      { id: 'v3', name: 'Graphic', color: { name: 'Multicolor', hex: '#ff6b35' }, size: '159cm', price: 549, stock: 2, sku: 'BUR-PROCESS-159', images: ['/products/burton-snowboard.jpg'] },
    ],
    rating: 4.6,
    reviewCount: 54,
    reviews: [
      createReview('Tom H.', 5, 'This board does it all. Great in the park, stable at speed, and floats in powder.', '2024-12-05'),
      createReview('Lisa C.', 4, 'Really fun board. The Flying V profile makes it forgiving but still responsive.', '2024-11-18'),
    ],
    specifications: { Profile: 'Flying V', Shape: 'Twin', Flex: 'Medium', Core: 'Super Fly II 700G', Base: 'Sintered', Weight: '2.8 kg' },
    stock: 13,
    sku: 'BUR-PROCESS',
    tags: ['snowboard', 'all-mountain', 'park', 'twin'],
    isFeatured: false,
    isNew: true,
    weight: 2.8,
    dimensions: { length: 160, width: 30, height: 5 },
    createdAt: '2024-09-01',
  },
  {
    id: 'patagonia-refugee',
    slug: 'patagonia-refugee',
    name: 'Patagonia Refuge Climbing Harness',
    brand: 'Patagonia',
    category: 'climbing',
    subcategory: 'Harnesses',
    description: 'The Refuge is a versatile all-around harness with adjustable leg loops, 4 gear loops, and breathable mesh panels. Built for long multi-pitch routes and gym sessions alike.',
    features: ['Adjustable leg loops', '4 gear loops', 'Breathable mesh panels', 'Self-locking buckles', 'Haul loop'],
    price: 89,
    currency: 'USD',
    images: ['/products/patagonia-harness.jpg'],
    variants: [
      { id: 'v1', name: 'Forge Grey', color: { name: 'Forge Grey', hex: '#6b7280' }, size: 'S', price: 89, stock: 12, sku: 'PAT-REFUGE-S', images: ['/products/patagonia-harness.jpg'] },
      { id: 'v2', name: 'Forge Grey', color: { name: 'Forge Grey', hex: '#6b7280' }, size: 'M', price: 89, stock: 15, sku: 'PAT-REFUGE-M', images: ['/products/patagonia-harness.jpg'] },
      { id: 'v3', name: 'Forge Grey', color: { name: 'Forge Grey', hex: '#6b7280' }, size: 'L', price: 89, stock: 8, sku: 'PAT-REFUGE-L', images: ['/products/patagonia-harness.jpg'] },
    ],
    rating: 4.4,
    reviewCount: 89,
    reviews: [
      createReview('Sam D.', 4, 'Comfortable for long days. The mesh panels really help with ventilation.', '2024-12-12'),
      createReview('Jordan L.', 5, 'Best harness I have used at this price point. The gear loops are perfectly positioned.', '2024-11-05'),
    ],
    specifications: { 'Waist Size': 'S: 71-81cm, M: 81-91cm, L: 91-102cm', 'Leg Size': 'S: 48-56cm, M: 53-61cm, L: 58-66cm', Weight: '390g', 'Gear Loops': '4', 'Certification': 'UIAA/CE' },
    stock: 35,
    sku: 'PAT-REFUGE',
    tags: ['climbing', 'harness', 'trad', 'sport'],
    isFeatured: false,
    isNew: false,
    weight: 0.39,
    dimensions: { length: 40, width: 30, height: 8 },
    createdAt: '2024-01-20',
  },
  {
    id: 'nike-pegasus-41',
    slug: 'nike-pegasus-41',
    name: 'Nike Pegasus 41',
    brand: 'Nike',
    category: 'running',
    subcategory: 'Running Shoes',
    description: 'The Pegasus 41 features ReactX foam and Air Zoom units for responsive cushioning. A daily trainer that delivers comfort and durability mile after mile.',
    features: ['ReactX foam midsole', 'Air Zoom units', 'Engineered mesh upper', 'Durable rubber outsole', 'Reflective details'],
    price: 139,
    currency: 'USD',
    images: ['/products/nike-pegasus.jpg'],
    variants: [
      { id: 'v1', name: 'Black/White', color: { name: 'Black/White', hex: '#111111' }, size: 'US 9', price: 139, stock: 20, sku: 'NIK-PEG41-09', images: ['/products/nike-pegasus.jpg'] },
      { id: 'v2', name: 'Black/White', color: { name: 'Black/White', hex: '#111111' }, size: 'US 10', price: 139, stock: 15, sku: 'NIK-PEG41-10', images: ['/products/nike-pegasus.jpg'] },
      { id: 'v3', name: 'Volt/Black', color: { name: 'Volt/Black', hex: '#ccff00' }, size: 'US 9', price: 139, stock: 10, sku: 'NIK-PEG41-09V', images: ['/products/nike-pegasus.jpg'] },
      { id: 'v4', name: 'Volt/Black', color: { name: 'Volt/Black', hex: '#ccff00' }, size: 'US 10', price: 139, stock: 8, sku: 'NIK-PEG41-10V', images: ['/products/nike-pegasus.jpg'] },
    ],
    rating: 4.6,
    reviewCount: 234,
    reviews: [
      createReview('Emma J.', 5, 'My go-to daily trainer. The ReactX foam is noticeably more responsive than previous versions.', '2024-12-20'),
      createReview('Ryan G.', 4, 'Great shoe for easy miles and long runs. Comfortable right out of the box.', '2024-11-30'),
    ],
    specifications: { 'Heel Drop': '10mm', Weight: '266g', 'Midsole': 'ReactX foam', 'Upper': 'Engineered mesh', 'Outsole': 'Waffle rubber', 'Cushioning': 'Air Zoom + ReactX' },
    stock: 53,
    sku: 'NIK-PEG41',
    tags: ['running', 'daily-trainer', 'neutral', 'road'],
    isFeatured: true,
    isNew: true,
    weight: 0.27,
    dimensions: { length: 30, width: 12, height: 10 },
    createdAt: '2024-06-15',
  },
  {
    id: 'wilson-pro-staff',
    slug: 'wilson-pro-staff',
    name: 'Wilson Pro Staff 97 v14',
    brand: 'Wilson',
    category: 'tennis',
    subcategory: 'Tennis Rackets',
    description: 'The Pro Staff 97 v14 continues the legacy with a refined braid construction and softer feel. Precision and control for advanced players who command the court.',
    features: ['Braid 45 construction', 'String Mapping', 'Ergonomic end cap', 'Paradigm Bending', 'Classic Pro Staff feel'],
    price: 269,
    currency: 'USD',
    images: ['/products/wilson-racket.jpg'],
    variants: [
      { id: 'v1', name: 'Matte Black', color: { name: 'Matte Black', hex: '#1a1a1a' }, size: '4 3/8"', price: 269, stock: 6, sku: 'WIL-PS97-438', images: ['/products/wilson-racket.jpg'] },
      { id: 'v2', name: 'Matte Black', color: { name: 'Matte Black', hex: '#1a1a1a' }, size: '4 1/2"', price: 269, stock: 4, sku: 'WIL-PS97-450', images: ['/products/wilson-racket.jpg'] },
    ],
    rating: 4.7,
    reviewCount: 78,
    reviews: [
      createReview('David S.', 5, 'The feel on this racket is unmatched. Perfect for flat hitters who want control.', '2024-12-08'),
      createReview('Maria R.', 4, 'Beautiful racket with great control. Takes some time to get used to the lower power.', '2024-11-25'),
    ],
    specifications: { 'Head Size': '97 sq in', Weight: '315g (unstrung)', Balance: '31cm', 'String Pattern': '16x19', Length: '27in', Swingweight: '321' },
    stock: 10,
    sku: 'WIL-PS97',
    tags: ['tennis', 'control', 'advanced', 'classic'],
    isFeatured: false,
    isNew: false,
    weight: 0.32,
    dimensions: { length: 70, width: 25, height: 5 },
    createdAt: '2024-01-10',
  },
  {
    id: 'speedo-fastskin',
    slug: 'speedo-fastskin',
    name: 'Speedo Fastskin LZR Pure Intent 2.0',
    brand: 'Speedo',
    category: 'swimming',
    subcategory: 'Racing Suits',
    description: 'The LZR Pure Intent 2.0 is a technical racing suit with triple-fabric construction and targeted compression zones. Designed for elite swimmers chasing records.',
    features: ['Triple fabric construction', 'Targeted compression', 'Bonded seams', 'LZR Pulse+ fabric', 'Fina approved'],
    price: 399,
    currency: 'USD',
    images: ['/products/speedo-suit.jpg'],
    variants: [
      { id: 'v1', name: 'Black/Gold', color: { name: 'Black/Gold', hex: '#1a1a1a' }, size: '24', price: 399, stock: 5, sku: 'SPD-LZR-24', images: ['/products/speedo-suit.jpg'] },
      { id: 'v2', name: 'Black/Gold', color: { name: 'Black/Gold', hex: '#1a1a1a' }, size: '26', price: 399, stock: 3, sku: 'SPD-LZR-26', images: ['/products/speedo-suit.jpg'] },
      { id: 'v3', name: 'Navy/Red', color: { name: 'Navy/Red', hex: '#1e3a5f' }, size: '26', price: 399, stock: 4, sku: 'SPD-LZR-26N', images: ['/products/speedo-suit.jpg'] },
    ],
    rating: 4.8,
    reviewCount: 45,
    reviews: [
      createReview('Tyler B.', 5, 'Dropped 2 seconds in my 100 fly. The compression is incredible without restricting movement.', '2024-12-18'),
      createReview('Chloe K.', 5, 'Worth every penny for championship meets. The bonded seams are seamless against the skin.', '2024-11-28'),
    ],
    specifications: { Fabric: 'LZR Pulse+ (65% Nylon, 35% Lycra)', 'Fina Approval': 'Approved', Compression: 'Triple fabric zones', 'Seams': 'Thermo-bonded', 'Care': 'Rinse after use, hang dry' },
    stock: 12,
    sku: 'SPD-LZR',
    tags: ['swimming', 'racing', 'competition', 'tech-suit'],
    isFeatured: false,
    isNew: true,
    weight: 0.15,
    dimensions: { length: 30, width: 20, height: 2 },
    createdAt: '2024-08-01',
  },
  {
    id: 'rogue-echo-bike',
    slug: 'rogue-echo-bike',
    name: 'Rogue Echo Bike',
    brand: 'Rogue',
    category: 'gym',
    subcategory: 'Cardio Equipment',
    description: 'The Echo Bike is a heavy-duty air bike built for high-intensity training. The fan resistance increases with your output, making it perfect for HIIT and CrossFit workouts.',
    features: ['Heavy-duty steel construction', 'Belt drive system', 'LCD console', 'Adjustable seat', 'Wind guard included'],
    price: 795,
    currency: 'USD',
    images: ['/products/rogue-echo.jpg'],
    variants: [
      { id: 'v1', name: 'Black', color: { name: 'Black', hex: '#111111' }, price: 795, stock: 8, sku: 'ROG-ECHO-BLK', images: ['/products/rogue-echo.jpg'] },
    ],
    rating: 4.9,
    reviewCount: 312,
    reviews: [
      createReview('Marcus W.', 5, 'This bike will humble you. The harder you push, the harder it pushes back. Built like a tank.', '2024-12-22'),
      createReview('Nina P.', 5, 'Best air bike on the market. Smooth belt drive, stable platform, and the console tracks everything.', '2024-12-01'),
    ],
    specifications: { Frame: 'Steel', 'Drive System': 'Belt', Console: 'LCD (calories, distance, time, RPM)', 'Seat': 'Adjustable (height and fore/aft)', 'Footpegs': 'Standard', Weight: '51 kg' },
    stock: 8,
    sku: 'ROG-ECHO',
    tags: ['gym', 'cardio', 'hiit', 'air-bike'],
    isFeatured: true,
    isNew: false,
    weight: 51,
    dimensions: { length: 130, width: 60, height: 140 },
    createdAt: '2024-01-05',
  },
  {
    id: 'adidas-predator',
    slug: 'adidas-predator',
    name: 'Adidas Predator Elite FG',
    brand: 'Adidas',
    category: 'team-sports',
    subcategory: 'Soccer Cleats',
    description: 'The Predator Elite features a hybrid upper with Strikeskin rubber fins for elite ball control. Designed for players who dictate the tempo of the game.',
    features: ['Hybrid synthetic upper', 'Strikeskin rubber fins', 'Split outsole', 'Laceless closure', 'Primeknit collar'],
    price: 230,
    currency: 'USD',
    images: ['/products/adidas-predator.jpg'],
    variants: [
      { id: 'v1', name: 'Core Black/White', color: { name: 'Core Black/White', hex: '#111111' }, size: 'US 9', price: 230, stock: 12, sku: 'ADI-PRED-09', images: ['/products/adidas-predator.jpg'] },
      { id: 'v2', name: 'Core Black/White', color: { name: 'Core Black/White', hex: '#111111' }, size: 'US 10', price: 230, stock: 8, sku: 'ADI-PRED-10', images: ['/products/adidas-predator.jpg'] },
      { id: 'v3', name: 'Lucid Lemon', color: { name: 'Lucid Lemon', hex: '#fff44f' }, size: 'US 9', price: 230, stock: 5, sku: 'ADI-PRED-09Y', images: ['/products/adidas-predator.jpg'] },
    ],
    rating: 4.5,
    reviewCount: 156,
    reviews: [
      createReview('Carlos M.', 5, 'The grip on these is insane. I can curl the ball exactly where I want it. Worth every penny.', '2024-12-14'),
      createReview('Leo H.', 4, 'Great cleats with amazing touch. The laceless design takes some getting used to.', '2024-11-20'),
    ],
    specifications: { Upper: 'Hybrid synthetic with Strikeskin', Outsole: 'FG split outsole', Closure: 'Laceless', Collar: 'Primeknit', Weight: '220g', 'Stud Configuration': 'FG (Firm Ground)' },
    stock: 25,
    sku: 'ADI-PRED',
    tags: ['soccer', 'cleats', 'control', 'elite'],
    isFeatured: false,
    isNew: true,
    weight: 0.22,
    dimensions: { length: 32, width: 12, height: 10 },
    createdAt: '2024-07-10',
  },
  {
    id: 'oakley-flight-deck',
    slug: 'oakley-flight-deck',
    name: 'Oakley Flight Deck XM Goggles',
    brand: 'Oakley',
    category: 'ski-snow',
    subcategory: 'Goggles',
    description: 'The Flight Deck XM features a rimless design with Prizm lens technology for enhanced contrast and visibility. The oversized field of view lets you see everything on the mountain.',
    features: ['Rimless design', 'Prizm lens technology', 'OTG compatible', 'Triple-layer face foam', 'Silicone-lined strap'],
    price: 210,
    currency: 'USD',
    images: ['/products/oakley-goggles.jpg'],
    variants: [
      { id: 'v1', name: 'Matte Black / Prizm Jade', color: { name: 'Matte Black', hex: '#1a1a1a' }, price: 210, stock: 15, sku: 'OAK-FDXM-JAD', images: ['/products/oakley-goggles.jpg'] },
      { id: 'v2', name: 'Matte White / Prizm Sapphire', color: { name: 'Matte White', hex: '#f5f5f5' }, price: 210, stock: 10, sku: 'OAK-FDXM-SAP', images: ['/products/oakley-goggles.jpg'] },
    ],
    rating: 4.7,
    reviewCount: 198,
    reviews: [
      createReview('Ben K.', 5, 'The field of view is incredible. The Prizm lens makes everything pop in flat light conditions.', '2024-12-11'),
      createReview('Sophie A.', 4, 'Great goggles, no fogging issues. The OTG compatibility is perfect for glasses wearers.', '2024-11-15'),
    ],
    specifications: { 'Lens': 'Prizm', 'Frame': 'Rimless', 'Compatibility': 'OTG', 'Strap': 'Silicone-lined', 'Venting': 'Dual vented', 'Weight': '150g' },
    stock: 25,
    sku: 'OAK-FDXM',
    tags: ['ski', 'snowboard', 'goggles', 'prizm'],
    isFeatured: false,
    isNew: false,
    weight: 0.15,
    dimensions: { length: 20, width: 10, height: 8 },
    createdAt: '2024-02-15',
  },
  {
    id: 'tnf-summit',
    slug: 'tnf-summit',
    name: 'The North Face Summit Series FUTURELIGHT Jacket',
    brand: 'The North Face',
    category: 'climbing',
    subcategory: 'Jackets',
    description: 'The Summit Series FUTURELIGHT jacket is a waterproof, breathable hardshell designed for alpine climbing. The nanospinning technology creates air-permeable protection.',
    features: ['FUTURELIGHT membrane', 'Nano-spun technology', 'Helmet-compatible hood', 'Pit-zip vents', 'Harness-compatible pockets'],
    price: 450,
    currency: 'USD',
    images: ['/products/tnf-jacket.jpg'],
    variants: [
      { id: 'v1', name: 'TNF Black', color: { name: 'TNF Black', hex: '#111111' }, size: 'M', price: 450, stock: 7, sku: 'TNF-SUMMIT-M', images: ['/products/tnf-jacket.jpg'] },
      { id: 'v2', name: 'TNF Black', color: { name: 'TNF Black', hex: '#111111' }, size: 'L', price: 450, stock: 5, sku: 'TNF-SUMMIT-L', images: ['/products/tnf-jacket.jpg'] },
      { id: 'v3', name: 'Summit Gold', color: { name: 'Summit Gold', hex: '#f59e0b' }, size: 'M', price: 450, stock: 3, sku: 'TNF-SUMMIT-MG', images: ['/products/tnf-jacket.jpg'] },
    ],
    rating: 4.6,
    reviewCount: 73,
    reviews: [
      createReview('Alex R.', 5, 'Breathable enough for high-output climbing while keeping me dry in heavy rain. The hood fits over my helmet perfectly.', '2024-12-16'),
      createReview('Kate L.', 4, 'Lightweight and packable for the protection it offers. The pocket placement works great with a harness.', '2024-11-10'),
    ],
    specifications: { 'Membrane': 'FUTURELIGHT 3L', 'Waterproof Rating': '20,000mm', 'Breathability': '15,000g/m2/24h', Weight: '410g', 'Hood': 'Helmet-compatible', Pockets: '2 harness-compatible chest' },
    stock: 15,
    sku: 'TNF-SUMMIT',
    tags: ['climbing', 'alpine', 'waterproof', 'hardshell'],
    isFeatured: false,
    isNew: false,
    weight: 0.41,
    dimensions: { length: 40, width: 30, height: 10 },
    createdAt: '2024-03-01',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function filterProducts(filters: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
}): Product[] {
  let result = [...products];

  if (filters.category && filters.category !== 'all') {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.brand) {
    result = result.filter(p => p.brand === filters.brand);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(p => p.price <= filters.maxPrice!);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  switch (filters.sort) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return result;
}
