# AURELLE FRAGRANCES

A frontend-only luxury perfume store for Addis Ababa, built as a portfolio project.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Zustand, Framer Motion, React Hook Form + Zod, Lucide.

## Features
- Home with hero, family shortcuts, featured collections, best sellers, new arrivals, story, testimonials, newsletter
- Shop: search, filters (family, gender, brand, price, availability), sorting, loading skeletons, mobile filter panel
- Product page: image gallery, sizes (30/50/100ml), notes, quantity, cart, wishlist, related products
- Cart and wishlist persisted in LocalStorage; prices in ETB; Br 150 delivery in Addis Ababa, free over Br 5,000
- Checkout with Ethiopian phone validation and a simulated order number (cash on delivery, no real payments)
- WhatsApp ordering via `VITE_WHATSAPP` (see `.env.example`), contact form, toasts, empty states, 404 page
- Page transitions and scroll reveals with Framer Motion

## Getting started
```bash
npm install
cp .env.example .env   # set your WhatsApp number
npm run dev
npm run build && npm run preview
```

## Architecture
```
src/
  data/products.ts   catalog (20 listings) and types
  store.ts           Zustand cart/wishlist/toast state, pricing and delivery logic
  components.tsx     product card, image with fallback, skeleton, reveal
  pages.tsx          route pages and form schemas
  App.tsx            layout, navigation, routes
```

## Deployment (GitHub to Netlify)
1. Push this repository to GitHub.
2. In Netlify choose "Import from Git" and select it.
3. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
4. Add `VITE_WHATSAPP` under Site settings, Environment variables.

`netlify.toml` and `public/_redirects` rewrite all paths to `index.html`, so page refreshes do not 404.

## Screenshots
Add images to `docs/` and link them here.

## Notes
Product images come from Unsplash with a branded fallback if one fails to load. No API keys, backend or payment processing are used.
