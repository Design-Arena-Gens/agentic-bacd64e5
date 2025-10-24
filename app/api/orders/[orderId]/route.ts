import { NextResponse } from 'next/server';
import dataStore from '../../../../lib/store';

type Params = {
  params: {
    orderId: string;
  };
};

export async function PATCH(req: Request, { params }: Params) {
  const payload = await req.json();
  const { status } = payload ?? {};
  if (
    !status ||
    !['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)
  ) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }
  dataStore.updateOrderStatus(params.orderId, status);
  const order = dataStore.getOrders({}).find((item) => item.id === params.orderId);
  if (!order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}
