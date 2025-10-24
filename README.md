# PulseMarket

PulseMarket is a real-time, location-aware, multi-tenant marketplace platform designed for the web. The stack is built for deployment on Vercel using Next.js 14 with the App Router, Tailwind CSS, Socket.IO, Leaflet, and Zustand.

## Features

- **Client Marketplace**
  - Responsive grid-based layout with accessibility-first components.
  - Hero search with dynamic filters for categories and locations.
  - Vendor profiles featuring interactive maps, live availability, and ratings.
  - Real-time ticker streaming pricing, availability, order, and location events.
  - Cart and booking workflow with checkout handoff placeholders for Stripe and PayPal.
  - Leaflet-powered map visualizations with dynamic vendor coordinates.

- **Admin Console**
  - Tenant-focused control center with sidebar navigation.
  - Dashboard metrics, revenue breakdowns, live order velocity table, and activity feed.
  - Vendor, service, user, category, location, reports, CMS, and security management views.
  - Tenant selector (Headless UI Listbox) with dynamic data loading.

- **Backend & Data**
  - In-memory data store with seeded tenants, vendors, services, users, orders, categories, and locations.
  - Real-time simulation loop broadcasting random availability, status, and location updates via Socket.IO.
  - RESTful API routes for vendors, services, orders, categories, locations, tenants, users, and analytics.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:3000`. The Socket.IO server is initialized automatically by visiting any page.

## Deployment

The project is optimized for Vercel. Build using `npm run build` and deploy with `vercel deploy --prod`. Ensure the `VERCEL_TOKEN` environment variable is configured. After deployment, validate the production URL:

```bash
curl https://agentic-bacd64e5.vercel.app
```

## Scripts

- `npm run dev` – start development server
- `npm run build` – create production bundle
- `npm run start` – run production server
- `npm run lint` – run ESLint
- `npm run format` – run Prettier

## Environment Assumptions

The sample project uses an in-memory data store and simulation loop for demonstration. Integrate a persistent database, authentication provider, and payment gateways before production use.
