import dataStore from '../../lib/store';
import ServiceCard from '../ServiceCard';

export default function TrendingServices() {
  const services = dataStore
    .getServices()
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  if (!services.length) return null;

  return (
    <section className="container-responsive space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge bg-primary-100 text-primary-700">Trending now</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            High-velocity services with live pricing and availability.
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-500">
          Streamed updates from each vendor keep availability, pricing, and fulfillment targets
          synced with customer demand.
        </p>
      </div>
      <div className="grid-auto-fit">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
