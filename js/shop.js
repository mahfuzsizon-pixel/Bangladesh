/* =====================================================================
   ZAPATOS — Shop / category listing page
   URL: shop.html?category=mens-sneakers|womens-sneakers|slides|accessories|sale
        (&gender=men|women for the Slides sub-pages)
   ===================================================================== */
(function () {
  const params = new URLSearchParams(location.search);
  const catKey = CATEGORIES[params.get('category')] ? params.get('category') : 'all';
  const gender = params.get('gender');
  const cat = CATEGORIES[catKey] || { name: 'Shop', banner: 'photo', subtitle: 'All Zapatos sneakers, slides and accessories in one place' };
  const PER_PAGE = 16;

  /* ---------- Title, meta & banner ---------- */
  const pageTitle = catKey === 'slides' && gender ? `${gender === 'men' ? 'Men' : 'Women'}'s Slides` : (catKey === 'sale' ? 'SALE' : cat.name);
  document.title = `${pageTitle} — Zapatos Bangladesh`;
  $('meta[name="description"]').setAttribute('content', `${cat.subtitle} Shop ${pageTitle} at Zapatos Bangladesh.`);
  $('meta[property="og:title"]').setAttribute('content', document.title);

  const banner = $('#banner');
  const bannerImg = cat.banner === 'photo' ? LIFESTYLE.shopBanner : cat.banner === 'photo-sale' ? LIFESTYLE.saleBanner : null;
  banner.classList.add(`banner--${cat.banner}`);
  banner.innerHTML = `${bannerImg ? `<img class="banner__img" src="${bannerImg}" alt="" data-nofallback width="1800" height="300">` : ''}
    <div class="banner__copy"><h1>${pageTitle}</h1><p>${cat.subtitle}</p></div>`;

  /* ---------- 4.4 Slides exception: MEN / WOMEN tiles ---------- */
  if (catKey === 'slides' && !gender) {
    $('#shop-content').hidden = true;
    $('#subcats-wrap').hidden = false;
    const men = PRODUCTS.find(p => p.category === 'slides' && p.gender === 'men');
    const women = PRODUCTS.find(p => p.category === 'slides' && p.gender === 'women');
    $('#subcats').innerHTML = `
      <a class="subcat" href="shop.html?category=slides&gender=men"><img src="${men.images[2]}" alt="Men's slides" width="600" height="600"><span class="subcat__label">MEN</span></a>
      <a class="subcat subcat--w" href="shop.html?category=slides&gender=women"><img src="${women.images[2]}" alt="Women's slides" width="600" height="600"><span class="subcat__label">WOMEN</span></a>`;
    return;
  }

  /* ---------- Base product set for this category ---------- */
  let base = catKey === 'all' ? PRODUCTS
    : catKey === 'sale' ? PRODUCTS.filter(p => p.salePrice)
    : PRODUCTS.filter(p => p.category === catKey);
  if (gender) base = base.filter(p => p.gender === gender);

  const maxPrice = Math.ceil(Math.max(...base.map(effectivePrice)) / 50) * 50;
  const state = { sort: 'latest', page: 1, cols: 4, maxPrice, sizes: new Set(), colours: new Set(), avail: new Set() };

  /* ---------- Toolbar ---------- */
  $('#filter-open').innerHTML = `${ICONS.sliders}<span>Filter</span>`;
  $('#filter-open').setAttribute('aria-label', 'Open filters');
  $('#filter-panel [data-close]').innerHTML = ICONS.close;
  const colIcon = n => `<svg viewBox="0 0 ${n * 5} 16" aria-hidden="true" fill="currentColor">${Array.from({ length: n }, (_, i) => `<rect x="${i * 5}" width="3.4" height="16" rx="1"/>`).join('')}</svg>`;
  $('#cols').innerHTML = [2, 3, 4, 6].map(n => `<button aria-label="Show ${n} columns" aria-pressed="${n === 4}" data-cols="${n}">${colIcon(n)}</button>`).join('');
  $('#cols').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    state.cols = +b.dataset.cols;
    $$('#cols button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('#grid').dataset.cols = state.cols;
  });
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; state.page = 1; render(); });

  /* ---------- Filter panel ---------- */
  const price = $('#f-price'), priceOut = $('#f-price-out');
  price.max = maxPrice; price.value = maxPrice;
  const showPrice = () => (priceOut.textContent = formatPrice(price.value));
  price.addEventListener('input', showPrice); showPrice();

  const isShoeCat = catKey !== 'accessories';
  $('#f-sizes').closest('fieldset').hidden = !isShoeCat;
  $('#f-sizes').innerHTML = [39, 40, 41, 42, 43, 44].map(s => `<label class="check"><input type="checkbox" name="size" value="${s}"> ${s}</label>`).join('');
  const SW = { white: '#f4f4f4', black: '#111', red: '#D0021B', blue: '#1e4fd8', grey: '#9aa3ad', yellow: '#F5B800' };
  const coloursHere = [...new Set(base.map(p => p.colour))];
  $('#f-colours').innerHTML = coloursHere.map(c => `<label class="swatch" style="--c:${SW[c]}" title="${c}"><input type="checkbox" name="colour" value="${c}" aria-label="${c}"></label>`).join('');

  $('#filter-open').addEventListener('click', e => openLayer($('#filter-panel'), e.currentTarget));
  $('#f-apply').addEventListener('click', () => {
    const f = $('#filter-form');
    state.maxPrice = +price.value;
    state.sizes = new Set($$('input[name="size"]:checked', f).map(i => +i.value));
    state.colours = new Set($$('input[name="colour"]:checked', f).map(i => i.value));
    state.avail = new Set($$('input[name="avail"]:checked', f).map(i => i.value));
    state.page = 1;
    render();
    closeLayer($('#filter-panel'));
  });
  $('#f-reset').addEventListener('click', () => {
    $('#filter-form').reset(); price.value = maxPrice; showPrice();
    Object.assign(state, { maxPrice, sizes: new Set(), colours: new Set(), avail: new Set(), page: 1 });
    render();
  });

  /* ---------- Filtering + sorting ---------- */
  function results() {
    let list = base.filter(p => {
      if (effectivePrice(p) > state.maxPrice) return false;
      if (state.sizes.size && !p.sizes.some(s => state.sizes.has(s.size) && s.stock > 0)) return false;
      if (state.colours.size && !state.colours.has(p.colour)) return false;
      if (state.avail.size === 1) {
        if (state.avail.has('in') && isSoldOut(p)) return false;
        if (state.avail.has('out') && !isSoldOut(p)) return false;
      }
      return true;
    });
    const sorters = {
      default: (a, b) => a.id - b.id,
      popularity: (a, b) => b.popularity - a.popularity,
      latest: (a, b) => b.addedAt - a.addedAt,
      'price-asc': (a, b) => effectivePrice(a) - effectivePrice(b),
      'price-desc': (a, b) => effectivePrice(b) - effectivePrice(a)
    };
    return list.sort(sorters[state.sort]);
  }

  /* ---------- Render grid + pagination ---------- */
  function render() {
    const list = results();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * PER_PAGE;
    const pageItems = list.slice(start, start + PER_PAGE);

    $('#result-count').textContent = list.length
      ? `Showing ${start + 1}–${start + pageItems.length} of ${list.length} results`
      : '';
    $('#grid').innerHTML = pageItems.length
      ? pageItems.map((p, i) => cardHTML(p, { lazy: i > 7 })).join('')
      : '';
    if (!pageItems.length) {
      $('#grid').innerHTML = `<div class="no-results" style="grid-column:1/-1"><p>No products match your filters.</p><button class="btn btn--dark" id="nr-reset">Reset filters</button></div>`;
      $('#nr-reset').addEventListener('click', () => $('#f-reset').click());
    }

    const pager = $('#pager');
    if (pages <= 1) { pager.hidden = true; } else {
      pager.hidden = false;
      let html = '';
      if (state.page > 1) html += `<button data-page="${state.page - 1}" aria-label="Previous page">${ICONS.arrowRight.replace('<svg', '<svg style="transform:scaleX(-1)"')}</button>`;
      for (let i = 1; i <= pages; i++) html += `<button data-page="${i}" ${i === state.page ? 'aria-current="page"' : ''} aria-label="Page ${i}">${i}</button>`;
      if (state.page < pages) html += `<button data-page="${state.page + 1}" aria-label="Next page">${ICONS.arrowRight}</button>`;
      pager.innerHTML = html;
    }
    Wishlist.sync();
  }
  $('#pager').addEventListener('click', e => {
    const b = e.target.closest('[data-page]'); if (!b) return;
    state.page = +b.dataset.page;
    render();
    $('#toolbar').scrollIntoView({ behavior: 'smooth' });
  });

  render();
})();
