import { NextResponse } from 'next/server';
import dataStore from '../../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tenants = dataStore.getTenants();
  const vendors = dataStore.getVendors();
  const services = dataStore.getServices();
  const orders = dataStore.getOrders();
  const users = dataStore.getUsers();
  const activities = dataStore.getActivities(10);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length ? totalSales / orders.length : 0;
  const activeVendors = vendors.filter((vendor) => vendor.verified).length;
  const activeUsers = users.filter((user) => user.status === 'active').length;

  return NextResponse.json({
    tenants: tenants.length,
    vendors: vendors.length,
    services: services.length,
    orders: orders.length,
    totalSales,
    avgOrderValue,
    activeVendors,
    activeUsers,
    activities
  });
}
