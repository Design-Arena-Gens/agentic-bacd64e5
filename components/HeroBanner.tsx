'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type HeroBannerProps = {
  totalVendors: number;
  totalServices: number;
};

export default function HeroBanner({ totalVendors, totalServices }: HeroBannerProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative container-responsive py-20">
        <div className="max-w-3xl space-y-6">
          <span className="badge bg-primary-100 text-primary-700">Real-time marketplace</span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Discover trusted vendors with live availability in your neighborhood.
          </h1>
          <p className="text-lg text-slate-600">
            PulseMarket connects consumers with curated local vendors across food, wellness, home,
            and events. Search by location, manage bookings, and see live updates from every
            partner.
          </p>
          <form
            onSubmit={handleSubmit}
            className="glass-panel flex flex-col gap-3 border-primary-100/60 p-4 shadow-xl sm:flex-row sm:items-center"
          >
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-200">
              <MagnifyingGlassIcon className="h-5 w-5 text-primary-500" />
              <span className="sr-only">Search services</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by service, category, or vendor"
                className="w-full border-0 bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
                aria-label="Search marketplace"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search marketplace
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <MapPinIcon className="h-5 w-5 text-primary-500" />
              <span>Instant recommendations for 12+ borough clusters</span>
            </div>
            <p>
              {totalVendors}+ vendors • {totalServices}+ services curated per tenant
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center lg:flex">
          <div className="glass-panel relative w-full max-w-xl rounded-[32px] border-primary-100/80 bg-gradient-to-br from-white/80 via-white/40 to-primary-50/40 p-6 shadow-2xl">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                Live activity pulse
              </p>
              <div className="space-y-3 text-sm">
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="font-semibold text-slate-700">Order confirmed</p>
                  <p className="text-slate-500">GreenFork Kitchens · Midtown tasting for 12</p>
                  <p className="mt-1 text-xs text-primary-500">2 minutes ago</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="font-semibold text-slate-700">Class filling fast</p>
                  <p className="text-slate-500">CityZen Evening Flow · 6 seats left</p>
                  <p className="mt-1 text-xs text-primary-500">5 minutes ago</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="font-semibold text-slate-700">Vendor on the move</p>
                  <p className="text-slate-500">Nimble Home Services en route to Brooklyn Heights</p>
                  <p className="mt-1 text-xs text-primary-500">11 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-secondary" />
    </section>
  );
}
