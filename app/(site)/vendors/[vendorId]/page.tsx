import { notFound } from 'next/navigation';
import dataStore from '../../../../lib/store';
import VendorMap from '../../../../components/VendorMap';
import ServiceCard from '../../../../components/ServiceCard';
import RealtimeTicker from '../../../../components/RealtimeTicker';

type VendorPageProps = {
  params: {
    vendorId: string;
  };
};

export const revalidate = 0;

export default function VendorDetailPage({ params }: VendorPageProps) {
  const vendor = dataStore.getVendor(params.vendorId);
  if (!vendor) {
    notFound();
  }
  const services = dataStore.getServices({ vendorId: vendor.id });

  return (
    <div className="space-y-12 pb-12">
      <RealtimeTicker />
      <section className="bg-white">
        <div className="container-responsive flex flex-col gap-8 py-12 lg:flex-row">
          <div className="flex-1 space-y-4">
            <span className="badge bg-primary-100 text-primary-700">
              {vendor.categories.map((category) => category.replace('cat_', '')).join(' · ')}
            </span>
            <h1 className="text-4xl font-semibold text-slate-900">{vendor.name}</h1>
            <p className="text-sm text-slate-600">{vendor.description}</p>
            <dl className="grid gap-4 md:grid-cols-2">
              <div className="glass-panel p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rating
                </dt>
                <dd className="text-lg font-semibold text-slate-800">
                  {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
                </dd>
              </div>
              <div className="glass-panel p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contact
                </dt>
                <dd className="text-sm text-slate-600">
                  {vendor.contactEmail}
                  <br />
                  {vendor.contactPhone}
                </dd>
              </div>
              <div className="glass-panel p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Address
                </dt>
                <dd className="text-sm text-slate-600">{vendor.address}</dd>
              </div>
              <div className="glass-panel p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service areas
                </dt>
                <dd className="text-sm text-slate-600">
                  {vendor.serviceAreas.map((area) => area.replace('loc_', '')).join(', ')}
                </dd>
              </div>
            </dl>
          </div>
          <div className="w-full lg:w-96">
            <VendorMap vendor={vendor} />
          </div>
        </div>
      </section>
      <section className="container-responsive space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Services</h2>
          <p className="text-sm text-slate-500">
            Availability syncs in real-time from POS and workforce orchestration sources.
          </p>
        </div>
        <div className="grid-auto-fit">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
      <section className="container-responsive">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-slate-800">Business hours</h3>
          <dl className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(vendor.businessHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between rounded-lg bg-slate-100 px-4 py-3">
                <dt className="font-semibold capitalize text-slate-700">{day}</dt>
                <dd>{hours ? `${hours.open} – ${hours.close}` : 'Closed'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
