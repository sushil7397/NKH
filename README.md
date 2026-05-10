# Noida's Cake House — Website

A production-ready React + Vite single-page app for **Noida's Cake House** (Sector 12, Noida).
Includes a public marketing site, a filterable cake catalog with detail pages, an
enquiry/contact form, and a protected admin dashboard for managing the catalog,
moderating reviews, and tracking enquiries.

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS** — custom theme (`chocolate / cream / gold`)
- **React Router 6** — public + protected routes
- **Framer Motion** — page & element animations
- **Lucide React** — icons
- **React Hook Form** — form validation (enquiry, review, admin CRUD)
- **localStorage** — mock persistence layer (swap with Supabase / Firebase later)

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Demo admin login

| Field    | Value             |
|----------|-------------------|
| Username | `admin`           |
| Password | `cakehouse@2017`  |

(Configured in `src/context/AuthContext.jsx`. Replace with Supabase / Firebase Auth in production.)

## Project structure

```
src/
├── App.jsx                    # routes + layout switching
├── main.jsx                   # providers (Auth, Data) + Router
├── index.css                  # Tailwind + design tokens
│
├── components/
│   ├── Header.jsx             # sticky navigation (mobile-first)
│   ├── Footer.jsx             # address, hours, social, quick links
│   ├── CakeCard.jsx           # reusable card with framer-motion entrance
│   ├── CakePlaceholder.jsx    # SVG illustration (replaces real photo)
│   ├── TestimonialSlider.jsx  # auto-rotating reviews carousel
│   ├── Modal.jsx              # accessible modal + ESC + backdrop close
│   ├── ProtectedRoute.jsx     # admin route guard
│   └── PageTransition.jsx     # framer wrapper for all pages
│
├── context/
│   ├── AuthContext.jsx        # mock admin auth (localStorage backed)
│   └── DataContext.jsx        # cakes / reviews / enquiries store
│
├── data/
│   └── cakes.js               # seed catalog + categories + seed reviews
│
└── pages/
    ├── Home.jsx               # hero + stats + bestsellers + testimonials
    ├── Cakes.jsx              # category filters, search, eggless toggle, sort
    ├── CakeDetail.jsx         # /cake/:id + weight picker + reviews + WhatsApp
    ├── About.jsx              # story, values, timeline (8-year journey)
    ├── Contact.jsx            # form + Google Map + Click-to-Call + WhatsApp
    ├── NotFound.jsx
    └── admin/
        ├── AdminLogin.jsx
        ├── AdminLayout.jsx    # sidebar + topbar + outlet
        ├── AdminDashboard.jsx # stat cards + recent enquiries + recent reviews
        ├── ManageCakes.jsx    # table + add/edit modal (CRUD)
        ├── ManageReviews.jsx  # approve / hide / delete
        └── ManageEnquiries.jsx# filter by status (new / contacted / closed)
```

## Routes

| Path               | Description                                    |
|--------------------|------------------------------------------------|
| `/`                | Landing page                                   |
| `/cakes`           | Cake catalog with filters                      |
| `/cake/:id`        | Cake detail with reviews + enquiry modal       |
| `/about`           | Our story + timeline                           |
| `/contact`         | Enquiry form + map + quick contact             |
| `/admin/login`     | Admin sign-in                                  |
| `/admin`           | Dashboard overview (protected)                 |
| `/admin/cakes`     | CRUD interface                                 |
| `/admin/reviews`   | Moderation                                     |
| `/admin/enquiries` | Lead management                                |

## Design system

The Tailwind config defines a small bakery palette:

| Token        | Hex       | Usage                 |
|--------------|-----------|-----------------------|
| `chocolate`  | `#3E2723` | Primary text, surfaces |
| `cream`      | `#FFFDD0` | Page background, copy on dark |
| `gold`       | `#D4AF37` | CTAs, badges, accents |

Plus reusable utility classes in `index.css`:
`.btn`, `.btn-primary`, `.btn-gold`, `.btn-outline`, `.btn-ghost`,
`.input`, `.label`, `.card`, `.chip`, `.section`.

## Replacing mock data with Supabase / Firebase

`src/context/DataContext.jsx` is intentionally small. Swap the
`useState + localStorage` reads/writes with Supabase/Firebase calls and the rest
of the app keeps working unchanged. For React Query / TanStack caching, wrap
`DataProvider` with `QueryClientProvider` in `main.jsx` and replace the array
state with `useQuery` / `useMutation` hooks.

For images, the `CakePlaceholder` SVG component can be replaced with an `<img>`
tag once you have real photography (or a Supabase Storage / Firebase Storage URL).

## Notes

- WhatsApp links use placeholder `+91 88501 98961` — replace `WHATSAPP_NUMBER` and
  `PHONE_NUMBER` constants in `Header.jsx`, `Footer.jsx`, `Contact.jsx`,
  `CakeDetail.jsx` with the real number.
- The Google Map iframe currently embeds a "Sector 12, Noida" search; replace with
  your exact business listing URL or a Maps Embed API key for finer control.
- All persistence is localStorage — clearing browser storage resets to the seed data.
  The admin sidebar has a "Reset demo data" button to do this from inside the app.
