import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models';
import { initialProducts } from '@/lib/seed-data';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const conn = await connectDB();
    if (conn) {
      const product = await Product.findOne({
        $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
      }).lean();

      if (product) {
        return NextResponse.json({ success: true, data: product });
      }
    }
  } catch (e) {
    console.warn('Error finding product:', e);
  }

  const fallback = initialProducts.find(p => p.slug === slug);
  if (fallback) {
    return NextResponse.json({ success: true, data: fallback });
  }

  return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const body = await request.json();
    await connectDB();

    const updated = await Product.findOneAndUpdate(
      { $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const admin = await verifyAdminAuth(request);
  if (!admin) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
  }

  const { slug } = await params;
  try {
    await connectDB();
    const deleted = await Product.findOneAndDelete({
      $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    });

    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
