/* =====================================================================
   ZAPATOS — Home page
   ===================================================================== */
(function () {
  /* ---------- Hero slider ---------- */
  const SLIDES = [
    { cls: '', bg: LIFESTYLE.hero1, eyebrow: 'Zapatos · Dhaka 2026', title: 'Coming Soon', tag: 'h1',
      text: 'Our new Monsoon Collection lands this month — water-ready grip, breathable knit and colours made for Bangladesh streets.',
      cta: 'Get Early Access', href: 'shop.html?category=mens-sneakers', card: { name: 'Model 001', sub: 'Dhaka Red', id: 1 } },
    { cls: 'hero__slide--maroon', bg: LIFESTYLE.hero2, eyebrow: 'New season', title: 'Walk Your City', tag: 'h2',
      text: "From Gulshan to Old Dhaka — light, cushioned sneakers built for long days, rickshaw rides and late-night adda.",
      cta: 'Shop Men', href: 'shop.html?category=mens-sneakers', card: { name: 'Model 002', sub: 'Padma White', id: 2 } },
    { cls: 'hero__slide--crimson', bg: LIFESTYLE.hero3, eyebrow: 'Up to 20% off', title: 'Big Sale', tag: 'h2',
      text: 'Selected sneakers and slides at their lowest prices of the year. Cash on delivery all over Bangladesh.',
      cta: 'Shop the Sale', href: 'shop.html?category=sale', card: { name: 'Model 005', sub: 'Monsoon Blue', id: 5 } }
  ];
  const hero = $('#hero');
  hero.innerHTML = SLIDES.map((s, i) => {
    const p = getProduct(s.card.id);
    return `<div class="hero__slide ${s.cls}${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}" ${i ? 'aria-hidden="true"' : ''}>
      <img class="hero__bg" src="${s.bg}" alt="" data-nofallback width="1800" height="900" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
      <div class="hero__inner">
        <p class="hero__eyebrow">${s.eyebrow}</p>
        <${s.tag} class="hero__title">${s.title}</${s.tag}>
        <p class="hero__text">${s.text}</p>
        <a href="${s.href}" class="btn btn--light" ${i ? 'tabindex="-1"' : ''}>${s.cta}<span class="btn__circle">${ICONS.arrowRight}</span></a>
      </div>
      <div class="hero__card">
        <div class="hero__card-top"><span>${s.card.name}<br>${s.card.sub}</span><a href="product.html?id=${p.id}" aria-label="View ${escapeHTML(p.name)}" ${i ? 'tabindex="-1"' : ''}>${ICONS.arrowUpRight}</a></div>
        <img src="${p.images[0]}" alt="${escapeHTML(p.name)}" width="300" height="300">
        <span class="hero__card-price">${formatPrice(effectivePrice(p))}</span>
      </div>
    </div>`;
  }).join('') + `<div class="hero__dots">${SLIDES.map((_, i) => `<button class="hero__dot${i === 0 ? ' is-active' : ''}" aria-label="Go to slide ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div>`;

  const slides = $$('.hero__slide', hero), dots = $$('.hero__dot', hero);
  let current = 0, timer = null;
  function go(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === current;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', !on);
      $$('a', s).forEach(a => on ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1'));
    });
    dots.forEach((d, i) => { d.classList.toggle('is-active', i === current); i === current ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'); });
  }
  const play = () => { stop(); timer = setInterval(() => go(current + 1), 5000); };
  const stop = () => clearInterval(timer);
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); play(); }));
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', play);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', play);
  // Swipe on touch
  let startX = null;
  hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stop(); }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
    startX = null; play();
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();

  /* ---------- Category masonry ---------- */
  const acc = PRODUCTS.find(p => p.category === 'accessories');
  const slide = PRODUCTS.find(p => p.category === 'slides');
  $('#cats').innerHTML = `
    <a href="shop.html?category=mens-sneakers" class="tile tile--lg"><img src="${LIFESTYLE.catMen}" alt="Men's sneakers collection" width="900" height="900" loading="lazy"><span class="tile__label">Men's Sneakers</span></a>
    <div class="cats__right">
      <a href="shop.html?category=womens-sneakers" class="tile tile--sq"><img src="${LIFESTYLE.catWomen}" alt="Women's sneakers collection" width="600" height="600" loading="lazy"><span class="tile__label">Women's Sneakers</span></a>
      <a href="shop.html?category=slides" class="tile tile--sq"><img src="${slide.images[1]}" alt="Slides collection" width="600" height="600" loading="lazy"><span class="tile__label">Slides</span></a>
      <a href="shop.html?category=accessories" class="tile tile--acc">
        <span class="tile__media"><img src="${acc.images[0]}" alt="Sneaker cleaner and care accessories" width="600" height="500" loading="lazy"></span>
        <span class="tile__copy"><p>Cleaners, laces, socks &amp; more</p><span class="tile__label">Accessories</span></span>
      </a>
    </div>`;

  /* ---------- Feature block (from the reference design) ---------- */
  $('#feature').innerHTML = `
    <img class="feature__img" src="${LIFESTYLE.feature1}" alt="Colourful running sneakers stacked together" width="900" height="1125" loading="lazy">
    <div class="feature__copy">
      <h2 class="feature__title" id="feature-title">Work. Fun. Daily Sprints.<br>All in the same shoes.</h2>
      <p>Zapatos sneakers are versatile, durable and super supportive. They're your perfect pair for busy office days, last-minute trips to Cox's Bazar and relaxed evening walks by the lake.</p>
      <a href="shop.html?category=mens-sneakers" class="btn btn--outline btn--pill-arrow">Shop Now<span class="btn__circle">${ICONS.arrowRight}</span></a>
      <img class="feature__img2" src="${LIFESTYLE.feature2}" alt="Close-up of a grey knit sneaker" width="900" height="560" loading="lazy">
    </div>`;

  /* ---------- Trending & best seller grids ---------- */
  const shoes = PRODUCTS.filter(p => p.category.endsWith('sneakers'));
  const trending = [...shoes].sort((a, b) => b.addedAt - a.addedAt).filter((_, i) => i % 2 === 0).slice(0, 12);
  const best = [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
  $('#trending').innerHTML = trending.map(p => cardHTML(p)).join('');
  $('#bestseller').innerHTML = best.map(p => cardHTML(p)).join('');

  /* ---------- Blog preview ---------- */
  $('#blog-pair').innerHTML = BLOG_POSTS.slice(0, 2).map(b => blogCardHTML(b)).join('');

  /* ---------- Instagram row ---------- */
  $('#insta').innerHTML = INSTAGRAM.map(i =>
    `<a class="insta__item" href="${i.url}" target="_blank" rel="noopener" aria-label="${i.alt} (opens in new tab)">
      <img src="${i.img}" alt="${i.alt}" width="500" height="500" loading="lazy"><span class="insta__ic">${ICONS.instagram}</span></a>`).join('');

  Wishlist.sync();
})();
