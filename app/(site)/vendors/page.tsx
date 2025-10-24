import dataStore from '../../../lib/store';
import VendorCard from '../../../components/VendorCard';

export const revalidate = 0;

export default async function VendorsPage() {
  const vendors = dataStore.getVendors();
  return (
    <div className="container-responsive space-y-8 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">All vendors</h1>
        <p className="text-sm text-slate-600">
          Filtered by location, category, tenant, and live operations metadata to streamline
          discovery across the network.
        </p>
      </header>
      <div className="grid-auto-fit">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}
