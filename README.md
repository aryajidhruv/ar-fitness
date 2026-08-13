# AR Fitness — Website + Admin Dashboard

Next.js 14 (App Router) + MongoDB + Cloudinary + NextAuth. Public site is
server-rendered for SEO; `/admin` is a password-protected dashboard for
uploading transformations, gallery photos, testimonials, and editing
contact info / hours.

## 1. Install

```bash
npm install
```

## 2. Set up services

- **MongoDB**: create a free cluster at mongodb.com/cloud/atlas, get the
  connection string.
- **Cloudinary**: create a free account at cloudinary.com, get your cloud
  name, API key, and API secret from the dashboard. This stores your
  transformation photos and videos.

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- `MONGODB_URI` — your Atlas connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` locally, your real domain in production
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use once to seed the admin account
- `CLOUDINARY_*` — from your Cloudinary dashboard
- `NEXT_PUBLIC_SITE_URL` — your real domain (used in metadata, sitemap, JSON-LD)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — fallback only; the number shown on the
  live site actually comes from Settings in the dashboard, so you can
  change it without redeploying

## 4. Create the admin login

```bash
npm run seed:admin
```

This reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `.env.local` and creates the
one admin account. Run it again any time to reset the password.

## 5. Run locally

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/login

Log in, then go to **Settings** first and fill in the WhatsApp number,
address, and hours — everything else on the site reads from there.

## 6. Deploy (Vercel)

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add all the same environment variables in Vercel's Project Settings →
   Environment Variables.
4. Deploy. Then run `npm run seed:admin` once against your production
   `MONGODB_URI` (either locally with `.env.local` pointed at prod Mongo,
   or via a one-off script) to create the live admin login.

## How content flows

- Everything you upload in `/admin` is stored in MongoDB (text/metadata)
  and Cloudinary (photos/videos).
- Every save in the dashboard calls `revalidatePath()`, which rebuilds the
  public homepage in the background — new content appears within seconds
  without a redeploy.
- The public pages fetch data directly from MongoDB on the server (not
  through the browser), so Google sees fully-rendered HTML — this is what
  makes the SEO metadata, JSON-LD, and content itself crawlable.

## SEO checklist already wired in

- Per-page `<title>`/description via `generateMetadata`, driven by your
  Settings
- Open Graph + Twitter card tags (add a real `public/og-image.jpg`, 1200×630)
- `HealthClub` JSON-LD structured data (address, hours, geo) — helps you
  show up in Google's local map pack
- `/sitemap.xml` and `/robots.txt` auto-generated (`app/sitemap.js`,
  `app/robots.js`)
- `/admin` is excluded from indexing and from the sitemap
- Images use `next/image` for automatic optimization; every gallery photo
  requires alt text in the dashboard (that's the actual SEO value, not
  decoration)

**Still worth doing yourself:** claim and fill out AR Fitness on Google
Business Profile with the same name/address/phone as in Settings — for a
local gym, that matters more for search visibility than anything on the
site itself.

## Project structure

```
app/
  layout.js            root layout, metadata, JSON-LD
  page.js              homepage (server component, fetches from MongoDB)
  sitemap.js, robots.js
  api/                 REST routes (transformations, gallery, testimonials,
                        settings, upload, auth)
  admin/                dashboard pages (protected by middleware.js)
components/            public-site UI (Hero, Scrubber, Gallery, etc.)
components/admin/       dashboard UI (AdminShell, UploadField)
models/                 Mongoose schemas
lib/                    db connection, auth config, Cloudinary, data fetchers
scripts/seed-admin.js   creates the one admin login
```
