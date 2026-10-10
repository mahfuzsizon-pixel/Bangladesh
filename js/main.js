/* =====================================================================
   ZAPATOS — Shared site script (all pages)
   Header, footer, search, cart, wishlist, toasts, modals, carousels,
   product card renderer and other global behaviour.
   PLACEHOLDER CONTACT DETAILS live in SITE below — change them once.
   ===================================================================== */

const SITE = {
  phone: '+880 1XXX-XXXXXX',          // PLACEHOLDER
  phoneHref: 'tel:+8801000000000',    // PLACEHOLDER
  email: 'contact@yourdomain.com',    // PLACEHOLDER
  address: ['House 00, Road 00', 'Gulshan-1, Dhaka 1212', 'Bangladesh'], // PLACEHOLDER
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/'
};

/* ---------------------------------------------------------------------
   1. Icon set (thin line icons, inline SVG)
   --------------------------------------------------------------------- */
const svg = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${d}</svg>`;

const ICONS = {
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
  heart: svg('<path d="M12 20s-7-4.4-9.3-9C1.2 7.8 3 4.5 6.4 4.5c2 0 3.5 1.2 4.1 2.2h3c.6-1 2.1-2.2 4.1-2.2 3.4 0 5.2 3.3 3.7 6.5C19 15.6 12 20 12 20z"/>'),
  bag: svg('<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  phone: svg('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
  truck: svg('<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>'),
  headset: svg('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2.5" y="14" width="4" height="6" rx="1.5"/><rect x="17.5" y="14" width="4" height="6" rx="1.5"/><path d="M20 20c0 1.5-2 2-5 2h-2"/>'),
  ret: svg('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v5h5"/>'),
  shield: svg('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10 11V9.5a2 2 0 0 1 4 0V11"/>'),
  chevUp: svg('<path d="m6 15 6-6 6 6"/>'),
  chevLeft: svg('<path d="m15 6-6 6 6 6"/>'),
  chevRight: svg('<path d="m9 6 6 6-6 6"/>'),
  chevDown: svg('<path d="m6 9 6 6 6-6"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  menu: svg('<path d="M3 6h18M3 12h18M3 18h18"/>'),
  sliders: svg('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  minus: svg('<path d="M5 12h14"/>'),
  arrowRight: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>'),
  facebook: svg('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>'),
  xTwitter: svg('<path d="M4 4l16 16M20 4 4 20" stroke-width="1.8"/>'),
  pinterest: svg('<circle cx="12" cy="12" r="9"/><path d="M11 8.5c3-1 5 .8 4.5 3.5-.4 2.2-2.6 3.3-4 2M11.5 10 9 20"/>'),
  tumblr: svg('<path d="M10 3v4H7v3h3v6c0 3 2 5 5 5h2v-3h-2c-1 0-2-.8-2-2v-6h4V7h-4V3z"/>'),
  check: svg('<path d="m5 12 5 5 9-10"/>')
};

/* ---------------------------------------------------------------------
   2. Safe localStorage
   --------------------------------------------------------------------- */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------------------------------------------------------------
   3. Logo markup — Didone "ZAPATOS" with an oversized Z
   --------------------------------------------------------------------- */
const logoHTML = (small = false) =>
  `<a href="index.html" class="logo${small ? ' logo--sm' : ''}" aria-label="Zapatos home">
     <span class="logo__z" aria-hidden="true">Z</span><span class="logo__rest" aria-hidden="true">APATOS</span>
   </a>`;

/* ---------------------------------------------------------------------
   4. Header (top bar, nav, icons, mobile drawer, search overlay, cart)
   --------------------------------------------------------------------- */
const NAV = [
  { label: 'Home', href: 'index.html', key: 'home' },
  { label: "Men's Sneakers", href: 'shop.html?category=mens-sneakers', key: 'mens-sneakers' },
  { label: "Women's Sneakers", href: 'shop.html?category=womens-sneakers', key: 'womens-sneakers' },
  { label: 'Slides', href: 'shop.html?category=slides', key: 'slides' },
  { label: 'Accessories', href: 'shop.html?category=accessories', key: 'accessories' },
  { label: 'Sale', href: 'shop.html?category=sale', key: 'sale', sale: true },
  { label: 'Blog', href: 'blog.html', key: 'blog' }
];

function currentNavKey() {
  const page = document.body.dataset.page;
  if (page === 'shop') return new URLSearchParams(location.search).get('category') || '';
  if (page === 'product') {
    const p = getProduct(new URLSearchParams(location.search).get('id'));
    return p ? p.category : '';
  }
  return page;
}

function navLinks(active) {
  return NAV.map(n => `<li><a href="${n.href}" class="nav__link${n.sale ? ' nav__link--sale' : ''}${n.key === active ? ' is-active' : ''}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}${n.sale ? '<span class="sale-pill" aria-hidden="true">Sale</span>' : ''}</a></li>`).join('');
}

function renderHeader() {
  const mount = $('#site-header');
  if (!mount) return;
  const active = currentNavKey();
  mount.outerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="topbar" id="topbar">
    <div class="container topbar__inner">
      <a href="${SITE.phoneHref}">${ICONS.phone}<span>${SITE.phone}</span></a>
      <a href="mailto:${SITE.email}">${ICONS.mail}<span>${SITE.email}</span></a>
      <span class="topbar__cod">Cash on Delivery all over Bangladesh</span>
    </div>
  </div>
  <div class="header-spacer" id="header-spacer"></div>
  <header class="header" id="header">
    <div class="header__inner">
      <button class="icon-btn header__burger" id="menu-open" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false">${ICONS.menu}</button>
      ${logoHTML()}
      <nav class="nav" aria-label="Main"><ul class="nav__list">${navLinks(active)}</ul></nav>
      <div class="header__icons">
        <button class="icon-btn" id="search-open" aria-label="Search products">${ICONS.search}</button>
        <a class="icon-btn hide-md" href="#" id="account-link" aria-label="My account">${ICONS.user}</a>
        <button class="icon-btn hide-md" id="wishlist-open" aria-label="Wishlist">${ICONS.heart}<span class="count" id="wish-count">0</span></button>
        <button class="icon-btn" id="cart-open" aria-label="Open cart" aria-controls="cart-drawer">${ICONS.bag}<span class="count" id="cart-count">0</span></button>
      </div>
    </div>
  </header>

  <!-- Mobile off-canvas nav -->
  <div class="overlay" data-overlay="mobile-nav"></div>
  <aside class="drawer drawer--left" id="mobile-nav" aria-label="Mobile menu" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="drawer__head">${logoHTML(true)}<button class="icon-btn" data-close aria-label="Close menu">${ICONS.close}</button></div>
    <nav aria-label="Mobile"><ul class="mnav">${navLinks(active)}</ul></nav>
    <div class="mnav__extra">
      <a href="#" class="mnav__wish" id="m-wishlist">${ICONS.heart} Wishlist (<span id="m-wish-count">0</span>)</a>
      <a href="#">${ICONS.user} My Account</a>
    </div>
  </aside>

  <!-- Search overlay -->
  <div class="search" id="search" role="dialog" aria-modal="true" aria-label="Search products" aria-hidden="true">
    <button class="icon-btn search__close" data-close aria-label="Close search">${ICONS.close}</button>
    <div class="container search__inner">
      <label for="search-input" class="search__label">What are you looking for?</label>
      <input type="search" id="search-input" class="search__input" placeholder="Search sneakers, slides, accessories…" autocomplete="off">
      <p class="search__hint" id="search-hint" aria-live="polite">Start typing to see products</p>
      <ul class="search__results" id="search-results"></ul>
    </div>
  </div>

  <!-- Mini-cart drawer -->
  <div class="overlay" data-overlay="cart-drawer"></div>
  <aside class="drawer drawer--right" id="cart-drawer" aria-label="Shopping cart" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="drawer__head"><h2 class="drawer__title">Shopping Cart</h2><button class="icon-btn" data-close aria-label="Close cart">${ICONS.close}</button></div>
    <div class="cart__body" id="cart-body"></div>
    <div class="cart__foot">
      <div class="cart__subtotal"><span>Subtotal:</span><strong id="cart-subtotal">0.0৳</strong></div>
      <p class="cart__note">Shipping: 60৳ inside Dhaka · 120৳ outside Dhaka. Free over 5,000৳.</p>
      <a href="#" class="btn btn--outline btn--block" id="view-cart">View Cart</a>
      <a href="#" class="btn btn--dark btn--block" id="checkout">Checkout</a>
    </div>
  </aside>

  <!-- Wishlist drawer -->
  <div class="overlay" data-overlay="wish-drawer"></div>
  <aside class="drawer drawer--right" id="wish-drawer" aria-label="Wishlist" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="drawer__head"><h2 class="drawer__title">Wishlist</h2><button class="icon-btn" data-close aria-label="Close wishlist">${ICONS.close}</button></div>
    <div class="cart__body" id="wish-body"></div>
  </aside>

  <div class="toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>
  <button class="to-top" id="to-top" aria-label="Back to top">${ICONS.chevUp}</button>`;
}

/* ---------------------------------------------------------------------
   5. Trust strip + Footer
   --------------------------------------------------------------------- */
function trustHTML() {
  const items = [
    [ICONS.truck, 'Free Shipping', 'Free shipping on all orders above 5000 taka'],
    [ICONS.headset, 'Support 24/7', 'Contact us 24 hours a day, 7 days a week'],
    [ICONS.ret, '10 Days Return', 'Simply return it within 10 days for an exchange'],
    [ICONS.shield, '100% Payment Secure', 'We ensure secure payment with SSLCOMMERZ']
  ];
  return `<section class="trust" aria-label="Why shop with us"><div class="container trust__grid">
    ${items.map(([ic, t, d]) => `<div class="trust__item"><span class="trust__icon">${ic}</span><div><h3 class="trust__title">${t}</h3><p class="trust__desc">${d}</p></div></div>`).join('')}
  </div></section>`;
}

const PAYMENTS = [
  ['bKash', '#E2136E', '#fff'], ['Nagad', '#F6921E', '#1a1a1a'], ['Rocket', '#8C3494', '#fff'],
  ['VISA', '#1A1F71', '#fff'], ['Mastercard', '#fff', '#222'], ['AMEX', '#2E77BC', '#fff'], ['COD', '#222', '#fff']
];

function renderFooter() {
  const mount = $('#site-footer');
  if (!mount) return;
  const col = (title, links) => `
    <details class="fcol" open>
      <summary class="fcol__title">${title}<span class="fcol__chev">${ICONS.chevDown}</span></summary>
      <ul class="fcol__list">${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
    </details>`;
  const showTrust = document.body.dataset.page === 'home';
  mount.outerHTML = `
  ${showTrust ? trustHTML() : ''}
  <footer class="footer">
    <div class="container footer__grid">
      <div class="fbrand">
        ${logoHTML(true)}
        <p class="fbrand__row">${ICONS.pin}<span>${SITE.address.join('<br>')}</span></p>
        <p class="fbrand__row">${ICONS.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p class="fbrand__row">${ICONS.phone}<a href="${SITE.phoneHref}">${SITE.phone}</a></p>
        <div class="social">
          <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Zapatos on Facebook">${ICONS.facebook}</a>
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Zapatos on Instagram">${ICONS.instagram}</a>
        </div>
      </div>
      ${col('Categories', [["Men's Sneakers", 'shop.html?category=mens-sneakers'], ["Women's Sneakers", 'shop.html?category=womens-sneakers'], ['Slides', 'shop.html?category=slides'], ['Sale', 'shop.html?category=sale']])}
      ${col('Information', [['About Us', '#'], ['Contact Us', '#'], ['Terms &amp; Conditions', '#'], ['Returns &amp; Exchanges', '#'], ['Shipping &amp; Delivery', '#'], ['Privacy Policy', '#']])}
      ${col('Quick Links', [['Store Location', '#'], ['My Account', '#'], ['Orders Tracking', '#'], ['Size Guide', '#'], ['FAQs', '#'], ['Privacy Policy', '#']])}
      <div class="fnews">
        <h3 class="fcol__title fcol__title--static">Newsletter</h3>
        <form class="newsletter" id="newsletter" novalidate>
          <label for="nl-email">Subscribe to our newsletter</label>
          <div class="newsletter__field">
            <input type="email" id="nl-email" name="email" placeholder="Your email address" autocomplete="email" required>
            <button type="submit" class="btn btn--dark">Subscribe</button>
          </div>
          <p class="newsletter__msg" id="nl-msg" role="status" aria-live="polite"></p>
        </form>
        <p class="pay__label">We accept</p>
        <ul class="pay" aria-label="Payment methods">
          ${PAYMENTS.map(([n, bg, fg]) => `<li class="pay__item" style="--bg:${bg};--fg:${fg}">${n === 'Mastercard' ? '<span class="mc" aria-hidden="true"><i></i><i></i></span><span class="sr-only">Mastercard</span>' : n}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>Copyright © 2026 <a href="index.html" class="accent">Zapatos Bangladesh</a> all rights reserved.</p>
        <ul class="footer__links"><li><a href="shop.html">Shop</a></li><li><a href="#">About Us</a></li><li><a href="#">Contact</a></li><li><a href="blog.html">Blog</a></li></ul>
      </div>
    </div>
  </footer>`;
}

/* ---------------------------------------------------------------------
   6. Layers: drawers, modals, overlays — with focus trap + Esc
   --------------------------------------------------------------------- */
const layerStack = [];
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

function openLayer(el, opener) {
  if (!el || el.classList.contains('is-open')) return;
  el._opener = opener || document.activeElement;
  el.classList.add('is-open');
  el.setAttribute('aria-hidden', 'false');
  const ov = $(`[data-overlay="${el.id}"]`);
  if (ov) ov.classList.add('is-open');
  if (el._opener && el._opener.hasAttribute && el._opener.hasAttribute('aria-expanded')) el._opener.setAttribute('aria-expanded', 'true');
  layerStack.push(el);
  document.body.classList.add('no-scroll');
  const first = el.querySelector('[data-autofocus]') || $$(FOCUSABLE, el)[0];
  setTimeout(() => first && first.focus(), 60);
}

function closeLayer(el) {
  if (!el || !el.classList.contains('is-open')) return;
  el.classList.remove('is-open');
  el.setAttribute('aria-hidden', 'true');
  const ov = $(`[data-overlay="${el.id}"]`);
  if (ov) ov.classList.remove('is-open');
  const i = layerStack.indexOf(el);
  if (i > -1) layerStack.splice(i, 1);
  if (!layerStack.length) document.body.classList.remove('no-scroll');
  if (el._opener && el._opener.hasAttribute && el._opener.hasAttribute('aria-expanded')) el._opener.setAttribute('aria-expanded', 'false');
  if (el._opener && el._opener.focus) el._opener.focus();
}

document.addEventListener('keydown', e => {
  const top = layerStack[layerStack.length - 1];
  if (!top) return;
  if (e.key === 'Escape') { closeLayer(top); return; }
  if (e.key === 'Tab') {               // focus trap
    const f = $$(FOCUSABLE, top).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

document.addEventListener('click', e => {
  const closeBtn = e.target.closest('[data-close]');
  if (closeBtn) { closeLayer(closeBtn.closest('.is-open')); return; }
  const ov = e.target.closest('[data-overlay]');
  if (ov) closeLayer(document.getElementById(ov.dataset.overlay));
});

/* Generic modal builder (size guide, delivery, lightbox…) */
function openModal({ title, html, wide = false, className = '' }, opener) {
  let m = $('#modal');
  if (!m) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="overlay overlay--dark" data-overlay="modal"></div>
      <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal__box"><div class="modal__head"><h2 id="modal-title"></h2><button class="icon-btn" data-close aria-label="Close dialog">${ICONS.close}</button></div><div class="modal__body"></div></div>
      </div>`);
    m = $('#modal');
  }
  m.className = `modal ${className}${wide ? ' modal--wide' : ''}`;
  $('#modal-title', m).textContent = title;
  $('.modal__body', m).innerHTML = html;
  openLayer(m, opener);
  return m;
}

/* ---------------------------------------------------------------------
   7. Toasts
   --------------------------------------------------------------------- */
function toast(msg, img) {
  const box = $('#toasts');
  if (!box) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `${img ? `<img src="${img}" alt="" width="44" height="44">` : `<span class="toast__ic">${ICONS.check}</span>`}<p>${msg}</p>`;
  box.appendChild(t);
  requestAnimationFrame(() => t.classList.add('is-in'));
  setTimeout(() => { t.classList.remove('is-in'); setTimeout(() => t.remove(), 300); }, 3000);
}

/* ---------------------------------------------------------------------
   8. Wishlist
   --------------------------------------------------------------------- */
const Wishlist = {
  items: store.get('zap_wishlist', []),
  has(id) { return this.items.includes(Number(id)); },
  toggle(id) {
    id = Number(id);
    const p = getProduct(id);
    if (this.has(id)) { this.items = this.items.filter(x => x !== id); toast(`Removed <b>${escapeHTML(p.name)}</b> from wishlist`); }
    else { this.items.push(id); toast(`Added <b>${escapeHTML(p.name)}</b> to wishlist`, p.images[0]); }
    store.set('zap_wishlist', this.items);
    this.sync();
  },
  sync() {
    const n = this.items.length;
    $$('#wish-count, #m-wish-count').forEach(el => (el.textContent = n));
    $$('[data-wish]').forEach(btn => {
      const on = this.has(btn.dataset.wish);
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on);
    });
    const body = $('#wish-body');
    if (body) {
      body.innerHTML = n ? this.items.map(id => {
        const p = getProduct(id); if (!p) return '';
        return `<div class="line"><a href="product.html?id=${p.id}" class="line__img"><img src="${p.images[0]}" alt="${escapeHTML(p.name)}" width="70" height="70"></a>
          <div class="line__info"><a href="product.html?id=${p.id}" class="line__name">${escapeHTML(p.name)}</a>${priceHTML(p)}</div>
          <button class="icon-btn line__rm" data-wish-remove="${p.id}" aria-label="Remove ${escapeHTML(p.name)} from wishlist">${ICONS.close}</button></div>`;
      }).join('') : `<p class="empty">Your wishlist is empty.<br><a href="shop.html?category=mens-sneakers" class="btn btn--dark">Start shopping</a></p>`;
    }
  }
};

/* ---------------------------------------------------------------------
   9. Cart (persisted)
   --------------------------------------------------------------------- */
const Cart = {
  items: store.get('zap_cart', []), // [{id, size, qty}]
  save() { store.set('zap_cart', this.items); this.render(); },
  stockFor(id, size) {
    const p = getProduct(id); const s = p && p.sizes.find(x => String(x.size) === String(size));
    return s ? s.stock : 0;
  },
  add(id, size, qty = 1) {
    id = Number(id);
    const line = this.items.find(l => l.id === id && String(l.size) === String(size));
    const max = this.stockFor(id, size);
    if (line) line.qty = Math.min(max, line.qty + qty);
    else this.items.push({ id, size, qty: Math.min(max, qty) });
    this.save();
    const p = getProduct(id);
    toast(`<b>${escapeHTML(p.name)}</b> (size ${size}) added to cart`, p.images[0]);
  },
  setQty(i, qty) {
    const l = this.items[i]; if (!l) return;
    l.qty = Math.max(1, Math.min(this.stockFor(l.id, l.size), qty));
    this.save();
  },
  remove(i) { this.items.splice(i, 1); this.save(); },
  count() { return this.items.reduce((s, l) => s + l.qty, 0); },
  subtotal() { return this.items.reduce((s, l) => { const p = getProduct(l.id); return s + (p ? effectivePrice(p) * l.qty : 0); }, 0); },
  render() {
    $$('#cart-count').forEach(el => (el.textContent = this.count()));
    const body = $('#cart-body');
    if (!body) return;
    this.items = this.items.filter(l => getProduct(l.id));
    body.innerHTML = this.items.length ? this.items.map((l, i) => {
      const p = getProduct(l.id);
      return `<div class="line">
        <a href="product.html?id=${p.id}" class="line__img"><img src="${p.images[0]}" alt="${escapeHTML(p.name)}" width="70" height="70"></a>
        <div class="line__info">
          <a href="product.html?id=${p.id}" class="line__name">${escapeHTML(p.name)}</a>
          <span class="line__meta">Size: ${l.size}</span>
          <div class="line__row">
            <div class="qty qty--sm"><button data-cart-dec="${i}" aria-label="Decrease quantity">${ICONS.minus}</button><span aria-live="polite">${l.qty}</span><button data-cart-inc="${i}" aria-label="Increase quantity">${ICONS.plus}</button></div>
            <span class="line__price">${formatPrice(effectivePrice(p) * l.qty)}</span>
          </div>
        </div>
        <button class="icon-btn line__rm" data-cart-rm="${i}" aria-label="Remove ${escapeHTML(p.name)} from cart">${ICONS.close}</button>
      </div>`;
    }).join('') : `<p class="empty">Your cart is currently empty.<br><a href="shop.html?category=mens-sneakers" class="btn btn--dark">Return to shop</a></p>`;
    const st = $('#cart-subtotal'); if (st) st.textContent = formatPrice(this.subtotal());
    $('.cart__foot') && $('.cart__foot').classList.toggle('is-hidden', !this.items.length);
  }
};

/* ---------------------------------------------------------------------
   10. Product card (reused on every page)
   --------------------------------------------------------------------- */
function priceHTML(p, cls = '') {
  return p.salePrice
    ? `<p class="price ${cls}"><del><span class="sr-only">Original price </span>${formatPrice(p.price)}</del> <ins><span class="sr-only">Sale price </span>${formatPrice(p.salePrice)}</ins></p>`
    : `<p class="price ${cls}">${formatPrice(p.price)}</p>`;
}

function badgeHTML(p, cls = 'badge') {
  if (isSoldOut(p)) return `<span class="${cls} ${cls}--soldout">Sold Out</span>`;
  if (p.badge === 'sale' || p.salePrice) return `<span class="${cls} ${cls}--sale">Sale</span>`;
  if (p.badge === 'new') return `<span class="${cls} ${cls}--new">New</span>`;
  return '';
}

function cardHTML(p, { lazy = true } = {}) {
  const ld = lazy ? ' loading="lazy" decoding="async"' : '';
  const n = escapeHTML(p.name);
  return `<article class="card">
    <div class="card__media">
      <a href="product.html?id=${p.id}" class="card__imglink" tabindex="-1" aria-hidden="true">
        <img class="card__img" src="${p.images[0]}" alt="${n}" width="600" height="600"${ld}>
        <img class="card__img card__img--alt" src="${p.images[1] || p.images[0]}" alt="" width="600" height="600" loading="lazy" decoding="async">
      </a>
      ${badgeHTML(p)}
      <button class="card__wish" data-wish="${p.id}" aria-label="Add ${n} to wishlist" aria-pressed="false">${ICONS.heart}</button>
      <a href="product.html?id=${p.id}" class="card__select" tabindex="-1">${isSoldOut(p) ? 'Read more' : 'Select options'}</a>
    </div>
    <h3 class="card__name"><a href="product.html?id=${p.id}">${n}</a></h3>
    ${priceHTML(p)}
  </article>`;
}

/* ---------------------------------------------------------------------
   11. Carousel helper (scroll-snap track, native swipe, arrow buttons)
   --------------------------------------------------------------------- */
function initCarousel(root) {
  const track = $('.carousel__track', root);
  const prev = $('.carousel__prev', root), next = $('.carousel__next', root);
  if (!track) return;
  const step = () => {
    const item = track.children[0];
    return item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= max;
  };
  prev && prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next && next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update();
}

function carouselHTML(itemsHTML, label, cls = '') {
  return `<div class="carousel ${cls}" role="region" aria-label="${label}">
    <button class="carousel__btn carousel__prev" aria-label="Previous">${ICONS.chevLeft}</button>
    <div class="carousel__track">${itemsHTML}</div>
    <button class="carousel__btn carousel__next" aria-label="Next">${ICONS.chevRight}</button>
  </div>`;
}

/* Blog card with dark band overlay (home + blog pages) */
function blogCardHTML(b, headingTag = 'h3') {
  return `<article class="bcard" style="--tint:${b.tint}">
    <a href="blog.html?id=${b.id}" class="bcard__link">
      <img src="${b.img}" alt="${escapeHTML(b.title)}" width="700" height="860" loading="lazy" decoding="async">
      <div class="bcard__band">
        <p class="bcard__meta">By ${b.author} in ${b.cats.join(', ')} · 0 Comments</p>
        <${headingTag} class="bcard__title">${escapeHTML(b.title)}</${headingTag}>
        <p class="bcard__date">${b.date}</p>
      </div>
    </a>
  </article>`;
}

function sectionHeading(title, subtitle, tag = 'h2') {
  return `<div class="sec-head"><${tag} class="sec-head__title">${title}</${tag}>${subtitle ? `<p class="sec-head__sub">${subtitle}</p>` : ''}</div>`;
}

/* ---------------------------------------------------------------------
   12. Search overlay (live filter)
   --------------------------------------------------------------------- */
function initSearch() {
  const input = $('#search-input'), results = $('#search-results'), hint = $('#search-hint');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; hint.textContent = 'Start typing to see products'; return; }
    const found = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || CATEGORIES[p.category].name.toLowerCase().includes(q)).slice(0, 8);
    hint.textContent = found.length ? `${found.length} result${found.length > 1 ? 's' : ''}` : `No products found for “${input.value}”`;
    results.innerHTML = found.map(p => `<li><a href="product.html?id=${p.id}" class="sres">
      <img src="${p.images[0]}" alt="" width="60" height="60"><span class="sres__name">${escapeHTML(p.name)}</span>${priceHTML(p, 'sres__price')}</a></li>`).join('');
  });
}

/* ---------------------------------------------------------------------
   13. Sticky header, back-to-top
   --------------------------------------------------------------------- */
function initScroll() {
  const header = $('#header'), spacer = $('#header-spacer'), topBtn = $('#to-top'), topbar = $('#topbar');
  let sticky = false;
  const onScroll = () => {
    const y = window.scrollY;
    const threshold = (topbar ? topbar.offsetHeight : 0) + header.offsetHeight;
    if (y > threshold && !sticky) {
      sticky = true;
      spacer.style.height = header.offsetHeight + 'px';
      header.classList.add('is-sticky');
    } else if (y <= (topbar ? topbar.offsetHeight : 0) && sticky) {
      sticky = false;
      spacer.style.height = '0';
      header.classList.remove('is-sticky');
    }
    topBtn.classList.toggle('is-visible', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------------------
   14. Footer: newsletter validation + mobile accordions
   --------------------------------------------------------------------- */
function initFooter() {
  const form = $('#newsletter');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#nl-email'), msg = $('#nl-msg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    msg.className = 'newsletter__msg ' + (ok ? 'is-ok' : 'is-err');
    msg.textContent = ok ? 'Thank you! You are now subscribed to Zapatos news.' : 'Please enter a valid email address.';
    input.setAttribute('aria-invalid', !ok);
    if (ok) form.reset();
  });
  // Accordions: closed on mobile, always open on larger screens
  const mq = window.matchMedia('(max-width: 575.98px)');
  const apply = () => $$('.fcol').forEach(d => { d.open = !mq.matches; });
  apply();
  mq.addEventListener('change', apply);
  $$('.fcol__title').forEach(s => s.addEventListener('click', e => { if (!mq.matches) e.preventDefault(); }));
}

/* ---------------------------------------------------------------------
   15. Image fallback — any broken image shows a branded placeholder
   --------------------------------------------------------------------- */
document.addEventListener('error', e => {
  const img = e.target;
  if (img.tagName !== 'IMG' || img.dataset.fallback) return;
  img.dataset.fallback = '1';
  if (img.hasAttribute('data-nofallback')) { img.style.visibility = 'hidden'; return; }
  img.src = 'assets/img/placeholder-shoe.svg';
}, true);

/* ---------------------------------------------------------------------
   16. Boot
   --------------------------------------------------------------------- */
function bootSite() {
  renderHeader();
  renderFooter();

  $('#menu-open').addEventListener('click', e => openLayer($('#mobile-nav'), e.currentTarget));
  $('#search-open').addEventListener('click', e => { openLayer($('#search'), e.currentTarget); });
  $('#cart-open').addEventListener('click', e => openLayer($('#cart-drawer'), e.currentTarget));
  $('#wishlist-open').addEventListener('click', e => openLayer($('#wish-drawer'), e.currentTarget));
  $('#m-wishlist').addEventListener('click', e => { e.preventDefault(); closeLayer($('#mobile-nav')); openLayer($('#wish-drawer'), $('#menu-open')); });
  $('#account-link').addEventListener('click', e => { e.preventDefault(); toast('Account login is coming soon.'); });
  $('#view-cart').addEventListener('click', e => { e.preventDefault(); toast('Full cart page is coming soon.'); });
  $('#checkout').addEventListener('click', e => { e.preventDefault(); toast('Checkout (bKash, Nagad, card via SSLCOMMERZ, Cash on Delivery) is coming soon.'); });

  // Delegated clicks: wishlist hearts + cart line controls
  document.addEventListener('click', e => {
    const w = e.target.closest('[data-wish]');
    if (w) { e.preventDefault(); Wishlist.toggle(w.dataset.wish); return; }
    const wr = e.target.closest('[data-wish-remove]');
    if (wr) { Wishlist.toggle(wr.dataset.wishRemove); return; }
    const inc = e.target.closest('[data-cart-inc]');
    if (inc) { const i = +inc.dataset.cartInc; Cart.setQty(i, Cart.items[i].qty + 1); return; }
    const dec = e.target.closest('[data-cart-dec]');
    if (dec) { const i = +dec.dataset.cartDec; Cart.setQty(i, Cart.items[i].qty - 1); return; }
    const rm = e.target.closest('[data-cart-rm]');
    if (rm) { Cart.remove(+rm.dataset.cartRm); }
  });

  initSearch();
  initScroll();
  initFooter();
  Cart.render();
  Wishlist.sync();
}

bootSite();
