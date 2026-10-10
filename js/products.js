/* =====================================================================
   ZAPATOS — Product & content data
   ---------------------------------------------------------------------
   Every grid, carousel and product page is rendered from this file.
   To use real products: replace the SEED list below (or the generated
   PRODUCTS array) with your own data and swap the image URLs.
   ===================================================================== */

/* ---------- Price helper: 2650 -> "2,650.0৳" ---------- */
function formatPrice(n) {
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + '৳';
}

/* ---------- PLACEHOLDER IMAGES ----------
   Sneaker photos come from Unsplash (free licence). Swap these for your
   own product shots later. If any photo fails to load, js/main.js
   automatically shows assets/img/placeholder-shoe.svg instead. */
const UNSPLASH = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const SHOE_PHOTOS = [
  '1542291026-7eec264c27ff', '1606107557195-0e29a4b5b4aa', '1595950653106-6c9ebd614d3a',
  '1600185365483-26d7a4cc7519', '1608231387042-66d1773070a5', '1549298916-b41d501d3772',
  '1560769629-975ec94e6a86', '1525966222134-fcfa99b8ae77', '1491553895911-0055eca6402d',
  '1460353581641-37baddab0fa2', '1595341888016-a392ef81b7de', '1562183241-b937e95585b6',
  '1539185441755-769473a23570', '1552346154-21d32810aba3', '1556906781-9a412961c28c',
  '1543508282-6319a3e2621f', '1600269452121-4f2416e55c28', '1605348532760-6753d2c43329',
  '1607522370275-f14206abe5d3', '1514989940723-e8e51635b782', '1584735175315-9d5df23860e6'
];

/* Slides & accessories use small inline SVG illustrations (no network
   needed). Replace them with real photos when you have them. */
function svgData(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function slideArt(strap, sole, bg = '#ffffff', angle = 0) {
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="${bg}"/>
  <g transform="rotate(${angle} 300 300)">
    <ellipse cx="300" cy="420" rx="230" ry="26" fill="#000" opacity=".08"/>
    <path d="M90 380c0-40 40-62 110-66l230-10c60-2 90 26 90 56 0 30-24 46-70 48L170 420c-50 2-80-12-80-40z" fill="${sole}"/>
    <path d="M90 372c0-36 40-56 110-60l230-10c60-2 90 22 90 50" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="6"/>
    <path d="M220 330c-6-80 40-130 130-136 70-4 110 40 112 104l-246 16z" fill="${strap}"/>
    <path d="M250 260h170" stroke="#fff" stroke-opacity=".35" stroke-width="10" stroke-linecap="round"/>
    <text x="340" y="300" font-family="Georgia,serif" font-weight="700" font-size="34" fill="#fff" fill-opacity=".85" text-anchor="middle">Z</text>
  </g></svg>`);
}
function accessoryArt(kind, color, bg = '#ffffff') {
  const shapes = {
    cleaner: `<rect x="240" y="150" width="120" height="300" rx="26" fill="${color}"/>
      <rect x="270" y="105" width="60" height="55" rx="8" fill="#222"/>
      <rect x="255" y="250" width="90" height="110" rx="6" fill="#fff"/>
      <text x="300" y="300" font-family="Georgia,serif" font-weight="700" font-size="30" text-anchor="middle" fill="#222">Z</text>
      <text x="300" y="335" font-family="Arial" font-size="13" text-anchor="middle" fill="#555">CLEAN</text>`,
    brush: `<rect x="130" y="280" width="250" height="60" rx="30" fill="${color}"/>
      <rect x="370" y="250" width="110" height="80" rx="12" fill="#c8a27a"/>
      ${Array.from({length: 9}, (_, i) => `<rect x="${378 + i * 11}" y="330" width="5" height="45" fill="#333"/>`).join('')}`,
    laces: `<path d="M150 200c120 0 120 200 240 200s120-200 60-200-60 200-180 200" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
      <rect x="138" y="186" width="26" height="12" rx="4" fill="#222"/><rect x="436" y="186" width="26" height="12" rx="4" fill="#222"/>`,
    socks: `<path d="M240 120h110v220c0 30 20 40 60 50 40 10 50 70 0 80l-120 10c-40 4-60-20-60-60z" fill="${color}"/>
      <rect x="240" y="120" width="110" height="36" fill="#222" opacity=".85"/>
      <text x="295" y="146" font-family="Georgia,serif" font-weight="700" font-size="24" text-anchor="middle" fill="#fff">Z</text>`,
    insole: `<path d="M300 110c70 0 100 70 100 150 0 70-30 100-30 160 0 50-30 80-70 80s-70-30-70-80c0-60-30-90-30-160 0-80 30-150 100-150z" fill="${color}"/>
      <path d="M300 150c40 0 60 50 60 110" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>`,
    protector: `<rect x="245" y="150" width="110" height="300" rx="20" fill="${color}"/>
      <rect x="275" y="110" width="50" height="50" rx="6" fill="#ddd"/><rect x="290" y="90" width="40" height="22" rx="4" fill="#222"/>
      <path d="M300 250l45 18v35c0 30-20 48-45 58-25-10-45-28-45-58v-35z" fill="#fff"/>`
  };
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="${bg}"/>
    <ellipse cx="300" cy="490" rx="170" ry="18" fill="#000" opacity=".07"/>${shapes[kind]}</svg>`);
}

/* ---------- Category definitions ---------- */
const CATEGORIES = {
  'mens-sneakers':   { name: "Men's Sneakers",   short: 'MH', banner: 'photo', subtitle: 'Zapatos offers a wide selection of top sneakers, running shoes and stylish kicks…' },
  'womens-sneakers': { name: "Women's Sneakers", short: 'WM', banner: 'black', subtitle: "Shop through our latest selection of Women's Sneakers" },
  'slides':          { name: 'Slides',           short: 'SL', banner: 'maroon', subtitle: 'Easy on, easy off — made for Dhaka summers and monsoon days' },
  'accessories':     { name: 'Accessories',      short: 'AC', banner: 'gray',  subtitle: 'Bring Your Sneakers Back to Life' },
  'sale':            { name: 'Sale',             short: 'SA', banner: 'photo-sale', subtitle: 'Big Sale up to 20%' }
};

/* ---------- Seed list ----------
   [name, category, price, salePrice|null, badge|null, colour, gender, imagesSpec]
   imagesSpec: array of Unsplash indices, or a function returning image URLs. */
const SEED = [
  // ---- Men's sneakers
  ['Dhaka Runner Pro',            'mens-sneakers', 4850, null, 'new',  'red',    'men', [0, 3, 9]],
  ['Padma Flow Knit',             'mens-sneakers', 3950, 3450, 'sale', 'white',  'men', [1, 8, 4]],
  ['Sundarban Trail X',           'mens-sneakers', 5650, null, null,   'grey',   'men', [4, 12, 15]],
  ['Old Town Court Low',          'mens-sneakers', 3250, null, null,   'white',  'men', [8, 2, 16]],
  ['Monsoon Grip Runner',         'mens-sneakers', 4150, 3650, 'sale', 'blue',   'men', [9, 13, 3]],
  ['Bay Breeze Mesh',             'mens-sneakers', 2950, null, 'new',  'white',  'men', [2, 17, 8]],
  ['Chattogram Street Hi',        'mens-sneakers', 5250, null, null,   'black',  'men', [7, 19, 5]],
  ['Rickshaw Retro 86',           'mens-sneakers', 3750, null, 'soldout', 'red', 'men', [11, 0, 14]],
  ['Banani Lux Leather',          'mens-sneakers', 6450, 5650, 'sale', 'white',  'men', [16, 8, 1]],
  ['Jamuna Air Lite',             'mens-sneakers', 4450, null, null,   'grey',   'men', [3, 4, 18]],
  ['Gulshan Night Glow',          'mens-sneakers', 4950, null, 'new',  'black',  'men', [13, 7, 12]],
  ['Sylhet Tea Trail',            'mens-sneakers', 3550, null, null,   'yellow', 'men', [14, 15, 9]],
  ['Teesta Tempo Runner',         'mens-sneakers', 2650, null, null,   'blue',   'men', [12, 9, 3]],
  ['Karnaphuli Classic',          'mens-sneakers', 2850, 2450, 'sale', 'white',  'men', [18, 2, 16]],
  ['Mirpur Daily Sprint',         'mens-sneakers', 3150, null, null,   'black',  'men', [15, 5, 19]],
  ['Shapla Bloom Low',            'mens-sneakers', 3850, null, null,   'red',    'men', [10, 0, 6]],
  ['Lalbagh Fort Mid',            'mens-sneakers', 5450, null, 'soldout', 'grey', 'men', [5, 6, 10]],
  ['Kuakata Sunrise',             'mens-sneakers', 4250, null, null,   'yellow', 'men', [20, 14, 11]],
  // ---- Women's sneakers
  ['Jui Petal Knit',              'womens-sneakers', 3650, null, 'new', 'white', 'women', [6, 1, 8]],
  ['Krishnachura Runner',         'womens-sneakers', 3950, 3350, 'sale', 'red',  'women', [0, 10, 6]],
  ['Dhanmondi Lake Walk',         'womens-sneakers', 2950, null, null,  'white', 'women', [17, 2, 18]],
  ['Rajshahi Mango Pop',          'womens-sneakers', 3450, null, null,  'yellow','women', [14, 20, 9]],
  ['Saint Martin Coral',          'womens-sneakers', 4650, null, 'new', 'blue',  'women', [9, 13, 1]],
  ['Bakul Cloud Step',            'womens-sneakers', 3250, null, null,  'white', 'women', [8, 16, 17]],
  ['Rangamati Hill Trail',        'womens-sneakers', 4850, 4150, 'sale','grey',  'women', [4, 3, 12]],
  ['Nakshi Weave Low',            'womens-sneakers', 3750, null, null,  'black', 'women', [5, 19, 7]],
  ['Shiuli Morning Run',          'womens-sneakers', 2750, null, 'soldout','white','women', [2, 6, 8]],
  ['Hatirjheel Neon',             'womens-sneakers', 4150, null, null,  'black', 'women', [13, 15, 11]],
  ['Kodom Ful Platform',          'womens-sneakers', 4450, null, null,  'yellow','women', [20, 10, 14]],
  ['Bijoy Pride Hi',              'womens-sneakers', 5150, 4650, 'sale','red',   'women', [11, 0, 3]],
  // ---- Slides
  ["Cox's Breeze Slide",          'slides', 1450, null, 'new',  'black',  'men',   () => [slideArt('#111', '#2b2b2b'), slideArt('#111', '#2b2b2b', '#f3f3f3', -12), slideArt('#111', '#2b2b2b', '#ffffff', 10)]],
  ['Monsoon Pool Slide',          'slides', 1250, 1050, 'sale', 'blue',   'men',   () => [slideArt('#1e4fd8', '#f2f2f2'), slideArt('#1e4fd8', '#f2f2f2', '#f3f3f3', -12), slideArt('#1e4fd8', '#f2f2f2', '#fff', 10)]],
  ['Gulshan Club Slide',          'slides', 1850, null, null,   'white',  'men',   () => [slideArt('#d9d9d9', '#111'), slideArt('#d9d9d9', '#111', '#f3f3f3', -12), slideArt('#d9d9d9', '#111', '#fff', 10)]],
  ['Jamdani Comfort Slide',       'slides', 1650, null, 'new',  'red',    'women', () => [slideArt('#D0021B', '#f6e7d8'), slideArt('#D0021B', '#f6e7d8', '#f3f3f3', -12), slideArt('#D0021B', '#f6e7d8', '#fff', 10)]],
  ['Shorshe Field Slide',         'slides', 1350, null, null,   'yellow', 'women', () => [slideArt('#F5B800', '#222'), slideArt('#F5B800', '#222', '#f3f3f3', -12), slideArt('#F5B800', '#222', '#fff', 10)]],
  ['Lotus Soft Slide',            'slides', 1550, 1290, 'sale', 'white',  'women', () => [slideArt('#f4c6cf', '#ffffff'), slideArt('#f4c6cf', '#ffffff', '#f3f3f3', -12), slideArt('#f4c6cf', '#ffffff', '#fff', 10)]],
  // ---- Accessories
  ['Zapatos Sneaker Cleaner 150ml','accessories', 650, null, 'new', 'white', 'unisex', () => [accessoryArt('cleaner', '#D0021B'), accessoryArt('cleaner', '#D0021B', '#f3f3f3'), accessoryArt('brush', '#111')]],
  ['Premium Cleaning Brush',      'accessories', 450, null, null,   'black', 'unisex', () => [accessoryArt('brush', '#111'), accessoryArt('brush', '#111', '#f3f3f3'), accessoryArt('cleaner', '#D0021B')]],
  ['Flat Cotton Laces (Pair)',    'accessories', 250, 200, 'sale',  'white', 'unisex', () => [accessoryArt('laces', '#222'), accessoryArt('laces', '#D0021B', '#f3f3f3'), accessoryArt('laces', '#1e4fd8')]],
  ['Ankle Sport Socks (3 Pack)',  'accessories', 550, null, null,   'black', 'unisex', () => [accessoryArt('socks', '#e9e9e9'), accessoryArt('socks', '#111', '#f3f3f3'), accessoryArt('socks', '#D0021B')]],
  ['Memory Foam Insoles',         'accessories', 750, null, null,   'grey',  'unisex', () => [accessoryArt('insole', '#9aa3ad'), accessoryArt('insole', '#2e7d6b', '#f3f3f3'), accessoryArt('insole', '#111')]],
  ['Rain Shield Protector Spray', 'accessories', 850, 720, 'sale',  'blue',  'unisex', () => [accessoryArt('protector', '#1e4fd8'), accessoryArt('protector', '#1e4fd8', '#f3f3f3'), accessoryArt('cleaner', '#1e4fd8')]]
];

const COLOUR_NAMES = { red: 'Red & White', white: 'White & Blue', grey: 'Grey & Black', blue: 'Blue & White',
  black: 'Black & White', yellow: 'Yellow & Black' };

const slugify = s => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ---------- Demo catalogue (switched off — see USE_DEMO_PRODUCTS) ----------
   Each item has: id, name, slug, category, price, salePrice, badge,
   images[], sizes[{size, stock}], sku, short, specs{}, description[] */
const DEMO_PRODUCTS = SEED.map((row, i) => {
  const [name, category, price, salePrice, badge, colour, gender, imgSpec] = row;
  const id = i + 1;
  const isShoe = category !== 'accessories';
  const images = typeof imgSpec === 'function'
    ? imgSpec()
    : imgSpec.map(n => UNSPLASH(SHOE_PHOTOS[n % SHOE_PHOTOS.length]));

  // Stock per size — deterministic pseudo-random so it stays stable.
  const sizeList = isShoe ? [40, 41, 42, 43, 44] : ['One Size'];
  const sizes = sizeList.map((size, k) => ({
    size,
    stock: badge === 'soldout' ? 0 : ((id * 7 + k * 5) % 9 === 0 ? 0 : ((id + k * 3) % 12) + 1)
  }));

  const catInfo = CATEGORIES[category];
  return {
    id,
    name,
    slug: slugify(name),
    category,
    gender,
    colour,
    price,
    salePrice,
    badge,
    images,
    sizes,
    sku: `ZAP-${catInfo.short}-${String(id).padStart(2, '0')}`,
    popularity: (id * 37) % 100,
    addedAt: id, // higher = newer
    short: isShoe
      ? 'Lightweight, breathable and built for everyday comfort on Bangladesh streets.'
      : 'Keep your favourite pair looking fresh — season after season.',
    specs: isShoe ? {
      'Upper Material': category === 'slides' ? 'EVA Foam' : 'Artificial Leather & Mesh Fabric',
      'Sole': category === 'slides' ? 'Soft EVA' : 'Sponge Rubber',
      'Weight': category === 'slides' ? '0.3 kg' : '0.5 kg',
      'Colour': COLOUR_NAMES[colour],
      'Origin': id % 3 === 0 ? 'Bangladesh' : (id % 3 === 1 ? 'China' : 'Vietnam'),
      'Category': catInfo.name
    } : {
      'Material': 'Premium grade',
      'Colour': COLOUR_NAMES[colour],
      'Origin': 'Bangladesh',
      'Category': catInfo.name
    },
    description: isShoe ? [
      `The ${name} is designed for the way Bangladesh moves — from crowded city footpaths to weekend trips out of town. A breathable upper keeps your feet cool in humid weather, while the cushioned sole absorbs every step.`,
      'A reinforced heel counter and grippy outsole give you confidence on wet monsoon roads, and the clean silhouette pairs just as easily with jeans as it does with a panjabi.',
      'Every pair is quality-checked in our Dhaka warehouse before it ships. Not the right fit? Exchange it within 10 days.'
    ] : [
      `${name} helps you protect your investment. Use it regularly to keep sneakers clean, fresh and ready for any occasion.`,
      'Safe on leather, mesh, canvas and suede. Made for the dust, rain and humidity of everyday Bangladesh life.'
    ]
  };
});

/* =====================================================================
   YOUR PRODUCTS — this is the real catalogue shown on the website.
   To add a shoe, copy one block and change the details.
   - price / salePrice: in Taka (salePrice: null = not on sale)
   - badge: 'new', 'sale', 'soldout' or null
   - colour: white | black | grey | blue | red | yellow | brown | null
   - stock: pairs available PER SIZE (10 is a placeholder — set your real numbers)
   - images: PLACEHOLDER photos. Put your own photos in assets/img/products/
     and replace these, e.g. 'assets/img/products/classic-white-1.jpg'
   ===================================================================== */
const MY_PRODUCTS = [
  { name: 'Classic White Sneakers', category: 'mens-sneakers', price: 1490, salePrice: null, badge: 'new',
    colour: 'white', sizes: [39, 40, 41, 42, 43], stock: 10, images: [8, 2, 16] },
  { name: 'Black Casual Sneakers', category: 'mens-sneakers', price: 1690, salePrice: null, badge: 'new',
    colour: 'black', sizes: [40, 41, 42, 43, 44], stock: 10, images: [7, 19, 5] },
  { name: 'Everyday Running Shoes', category: 'mens-sneakers', price: 1990, salePrice: null, badge: 'new',
    colour: null, sizes: [39, 40, 41, 42, 43], stock: 10, images: [3, 9, 12] },
  { name: 'Brown Casual Loafers', category: 'mens-sneakers', price: 1790, salePrice: null, badge: 'new',
    colour: 'brown', sizes: [40, 41, 42, 43], stock: 10, images: [10, 6, 14] }
];

/* Set to true to show the 42 demo products instead (for testing the design). */
const USE_DEMO_PRODUCTS = false;

const COLOUR_LABEL = { white: 'White', black: 'Black', grey: 'Grey', blue: 'Blue', red: 'Red', yellow: 'Yellow', brown: 'Brown' };

function buildProduct(item, i) {
  const id = i + 1;
  const cat = CATEGORIES[item.category];
  const specs = {};
  if (item.colour) specs.Colour = COLOUR_LABEL[item.colour];
  specs.Category = cat.name;
  specs['Available Sizes'] = item.sizes.join(', ');
  return {
    id,
    name: item.name,
    slug: slugify(item.name),
    category: item.category,
    gender: item.gender || 'men',
    colour: item.colour,
    price: item.price,
    salePrice: item.salePrice || null,
    badge: item.badge || null,
    images: item.images.map(n => typeof n === 'number' ? UNSPLASH(SHOE_PHOTOS[n % SHOE_PHOTOS.length]) : n),
    sizes: item.sizes.map(size => ({ size, stock: item.badge === 'soldout' ? 0 : item.stock })),
    sku: `ZAP-${cat.short}-${String(id).padStart(2, '0')}`,
    popularity: 100 - id,
    addedAt: id,
    short: item.short || 'Comfortable everyday pair. Cash on Delivery all over Bangladesh.',
    specs,
    description: item.description || [
      `${item.name} — available in sizes ${item.sizes.join(', ')}.`,
      'Not sure about your size? Check the Size Guide, or call us and we will help you choose. Exchanges are accepted within 10 days.'
    ]
  };
}

const PRODUCTS = USE_DEMO_PRODUCTS ? DEMO_PRODUCTS : MY_PRODUCTS.map(buildProduct);

/* Helpers used by every page */
const getProduct = id => PRODUCTS.find(p => p.id === Number(id));
const effectivePrice = p => p.salePrice || p.price;
const totalStock = p => p.sizes.reduce((s, x) => s + x.stock, 0);
const isSoldOut = p => p.badge === 'soldout' || totalStock(p) === 0;

/* ---------- Hero & lifestyle imagery (Unsplash placeholders) ---------- */
const LIFESTYLE = {
  hero1: UNSPLASH('1552346154-21d32810aba3', 1800),
  hero2: UNSPLASH('1460353581641-37baddab0fa2', 1800),
  hero3: UNSPLASH('1549298916-b41d501d3772', 1800),
  heroCard: UNSPLASH('1542291026-7eec264c27ff', 500),
  catMen: UNSPLASH('1600185365483-26d7a4cc7519', 900),
  catWomen: UNSPLASH('1595950653106-6c9ebd614d3a', 600),
  feature1: UNSPLASH('1556906781-9a412961c28c', 900),
  feature2: UNSPLASH('1608231387042-66d1773070a5', 900),
  shopBanner: UNSPLASH('1460353581641-37baddab0fa2', 1800),
  saleBanner: UNSPLASH('1552346154-21d32810aba3', 1800)
};

/* Instagram row — replace the links with your real Instagram posts */
const INSTAGRAM = [0, 9, 5, 13, 1, 7].map((n, i) => ({
  img: UNSPLASH(SHOE_PHOTOS[n], 500),
  url: '', // link to a specific post; empty = your Instagram profile (SITE.instagram)
  alt: `Zapatos customer photo ${i + 1} on Instagram`
}));

/* ---------- Blog posts ---------- */
const BLOG_POSTS = [
  { id: 1, title: 'One Sneaker, Every Season', author: 'Nusrat', cats: ['Lifestyle', 'Sneakers'], date: 'September 28, 2026',
    img: UNSPLASH('1600269452121-4f2416e55c28', 900), tint: '#1f8a4c' },
  { id: 2, title: 'How to Clean Sneakers in Monsoon', author: 'Rafiq', cats: ['Care', 'Tips'], date: 'August 14, 2026',
    img: UNSPLASH('1525966222134-fcfa99b8ae77', 900), tint: '#8b8b8b' },
  { id: 3, title: 'Eid Collection Lookbook 2026', author: 'Tasnim', cats: ['Collections'], date: 'June 2, 2026',
    img: UNSPLASH('1606107557195-0e29a4b5b4aa', 900), tint: '#7a0f1c' },
  { id: 4, title: 'Finding Your Perfect Running Fit', author: 'Arif', cats: ['Running', 'Guides'], date: 'April 19, 2026',
    img: UNSPLASH('1539185441755-769473a23570', 900), tint: '#1d3b6e' }
];
