import dataStore from '../../../lib/store';

export default function AdminLocationsPage() {
  const locations = dataStore.getLocations();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Location management</h2>
        <p className="text-sm text-slate-500">
          Define geofences, assign vendors, and configure availability windows per cluster.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Location
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Coordinates
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Radius
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Assigned vendors
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {locations.map((location) => {
              const vendors = dataStore
                .getVendors()
                .filter((vendor) => vendor.serviceAreas.includes(location.id));
              return (
                <tr key={location.id}>
                  <td className="px-5 py-4 font-semibold text-slate-800">{location.name}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {location.latitude.toFixed(3)}, {location.longitude.toFixed(3)}
                  </td>
                  <td className="px-5 py-4">{location.radiusKm} km</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {vendors.map((vendor) => (
                        <span key={vendor.id} className="badge bg-slate-100 text-slate-600">
                          {vendor.name}
                        </span>
                      ))}
                    </div>
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
