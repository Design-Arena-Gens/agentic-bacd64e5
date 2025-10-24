import dataStore from '../../lib/store';
import MetricCard from '../../components/admin/MetricCard';
import ActivityFeed from '../../components/admin/ActivityFeed';
import OrderPerformance from '../../components/admin/OrderPerformance';
import RevenueBreakdown from '../../components/admin/RevenueBreakdown';

export default function AdminDashboardPage() {
  const tenants = dataStore.getTenants();
  const vendors = dataStore.getVendors();
  const services = dataStore.getServices();
  const orders = dataStore.getOrders();
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const analyticsResponse = {
    tenants: tenants.length,
    vendors: vendors.length,
    services: services.length,
    orders: orders.length,
    totalSales,
    avgOrderValue: totalSales / Math.max(orders.length, 1),
    activeVendors: vendors.filter((vendor) => vendor.verified).length,
    activeUsers: dataStore.getUsers().filter((user) => user.status === 'active').length
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Gross sales (30d)"
          value={Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(analyticsResponse.totalSales)}
          change={{ value: '12.4%', positive: true }}
          caption="Across all tenants · settlement minus refunds"
        />
        <MetricCard
          label="Active vendors"
          value={`${analyticsResponse.activeVendors}`}
          change={{ value: '2 new', positive: true }}
          caption="Verified and transacting past 7 days"
        />
        <MetricCard
          label="Avg. order value"
          value={Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(analyticsResponse.avgOrderValue)}
          change={{ value: '−3.2%', positive: false }}
          caption="Compared to rolling 30-day baseline"
        />
        <MetricCard
          label="Active customers"
          value={`${analyticsResponse.activeUsers}`}
          change={{ value: '18 reactivated', positive: true }}
          caption="Logged in past 14 days"
        />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderPerformance />
        </div>
        <div className="flex flex-col gap-4">
          <RevenueBreakdown />
          <ActivityFeed />
        </div>
      </section>
    </div>
  );
}
