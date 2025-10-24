import { NextResponse } from 'next/server';
import dataStore from '../../../../lib/store';

type Params = {
  params: {
    serviceId: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  const service = dataStore.getServices({}).find((item) => item.id === params.serviceId);
  if (!service) {
    return NextResponse.json({ message: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PATCH(req: Request, { params }: Params) {
  const payload = await req.json();
  const { price, availability } = payload ?? {};
  if (typeof price === 'number') {
    dataStore.updateServicePrice(params.serviceId, price);
  }
  if (typeof availability === 'number') {
    dataStore.updateServiceAvailability(params.serviceId, availability);
  }
  const service = dataStore.getServices({}).find((item) => item.id === params.serviceId);
  return NextResponse.json(service ?? { message: 'Service not found' });
}
