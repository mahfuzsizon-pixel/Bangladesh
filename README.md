# ZAPATOS — Sneaker store website (Bangladesh)

A responsive, multi-page e-commerce front-end for the footwear brand **ZAPATOS**.
Plain HTML + CSS + vanilla JavaScript, with no build step and no backend.

## Structure
```
index.html      Home: hero slider, categories, trending, best sellers, blog, Instagram
shop.html       Category listing (?category=mens-sneakers|womens-sneakers|slides|accessories|sale)
product.html    Single product (?id=1…42)
blog.html       Blog post (?id=1…4)
css/style.css   All styles (design tokens at the top)
js/products.js  Product, category, blog and image data + formatPrice()
js/main.js      Shared header/footer, cart, wishlist, search, toasts, modals, carousel
js/home.js, js/shop.js, js/product.js, js/blog.js   Page scripts
assets/         Logo, favicon, placeholder image
```

## Run locally
Open `index.html` in a browser, or serve the folder (recommended):
```
python3 -m http.server 8000      # then visit http://localhost:8000
```
Or use the VS Code "Live Server" extension.

## Make it yours
- **Contact details:** edit `SITE` at the top of `js/main.js` (phone, email, address, social links).
- **Products:** edit the `SEED` list in `js/products.js`. Each row has name, category, price, sale price, badge, colour and gender. Stock, SKU and specs are generated, and you can replace them with real values.
- **Images:** sneaker photos are Unsplash placeholders (`SHOE_PHOTOS`, `LIFESTYLE`, `INSTAGRAM`, `BLOG_POSTS`). Slides and accessories use drawn SVG placeholders. Put your own photos in `assets/img/` and change the URLs. Any image that fails to load shows `assets/img/placeholder-shoe.svg`.
- **Colours and fonts:** change the CSS variables in `:root` at the top of `css/style.css`.
- **Checkout:** "View Cart" and "Checkout" show a "coming soon" message. Connect them to a backend with SSLCOMMERZ, bKash or Nagad when you are ready.
