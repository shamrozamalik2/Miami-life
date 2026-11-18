# Real Estate Miami Life — Website Concept

Concept preview of a real estate website for Real Estate Miami Life, Miami, Florida.

## Run

```bash
npm install
npm run dev       # local development
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Stack: React 19, Vite, Tailwind CSS v4, React Router, Lucide icons, [Motion](https://motion.dev) (animation) and [Lenis](https://lenis.darkroom.engineering) (smooth scrolling). JavaScript only.

### Motion system (`src/components/motion/`)

| Component | Effect |
|---|---|
| `Intro` | Branded preloader, once per browser session; hero animations wait for it |
| `PageTransition` | Navy curtain between routes |
| `SmoothScroll` | Lenis inertial scrolling + `useScrollLock` for menus and modals |
| `SplitText` | Word-by-word masked headline reveal |
| `RevealImage` | Clip-path image wipe + scroll parallax |
| `ScrollHighlightText` | Statement words light up as you scroll |
| `Marquee` | Neighborhood ticker that leans with scroll speed |
| `Magnetic` | Buttons pulled toward the pointer |
| `CustomCursor` | Cursor ring with labels ("View", "Explore") on desktop |
| `CountUp`, `ScrollProgress` | Rating count-up, reading progress bar |

The homepage's featured listings pin and scroll sideways on desktop (a swipe carousel on mobile), neighborhoods show a cursor-following photo preview, and listing results animate when filters change.
Everything respects `prefers-reduced-motion`: no intro, no smooth scroll, no cursor follower, and no transform animations.

## Structure

```
src/
  data/company.js        verified business details (phone, rating, Google review excerpts) and the WhatsApp link helper
  data/properties.js     SAMPLE listings, types, locations and price ranges
  utils/                 price formatting and the listing filter/sort logic
  components/layout/     header, mobile menu, footer, floating WhatsApp button
  components/ui/         logo, SEO tags, scroll reveal, headings, badges
  components/property/   property card, search, gallery, enquiry form
  components/home/       homepage sections
  pages/                 Home, Properties, Property Details, About, Contact, 404
public/images/           optimized WebP photography
```

Routes: `/`, `/properties` (filters live in the URL, e.g. `?purpose=rent&beds=3`), `/properties/:slug`, `/about`, `/contact`.

## Demo-only parts to replace before launch

- **Listings**: `src/data/properties.js` is sample data, and the site labels it that way. Replace it with real listings or an MLS/IDX feed.
- **Forms**: `InquiryForm.jsx` only simulates sending. Connect it to email, a CRM or a form service.
- **Reviews**: the 5.0 rating, 23-review count and the three excerpts are copied from the Google Business Profile. Keep them verbatim, or load them live (for example through the Places API).
- **WhatsApp**: the WhatsApp buttons use +1 305-792-8404. Confirm the number is on WhatsApp, or switch those buttons to SMS.
- **Address**: the profile has no public street address, so the site shows the Miami service area. Add the office address if there is one.
- **Concept banner**: remove the gold notice bar in `Header.jsx` and the footer disclaimer.
- **Domain**: once a domain exists, add canonical URLs, absolute `og:image` / `og:url` values and a `sitemap.xml`.

## Live Google reviews

The reviews section loads live reviews, rating and review count from Google with the official Maps JavaScript API (`src/hooks/useGoogleReviews.js`). Google returns **at most 5 reviews** per business. Results are cached per browser session.

1. In Google Cloud Console, create a project with billing, then enable **Maps JavaScript API** and **Places API (New)**.
2. Create an API key and restrict it to **HTTP referrers** (your domain, e.g. `https://your-site.onrender.com/*`) and to those two APIs. The key ships in the browser bundle, so the referrer restriction is what protects it.
3. Copy `.env.example` to `.env` and set `VITE_GOOGLE_MAPS_API_KEY` (and optionally `VITE_GOOGLE_PLACE_ID`).
4. On Render, add the same variables under **Environment** and redeploy. Vite inlines them at build time.

Without a key, or if the request fails, the section shows the verbatim excerpts in `src/data/company.js`. Review text is displayed unmodified, with author attribution and "Reviews from Google", as Google's policies require.

## Deployment

SPA rewrites are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).
