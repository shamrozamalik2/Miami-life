# Real Estate Miami Life — Website Concept

Concept preview of a real estate website for Real Estate Miami Life, Miami, Florida.

## Run

```bash
npm install
npm run dev       # local development
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Stack: React 19, Vite, Tailwind CSS v4, React Router, Lucide icons. JavaScript only.

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

## Deployment

SPA rewrites are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).
