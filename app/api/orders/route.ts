import { NextResponse } from 'next/server';
import dataStore from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') ?? undefined;
  const vendorId = searchParams.get('vendorId') ?? undefined;

  const orders = dataStore.getOrders({ tenantId, vendorId });
  return NextResponse.json(orders);
}
