'use client';

import Link from 'next/link';
import { MapPinIcon, StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import type { Vendor } from '../types';
import clsx from 'clsx';

type VendorCardProps = {
  vendor: Vendor;
};

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <article className="glass-panel card-hover flex flex-col gap-4 overflow-hidden">
      <div
        className="relative h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${vendor.logoUrl})` }}
        role="img"
        aria-label={`${vendor.name} brand image`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10" />
        {vendor.featured ? (
          <span className="badge absolute left-4 top-4 bg-white/90 text-primary-600">
            Featured
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5">
        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-800">{vendor.name}</h3>
            {vendor.verified ? (
              <CheckBadgeIcon className="h-5 w-5 text-primary-500" aria-label="Verified vendor" />
            ) : null}
          </div>
          <p className="text-sm text-slate-500 line-clamp-3">{vendor.description}</p>
        </header>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-600">
            <StarIcon className="h-4 w-4" />
            {vendor.rating.toFixed(1)} ({vendor.reviewCount})
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
            <MapPinIcon className="h-4 w-4" />
            {vendor.address}
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {vendor.categories.map((category) => (
            <span
              key={category}
              className={clsx(
                'badge bg-slate-100 text-slate-600',
                vendor.featured && 'bg-primary-100 text-primary-700'
              )}
            >
              {category.replace('cat_', '').replace(/_/g, ' ')}
            </span>
          ))}
        </div>
        <Link
          href={`/vendors/${vendor.id}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          View profile & services
        </Link>
      </div>
    </article>
  );
}
