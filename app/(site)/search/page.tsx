import dataStore from '../../../lib/store';
import VendorCard from '../../../components/VendorCard';
import ServiceCard from '../../../components/ServiceCard';
import FilterBar from '../../../components/FilterBar';

type SearchPageProps = {
  searchParams: {
    query?: string;
    locationId?: string;
    categoryId?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.query ?? '').toLowerCase();
  const locationId = searchParams.locationId;
  const categoryId = searchParams.categoryId;

  const vendors = dataStore
    .getVendors({ locationId: locationId ?? undefined, categoryId: categoryId ?? undefined })
    .filter((vendor) => {
      if (!query) return true;
      return (
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      );
    });

  const services = dataStore
    .getServices({ locationId: locationId ?? undefined, categoryId: categoryId ?? undefined })
    .filter((service) => {
      if (!query) return true;
      return (
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );
    });

  return (
    <div className="container-responsive space-y-10 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Search results</h1>
        <p className="text-sm text-slate-600">
          {vendors.length} vendors • {services.length} services match “{query || 'All'}”.
        </p>
      </header>
      <FilterBar />
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Vendors</h2>
        </div>
        <div className="grid-auto-fit">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Services</h2>
        </div>
        <div className="grid-auto-fit">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
