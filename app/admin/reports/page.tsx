import dataStore from '../../../lib/store';

const timeframe = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last quarter', value: '90d' }
];

export default function AdminReportsPage() {
  const totalSales = dataStore.getOrders().reduce((sum, order) => sum + order.total, 0);
  const totalOrders = dataStore.getOrders().length;
  const conversionRate = 42.6;
  const retentionRate = 78.4;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Reporting & analytics</h2>
          <p className="text-sm text-slate-500">
            Generate performance dashboards to track growth, conversion, and vendor efficiency.
          </p>
        </div>
        <div className="flex gap-3">
          {timeframe.map((item) => (
            <button
              key={item.value}
              className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                item.value === '30d'
                  ? 'border-primary-200 bg-primary-50 text-primary-600'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Net revenue
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSales)}
          </p>
        </article>
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Orders processed
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalOrders}</p>
        </article>
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Conversion rate
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{conversionRate}%</p>
        </article>
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Retention rate
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{retentionRate}%</p>
        </article>
      </section>
      <section className="glass-panel overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Tenant leaderboard
          </h3>
        </div>
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Tenant
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Vendors
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Revenue share
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                QoQ growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {dataStore.getTenants().map((tenant) => {
              const tenantVendors = dataStore.getVendors({ tenantId: tenant.id }).length;
              const tenantOrders = dataStore.getOrders({ tenantId: tenant.id });
              const tenantRevenue = tenantOrders.reduce((sum, order) => sum + order.total, 0);
              const share = totalSales ? (tenantRevenue / totalSales) * 100 : 0;
              return (
                <tr key={tenant.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{tenant.name}</p>
                    <p className="text-xs text-slate-400">{tenant.plan.toUpperCase()} plan</p>
                  </td>
                  <td className="px-5 py-4">{tenantVendors}</td>
                  <td className="px-5 py-4">{share.toFixed(1)}%</td>
                  <td className="px-5 py-4 text-emerald-600">+8.2%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
