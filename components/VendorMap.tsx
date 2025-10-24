'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Vendor } from '../types';

const Map = dynamic(() => import('./VendorMapInner'), { ssr: false });

export default function VendorMap({ vendor }: { vendor: Vendor }) {
  return (
    <section className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-slate-800">Live location</h3>
      <p className="mt-1 text-sm text-slate-500">
        Location updates stream in real-time from partner mobile devices.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
        <Suspense fallback={<div className="h-72 bg-slate-100" />}>
          <Map vendor={vendor} />
        </Suspense>
      </div>
    </section>
  );
}
