import { NextResponse } from 'next/server';
import dataStore from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId') ?? undefined;
  const categoryId = searchParams.get('categoryId') ?? undefined;
  const locationId = searchParams.get('locationId') ?? undefined;

  const vendors = dataStore.getVendors({ tenantId, categoryId, locationId });
  return NextResponse.json(vendors);
}
