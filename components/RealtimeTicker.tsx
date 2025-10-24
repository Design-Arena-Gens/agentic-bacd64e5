'use client';

import { useEffect, useState } from 'react';
import useRealtime from '../hooks/useRealtime';
import type { RealtimeEvent } from '../types';

const formatEvent = (event: RealtimeEvent) => {
  switch (event.type) {
    case 'service.availability':
      return `Availability update: ${event.serviceId} now at ${event.availability}`;
    case 'service.price':
      return `Price update: ${event.serviceId} now ${Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(event.price)}`;
    case 'order.status':
      return `Order ${event.orderId} marked ${event.status.replace('_', ' ')}`;
    case 'vendor.location':
      return `Vendor ${event.vendorId} updated location (${event.latitude.toFixed(
        3
      )}, ${event.longitude.toFixed(3)})`;
    case 'tenant.plan':
      return `Tenant ${event.tenantId} switched to ${event.plan} plan`;
    default:
      return 'Marketplace update';
  }
};

export default function RealtimeTicker() {
  const { lastEvent } = useRealtime();
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!lastEvent) return;
    setEvents((prev) => {
      const formatted = formatEvent(lastEvent);
      if (prev[0] === formatted) return prev;
      return [formatted, ...prev].slice(0, 5);
    });
  }, [lastEvent]);

  if (!events.length) {
    return null;
  }

  return (
    <div className="bg-primary-600 text-white">
      <div className="container-responsive flex flex-wrap items-center gap-3 py-3 text-sm">
        <span className="rounded-full bg-white/20 px-3 py-1 font-semibold uppercase tracking-wide">
          Live now
        </span>
        <div className="flex-1 overflow-hidden">
          <ul className="flex gap-6 text-white/90">
            {events.map((event, index) => (
              <li key={`${event}-${index}`} className="truncate">
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
