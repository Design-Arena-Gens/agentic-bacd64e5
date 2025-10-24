import dataStore from '../../lib/store';
import VendorCard from '../VendorCard';

export default function FeaturedVendors() {
  const vendors = dataStore.getVendors().filter((vendor) => vendor.featured).slice(0, 6);
  if (!vendors.length) return null;

  return (
    <section className="container-responsive space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge bg-primary-100 text-primary-700">Featured vendors</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Trusted operators with verified performance data.
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-500">
          Partners selected for service quality, fulfillment speed, and customer satisfaction. See
          live capacity signals and book in minutes.
        </p>
      </div>
      <div className="grid-auto-fit">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}
