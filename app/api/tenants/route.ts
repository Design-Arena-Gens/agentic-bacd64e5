import { NextResponse } from 'next/server';
import dataStore from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tenants = dataStore.getTenants();
  return NextResponse.json(tenants);
}
