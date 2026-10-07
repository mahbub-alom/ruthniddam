import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Treatment } from '@/models';
import { initialTreatments } from '@/lib/seed-data';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const conn = await connectDB();
    if (conn) {
      const query: any = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      const treatments = await Treatment.find(query).sort({ createdAt: -1 }).lean();
      if (treatments && treatments.length > 0) {
        return NextResponse.json({ success: true, data: treatments });
      }
    }
  } catch (e) {
    console.warn('DB error, using fallback treatments:', e);
  }

  let filtered = [...initialTreatments];
  if (category && category !== 'all') {
    filtered = filtered.filter(t => t.category === category);
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(request: Request) {
  const admin = await verifyAdminAuth(request);
  if (!admin) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();
    const newTreatment = await Treatment.create(body);
    return NextResponse.json({ success: true, data: newTreatment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
