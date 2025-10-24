import dataStore from '../../lib/store';

const segments = [
  { key: 'food', label: 'Food & Beverage', categoryId: 'cat_food' },
  { key: 'wellness', label: 'Wellness & Fitness', categoryId: 'cat_wellness' },
  { key: 'home', label: 'Home Services', categoryId: 'cat_home' },
  { key: 'events', label: 'Events & Experiences', categoryId: 'cat_events' }
];

export default function RevenueBreakdown() {
  const orders = dataStore.getOrders();
  const services = dataStore.getServices();

  const revenueByCategory = segments.map((segment) => {
    const relevantServices = services.filter((service) => service.categoryId === segment.categoryId);
    const revenue = orders
      .map((order) =>
        order.items
          .filter((item) =>
            relevantServices.some((service) => service.id === item.serviceId)
          )
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
      )
      .reduce((sum, value) => sum + value, 0);
    return { ...segment, revenue };
  });

  const total = revenueByCategory.reduce((sum, item) => sum + item.revenue, 0) || 1;

  return (
    <section className="glass-panel flex h-full flex-col gap-4 p-5">
      <header>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Revenue by category
        </h2>
      </header>
      <div className="space-y-4">
        {revenueByCategory.map((segment) => (
          <div key={segment.key}>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>{segment.label}</span>
              <span>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(segment.revenue)}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${(segment.revenue / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
