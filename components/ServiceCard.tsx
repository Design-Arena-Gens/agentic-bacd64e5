'use client';

import { CurrencyDollarIcon, BoltIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { Service, Vendor } from '../types';
import useSWR from 'swr';
import useCart from '../hooks/useCart';
import { useCallback } from 'react';

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const { data: vendor } = useSWR<Vendor>(`/api/vendors/${service.vendorId}`, async (url) => {
    const response = await fetch(url);
    const { vendor } = (await response.json()) as { vendor: Vendor };
    return vendor;
  });
  const { addItem } = useCart();
  const handleAddToCart = useCallback(() => {
    addItem(service);
  }, [addItem, service]);

  return (
    <article className="glass-panel card-hover flex flex-col overflow-hidden">
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.images[0]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent" />
        {service.promoted ? (
          <span className="badge absolute left-4 top-4 bg-white/90 text-primary-600">
            Promoted
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{service.name}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
            <CurrencyDollarIcon className="h-4 w-4" />
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(service.price)}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-slate-500">{service.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
            <BoltIcon className="h-4 w-4 text-primary-500" />
            {service.availability} available
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            {service.rating.toFixed(1)} ({service.reviewCount})
          </span>
        </div>
        <div className="mt-auto border-t border-slate-200 pt-4 text-sm text-slate-500">
          <div className="font-semibold text-slate-700">{vendor?.name ?? 'Loading vendor…'}</div>
          <p>Updated {new Date(service.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-300 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Add to cart
          </button>
          <Link
            href={`/vendors/${service.vendorId}?service=${service.id}`}
            className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}
