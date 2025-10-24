import { NextResponse } from 'next/server';
import dataStore from '../../../../../lib/store';

type Params = {
  params: {
    vendorId: string;
  };
};

export async function PATCH(req: Request, { params }: Params) {
  const payload = await req.json();
  const { latitude, longitude } = payload ?? {};
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return NextResponse.json({ message: 'Invalid coordinates' }, { status: 400 });
  }

  dataStore.updateVendorLocation(params.vendorId, latitude, longitude);
  return NextResponse.json({ success: true });
}
