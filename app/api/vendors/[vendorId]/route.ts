import { NextResponse } from 'next/server';
import dataStore from '../../../../lib/store';

type Params = {
  params: {
    vendorId: string;
  };
};

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: Params) {
  const vendor = dataStore.getVendor(params.vendorId);
  if (!vendor) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
  const services = dataStore.getServices({ vendorId: params.vendorId });
  return NextResponse.json({ vendor, services });
}
