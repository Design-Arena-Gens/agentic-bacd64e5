'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useCart from '../hooks/useCart';

const links = [
  { href: '/', label: 'Marketplace' },
  { href: '/categories', label: 'Categories' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/admin', label: 'Admin' }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary-600">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-lg">
            PM
          </span>
          <span className="hidden sm:inline">PulseMarket</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'transition-colors hover:text-primary-600',
                pathname === link.href && 'text-primary-600'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:border-primary-200 hover:bg-primary-50"
            aria-label="Open cart"
          >
            <ShoppingCartIcon className="h-5 w-5 text-slate-600" />
            {cartCount ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-300 hover:bg-primary-50"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
          >
            Join marketplace
          </Link>
        </div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <Bars3Icon className="h-5 w-5 text-slate-600" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden">
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'rounded-lg px-3 py-2',
                  pathname === link.href ? 'bg-primary-50 text-primary-600' : 'hover:bg-slate-50'
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="rounded-lg px-3 py-2 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              Cart
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
