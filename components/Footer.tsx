'use client';

import Link from 'next/link';

const footerLinks = {
  marketplace: [
    { label: 'Discover', href: '/' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'Services', href: '/categories' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' }
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ]
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="container-responsive py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-primary-600">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                PM
              </span>
              PulseMarket
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Real-time multi-vendor marketplace platform for ambitious local commerce operators.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link className="hover:text-primary-600" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} PulseMarket. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/security">Security</Link>
            <Link href="mailto:hello@pulsemarket.io">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
