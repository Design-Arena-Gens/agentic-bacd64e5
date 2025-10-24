'use client';

import useSWR from 'swr';
import Link from 'next/link';
import type { Category } from '../types';

export default function CategoryGrid() {
  const { data: categories } = useSWR<Category[]>('/api/categories');

  if (!categories?.length) {
    return null;
  }

  return (
    <section className="container-responsive py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge bg-primary-100 text-primary-700">Browse categories</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Curated verticals tuned for high performance.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Discover services across culinary, wellness, hospitality, and home experiences.
          </p>
        </div>
        <Link
          href="/categories"
          className="rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-300 hover:bg-primary-50"
        >
          Explore all categories
        </Link>
      </div>
      <div className="mt-8 grid-auto-fit">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="glass-panel card-hover flex flex-col gap-3 p-6"
            aria-label={`Browse ${category.name}`}
          >
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{category.description}</p>
            </div>
            <span className="text-sm font-semibold text-primary-500">View services →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
