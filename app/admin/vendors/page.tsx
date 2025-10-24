import dataStore from '../../../lib/store';

export default function AdminVendorsPage() {
  const vendors = dataStore.getVendors();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Vendor management</h2>
        <p className="text-sm text-slate-500">
          Approve new applicants, monitor commission structures, and evaluate performance signals.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Vendor
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Categories
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Rating
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Commission
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">{vendor.name}</p>
                  <p className="text-xs text-slate-400">{vendor.address}</p>
                </td>
                <td className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                  {vendor.categories.map((category) => category.replace('cat_', '')).join(' · ')}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-700">
                  {vendor.rating.toFixed(1)} ({vendor.reviewCount})
                </td>
                <td className="px-5 py-4">{(vendor.commissionRate * 100).toFixed(1)}%</td>
                <td className="px-5 py-4">
                  <span className="badge bg-emerald-100 text-emerald-600">
                    {vendor.verified ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-xs font-semibold text-primary-600">
                  Manage → 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
