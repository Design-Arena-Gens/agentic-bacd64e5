import dataStore from '../../lib/store';
import { Order } from '../../types';

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-slate-200 text-slate-700',
  confirmed: 'bg-blue-200 text-blue-700',
  in_progress: 'bg-amber-200 text-amber-700',
  completed: 'bg-emerald-200 text-emerald-700',
  cancelled: 'bg-rose-200 text-rose-700'
};

export default function OrderPerformance() {
  const orders = dataStore.getOrders().slice(0, 10);

  return (
    <section className="glass-panel h-full overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Order velocity
        </h2>
      </div>
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th scope="col" className="px-5 py-3 text-left font-semibold">
              Order
            </th>
            <th scope="col" className="px-5 py-3 text-left font-semibold">
              Vendor
            </th>
            <th scope="col" className="px-5 py-3 text-left font-semibold">
              Total
            </th>
            <th scope="col" className="px-5 py-3 text-left font-semibold">
              Status
            </th>
            <th scope="col" className="px-5 py-3 text-left font-semibold">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
          {orders.map((order) => {
            const vendor = dataStore.getVendor(order.vendorId);
            return (
              <tr key={order.id}>
                <td className="px-5 py-3 font-semibold text-slate-700">{order.id.toUpperCase()}</td>
                <td className="px-5 py-3">{vendor?.name ?? order.vendorId}</td>
                <td className="px-5 py-3 font-semibold">
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: order.currency
                  }).format(order.total)}
                </td>
                <td className="px-5 py-3">
                  <span className={`badge ${statusColors[order.status]}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {new Date(order.updatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
