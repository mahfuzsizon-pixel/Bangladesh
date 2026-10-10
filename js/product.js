/* =====================================================================
   ZAPATOS — Single product page  (product.html?id=…)
   ===================================================================== */
(function () {
  const p = getProduct(new URLSearchParams(location.search).get('id')) || PRODUCTS[0];
  const cat = CATEGORIES[p.category];
  const name = escapeHTML(p.name);
  const soldOut = isSoldOut(p);

  /* ---------- SEO ---------- */
  document.title = `${p.name} — Zapatos Bangladesh`;
  $('meta[name="description"]').setAttribute('content', `${p.name}: ${p.short} ${formatPrice(effectivePrice(p))}. Delivery all over Bangladesh.`);
  $('meta[property="og:title"]').setAttribute('content', document.title);
  $('meta[property="og:description"]').setAttribute('content', p.short);
  if (/^https?:/.test(p.images[0])) $('meta[property="og:image"]').setAttribute('content', p.images[0]);

  /* ---------- 5.1 Breadcrumb ---------- */
  $('#crumbs').innerHTML = `<li><a href="index.html">Home</a></li>
    <li><a href="shop.html?category=${p.category}">${cat.name}</a></li>
    <li><span aria-current="page">${name}</span></li>`;

  /* ---------- 5.2 Gallery + details ---------- */
  const sizeChips = p.sizes.map(s =>
    `<button class="chip${typeof s.size === 'string' ? ' chip--wide' : ''}" data-size="${s.size}" aria-pressed="false" ${s.stock ? '' : 'disabled'} aria-label="Size ${s.size}${s.stock ? '' : ', out of stock'}">${s.size}</button>`).join('');

  $('#pd').innerHTML = `
    <div class="gallery">
      <div class="gallery__thumbs" role="list">
        ${p.images.map((src, i) => `<button class="gallery__thumb" role="listitem" data-idx="${i}" aria-current="${i === 0}" aria-label="Show image ${i + 1}"><img src="${src}" alt="" width="120" height="120"></button>`).join('')}
      </div>
      <div class="gallery__main" id="main-img" tabindex="0" role="button" aria-label="Open full-screen image">
        <img src="${p.images[0]}" alt="${name}" width="800" height="800" id="main-img-el">
        ${badgeHTML(p)}
        <button class="gallery__nav gallery__nav--prev" aria-label="Previous image">${ICONS.chevLeft}</button>
        <button class="gallery__nav gallery__nav--next" aria-label="Next image">${ICONS.chevRight}</button>
      </div>
    </div>

    <div class="pd__info">
      <h1 class="pd__title">${name}</h1>
      ${priceHTML(p, 'pd__price')}
      <p class="pd__short">${escapeHTML(p.short)}</p>

      <div class="sizes">
        <p class="sizes__label" id="size-label">Size <span id="size-chosen"></span></p>
        <div class="sizes__row" role="group" aria-labelledby="size-label">
          ${sizeChips}
          <button class="sizes__clear" id="size-clear" hidden>Clear</button>
        </div>
        <p class="stock" id="stock" aria-live="polite">${soldOut ? 'Out of stock' : ''}</p>
      </div>

      <div class="pd__cart">
        <div class="qty" aria-label="Quantity">
          <button id="qty-dec" aria-label="Decrease quantity">${ICONS.minus}</button>
          <output id="qty" aria-live="polite">1</output>
          <button id="qty-inc" aria-label="Increase quantity">${ICONS.plus}</button>
        </div>
        <button class="btn btn--red" id="add-cart" disabled>${soldOut ? 'Sold Out' : 'Add to Cart'}</button>
        <button class="pd-wish" data-wish="${p.id}" aria-label="Add ${name} to wishlist" aria-pressed="false">${ICONS.heart}</button>
      </div>

      <div class="pd__links">
        <button id="size-guide">Size Guide</button>
        <button id="delivery">Delivery &amp; Return</button>
      </div>

      <div class="pd__meta">
        <p>SKU: <span>${p.sku}</span></p>
        <p>Category: <a href="shop.html?category=${p.category}">${cat.name}</a></p>
        <div class="share" id="share"><span>Share:</span></div>
      </div>
    </div>`;

  /* Gallery: thumbs, arrows, hover zoom, lightbox */
  let idx = 0;
  const mainBox = $('#main-img'), mainImg = $('#main-img-el');
  function show(i) {
    idx = (i + p.images.length) % p.images.length;
    mainImg.src = p.images[idx];
    $$('.gallery__thumb').forEach((t, k) => t.setAttribute('aria-current', k === idx));
  }
  $$('.gallery__thumb').forEach(t => t.addEventListener('click', () => show(+t.dataset.idx)));
  $('.gallery__nav--prev').addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
  $('.gallery__nav--next').addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
  if (window.matchMedia('(hover: hover)').matches) {
    mainBox.addEventListener('mousemove', e => {
      if (e.target.closest('.gallery__nav')) { mainBox.classList.remove('is-zoom'); return; }
      const r = mainBox.getBoundingClientRect();
      mainImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      mainBox.classList.add('is-zoom');
    });
    mainBox.addEventListener('mouseleave', () => mainBox.classList.remove('is-zoom'));
  }
  const openLightbox = () => {
    const m = openModal({ title: p.name, className: 'modal--lightbox', html: `<img src="${p.images[idx]}" alt="${name}" width="1100" height="1100">` }, mainBox);
    return m;
  };
  mainBox.addEventListener('click', e => { if (!e.target.closest('.gallery__nav')) openLightbox(); });
  mainBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); }
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* Size selection, stock, quantity, add to cart */
  let size = null, qty = 1;
  const addBtn = $('#add-cart'), stockEl = $('#stock'), qtyEl = $('#qty');
  const stockOf = s => (p.sizes.find(x => String(x.size) === String(s)) || {}).stock || 0;
  function updateQty() {
    const max = size ? stockOf(size) : 1;
    qty = Math.max(1, Math.min(qty, max));
    qtyEl.textContent = qty;
    $('#qty-dec').disabled = qty <= 1;
    $('#qty-inc').disabled = !size || qty >= max;
  }
  function pick(s) {
    size = s;
    $$('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.size === String(s)));
    $('#size-clear').hidden = !s;
    $('#size-chosen').textContent = s ? `: ${s}` : '';
    const n = s ? stockOf(s) : 0;
    stockEl.textContent = s ? (n ? `${n} in stock` : 'Out of stock') : '';
    stockEl.classList.toggle('is-out', !!s && !n);
    addBtn.disabled = soldOut || !s || !n;
    addBtn.title = !s && !soldOut ? 'Please select a size first' : '';
    updateQty();
  }
  $$('.chip').forEach(c => c.addEventListener('click', () => pick(c.getAttribute('aria-pressed') === 'true' ? null : c.dataset.size)));
  $('#size-clear').addEventListener('click', () => pick(null));
  $('#qty-dec').addEventListener('click', () => { qty--; updateQty(); });
  $('#qty-inc').addEventListener('click', () => { qty++; updateQty(); });
  addBtn.addEventListener('click', () => {
    if (!size) return;
    Cart.add(p.id, size, qty);
    openLayer($('#cart-drawer'), addBtn);
  });
  // Single-size items (accessories) are pre-selected
  if (p.sizes.length === 1 && !soldOut) pick(String(p.sizes[0].size));
  updateQty();

  /* Size guide + delivery modals */
  $('#size-guide').addEventListener('click', e => openModal({ title: 'Size Guide', html: `
    <p>Measure your foot from heel to longest toe, then pick the matching size. Between sizes? Go one size up.</p><br>
    <table class="table"><thead><tr><th>EU</th><th>US (Men)</th><th>US (Women)</th><th>UK</th><th>Foot length (cm)</th></tr></thead><tbody>
    ${[[39, 6.5, 8, 6, 24.5], [40, 7, 8.5, 6.5, 25], [41, 8, 9.5, 7.5, 26], [42, 8.5, 10, 8, 26.5], [43, 9.5, 11, 9, 27.5], [44, 10, 11.5, 9.5, 28]]
      .map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
    </tbody></table>` }, e.currentTarget));
  $('#delivery').addEventListener('click', e => openModal({ title: 'Delivery & Return', html: `
    <h3>Delivery</h3>
    <ul><li>Inside Dhaka: 60৳ — delivered in 1–2 working days.</li><li>Outside Dhaka: 120৳ — delivered in 3–5 working days.</li><li>Free delivery on all orders above 5,000৳.</li><li>Pay with Cash on Delivery, bKash, Nagad, Rocket or card (via SSLCOMMERZ).</li></ul>
    <h3>Returns &amp; exchanges</h3>
    <ul><li>Exchange within 10 days of delivery for a different size or product.</li><li>Items must be unworn, with original box and tags.</li><li>Contact us on ${SITE.phone} or ${SITE.email} to start an exchange.</li></ul>` }, e.currentTarget));

  /* Share links */
  const url = encodeURIComponent(location.href), text = encodeURIComponent(p.name);
  $('#share').insertAdjacentHTML('beforeend', [
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${url}`],
    ['xTwitter', 'X (Twitter)', `https://twitter.com/intent/tweet?url=${url}&text=${text}`],
    ['pinterest', 'Pinterest', `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`],
    ['tumblr', 'Tumblr', `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${text}`]
  ].map(([ic, label, href]) => `<a href="${href}" target="_blank" rel="noopener" aria-label="Share on ${label}">${ICONS[ic]}</a>`).join(''));

  /* ---------- 5.3 Tabs ---------- */
  const sizeList = p.sizes.map(s => s.size).join(', ');
  $('#tabs').innerHTML = `
    <div class="tabs__list" role="tablist" aria-label="Product details">
      <button class="tabs__btn" role="tab" id="tab-desc" aria-controls="panel-desc" aria-selected="true">Description</button>
      <button class="tabs__btn" role="tab" id="tab-info" aria-controls="panel-info" aria-selected="false" tabindex="-1">Additional information</button>
    </div>
    <div class="tabs__panel" role="tabpanel" id="panel-desc" aria-labelledby="tab-desc" tabindex="0">
      <ul class="specs">${Object.entries(p.specs).map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`).join('')}</ul>
      ${p.description.map(t => `<p>${escapeHTML(t)}</p>`).join('')}
    </div>
    <div class="tabs__panel" role="tabpanel" id="panel-info" aria-labelledby="tab-info" tabindex="0" hidden>
      <table class="attr"><tbody>
        <tr><th scope="row">Size</th><td>${sizeList}</td></tr>
        <tr><th scope="row">Colour</th><td>${p.specs.Colour || '—'}</td></tr>
        <tr><th scope="row">Weight</th><td>${p.specs.Weight || '—'}</td></tr>
      </tbody></table>
    </div>`;
  const tabs = $$('[role="tab"]');
  function selectTab(t) {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      $('#' + x.getAttribute('aria-controls')).hidden = !on;
    });
    t.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') selectTab(tabs[(i + 1) % tabs.length]);
      if (e.key === 'ArrowLeft') selectTab(tabs[(i - 1 + tabs.length) % tabs.length]);
    });
  });

  /* ---------- 5.4 Related products ---------- */
  let related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id);
  if (related.length < 4) related = related.concat(PRODUCTS.filter(x => x.category !== p.category && x.category !== 'accessories').slice(0, 8 - related.length));
  $('#related').innerHTML = carouselHTML(related.slice(0, 8).map(x => cardHTML(x)).join(''), 'Related products');
  initCarousel($('#related .carousel'));

  Wishlist.sync();
})();
