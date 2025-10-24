import { NextResponse } from 'next/server';
import dataStore from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = dataStore.getCategories();
  return NextResponse.json(categories);
}
