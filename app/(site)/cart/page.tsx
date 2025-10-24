'use client';

import Link from 'next/link';
import useCart from '../../../hooks/useCart';
import { useMemo } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clear } = useCart();

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
    const tax = subtotal * 0.0875;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  return (
    <div className="container-responsive space-y-8 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Your bookings</h1>
        <p className="text-sm text-slate-500">
          Review items, adjust quantities, and confirm checkout with secure payment providers.
        </p>
      </header>
      {items.length === 0 ? (
        <div className="glass-panel flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-lg font-semibold text-slate-700">Your cart is empty</p>
          <p className="text-sm text-slate-500">
            Discover services across categories and track availability in real-time.
          </p>
          <Link
            href="/search"
            className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Browse marketplace
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-4">
            {items.map((item) => (
              <article key={item.service.id} className="glass-panel flex gap-4 p-5">
                <div
                  className="h-32 w-32 flex-shrink-0 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.service.images[0]})` }}
                  aria-label={item.service.name}
                />
                <div className="flex flex-1 flex-col gap-3">
                  <header>
                    <h2 className="text-lg font-semibold text-slate-800">{item.service.name}</h2>
                    <p className="text-sm text-slate-500">{item.service.description}</p>
                  </header>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.service.price)}{' '}
                      per {item.service.unit}
                    </span>
                    <span>Available: {item.service.availability}</span>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-500">
                      Qty
                      <input
                        type="number"
                        min={1}
                        max={item.service.availability}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.service.id, Number(event.target.value))
                        }
                        className="ml-2 w-16 rounded-xl border border-slate-200 px-2 py-1 text-sm text-slate-600 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </label>
                    <button
                      onClick={() => removeItem(item.service.id)}
                      className="text-xs font-semibold text-rose-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
            <button onClick={clear} className="text-xs font-semibold text-slate-500">
              Clear cart
            </button>
          </section>
          <aside className="glass-panel space-y-4 p-5">
            <h3 className="text-lg font-semibold text-slate-800">Order summary</h3>
            <dl className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>
                  {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                    totals.subtotal
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd>
                  {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                    totals.tax
                  )}
                </dd>
              </div>
              <div className="flex justify-between text-base font-semibold text-slate-800">
                <dt>Total due</dt>
                <dd>
                  {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                    totals.total
                  )}
                </dd>
              </div>
            </dl>
            <button className="w-full rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
              Checkout with Stripe
            </button>
            <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600">
              Pay with PayPal
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
