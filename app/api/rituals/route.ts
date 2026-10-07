import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { BeautyRitual } from '@/models';
import { initialRituals } from '@/lib/seed-data';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      const rituals = await BeautyRitual.find().sort({ createdAt: -1 }).lean();
      if (rituals && rituals.length > 0) {
        return NextResponse.json({ success: true, data: rituals });
      }
    }
  } catch (e) {
    console.warn(e);
  }

  return NextResponse.json({ success: true, data: initialRituals });
}

export async function POST(request: Request) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    await connectDB();
    const newRitual = await BeautyRitual.create(body);
    return NextResponse.json({ success: true, data: newRitual }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
