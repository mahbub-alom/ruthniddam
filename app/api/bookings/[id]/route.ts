import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Booking } from '@/models';
import { verifyAdminAuth } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  try {
    const { status, notes } = await request.json();
    await connectDB();
    const updated = await Booking.findByIdAndUpdate(
      id,
      { $set: { ...(status && { status }), ...(notes !== undefined && { notes }) } },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  try {
    await connectDB();
    const deleted = await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: deleted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
