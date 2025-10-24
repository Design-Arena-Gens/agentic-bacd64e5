'use client';

import { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/70 p-6 backdrop-blur">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Admin Control Center</h1>
        <p className="text-sm text-slate-500">
          Monitor tenant portfolios, configure marketplace levers, and orchestrate real-time
          operations.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-100">
          <MagnifyingGlassIcon className="h-5 w-5 text-primary-500" />
          <span className="sr-only">Search admin console</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by vendor, user, or order"
            className="w-48 border-0 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
          />
        </label>
        <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-primary-200 hover:bg-primary-50">
          <BellIcon className="h-5 w-5 text-slate-500" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500" />
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </div>
  );
}
