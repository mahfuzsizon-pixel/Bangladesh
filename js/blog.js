/* =====================================================================
   ZAPATOS — Blog post page  (blog.html?id=…)
   ===================================================================== */
(function () {
  const post = BLOG_POSTS.find(b => b.id === Number(new URLSearchParams(location.search).get('id'))) || BLOG_POSTS[0];
  document.title = `${post.title} — Zapatos Blog`;
  $('meta[property="og:title"]').setAttribute('content', document.title);

  /* Top carousel — 2 posts visible */
  $('#blog-top').innerHTML = carouselHTML(BLOG_POSTS.map(b => blogCardHTML(b, 'p')).join(''), 'Blog posts');
  initCarousel($('#blog-top .carousel'));

  /* Main article (placeholder copy — replace with your own posts) */
  const picks = PRODUCTS.filter(p => p.category === 'mens-sneakers' || p.category === 'womens-sneakers').slice(0, 8);
  $('#post').innerHTML = `
    <div class="post__hero">
      <img src="${post.img}" alt="${escapeHTML(post.title)}" width="1200" height="675">
      <div class="post__titlebox">
        <h1>${escapeHTML(post.title)}</h1>
        <p>By ${post.author} in ${post.cats.join(', ')} · ${post.date} · 0 Comments</p>
      </div>
    </div>
    <div class="post__body">
      <p class="lead">One pair that goes from your morning commute to evening plans — that's the idea behind every Zapatos sneaker.</p>
      <p>Life in Bangladesh moves fast. Between packed buses, long office days, family visits and weekend trips, your shoes need to keep up. We designed our versatile sneakers to handle all of it without compromising on style.</p>
      <h2>Why Choose Our Versatile Sneaker?</h2>
      <p>Most people own too many shoes and wear only one pair. A good versatile sneaker removes that problem: neutral colours, a clean silhouette and comfort that lasts all day.</p>
      <h3>Designed for Every Lifestyle</h3>
      <p>Wear them with jeans and a t-shirt, chinos and a shirt, or even a panjabi on a casual day out. Students, professionals and travellers all find a place for them in their routine.</p>
      <h3>Comfort You Can Count On</h3>
      <p>Cushioned sponge-rubber soles and breathable mesh uppers keep your feet cool in humid weather. A padded collar and soft lining reduce rubbing on long walking days.</p>
      <h3>Durability That Lasts</h3>
      <p>Reinforced stitching and a grippy outsole are made for wet monsoon roads and uneven footpaths. With a little care — see our cleaning accessories — your pair will look fresh for seasons.</p>
      <h3>Eco-Friendly and Stylish</h3>
      <p>We are working to use more recycled materials and plastic-free packaging, and we partner with local couriers to reduce delivery distance. Looking good shouldn't cost the planet.</p>
    </div>
    <div class="post__shop">
      <h2 class="divider-title">Shop These Look</h2>
      ${carouselHTML(picks.map(p => cardHTML(p)).join(''), 'Products featured in this post')}
    </div>`;
  initCarousel($('.post__shop .carousel'));

  /* Sidebar: sale products */
  $('#sale-widget').innerHTML = PRODUCTS.filter(p => p.salePrice).slice(0, 5).map(p => `
    <div class="mini"><img src="${p.images[0]}" alt="${escapeHTML(p.name)}" width="70" height="70" loading="lazy">
      <div><a href="product.html?id=${p.id}">${escapeHTML(p.name)}</a>${priceHTML(p)}</div></div>`).join('');

  Wishlist.sync();
})();
