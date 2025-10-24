import { NextResponse } from 'next/server';
import dataStore from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') ?? undefined;
  const categoryId = searchParams.get('categoryId') ?? undefined;
  const vendorId = searchParams.get('vendorId') ?? undefined;
  const locationId = searchParams.get('locationId') ?? undefined;

  const services = dataStore.getServices({ tenantId, categoryId, vendorId, locationId });

  return NextResponse.json(services);
}
