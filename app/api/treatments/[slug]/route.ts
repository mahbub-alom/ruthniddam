import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Treatment } from '@/models';
import { initialTreatments } from '@/lib/seed-data';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const conn = await connectDB();
    if (conn) {
      const treatment = await Treatment.findOne({
        $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
      }).lean();
      if (treatment) return NextResponse.json({ success: true, data: treatment });
    }
  } catch (e) {
    console.warn(e);
  }

  const fallback = initialTreatments.find(t => t.slug === slug);
  if (fallback) return NextResponse.json({ success: true, data: fallback });

  return NextResponse.json({ error: 'Soin non trouvé' }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { slug } = await params;
  try {
    const body = await request.json();
    await connectDB();
    const updated = await Treatment.findOneAndUpdate(
      { $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] },
      { $set: body },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { slug } = await params;
  try {
    await connectDB();
    const deleted = await Treatment.findOneAndDelete({
      $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    });
    return NextResponse.json({ success: true, data: deleted });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
