import dataStore from '../../../lib/store';

export default function AdminServicesPage() {
  const services = dataStore.getServices();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Service catalog</h2>
        <p className="text-sm text-slate-500">
          Manage inventory, pricing guardrails, and promotional placements across tenants.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Service
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Vendor
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Category
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Price
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Availability
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {services.map((service) => {
              const vendor = dataStore.getVendor(service.vendorId);
              return (
                <tr key={service.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{service.name}</p>
                    <p className="text-xs text-slate-400">{service.description.slice(0, 80)}...</p>
                  </td>
                  <td className="px-5 py-4">{vendor?.name ?? service.vendorId}</td>
                  <td className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                    {service.categoryId.replace('cat_', '')}
                  </td>
                  <td className="px-5 py-4 font-semibold">
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(service.price)}
                  </td>
                  <td className="px-5 py-4">{service.availability}</td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(service.updatedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
