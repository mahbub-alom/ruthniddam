import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models';
import { initialProducts } from '@/lib/seed-data';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const range = searchParams.get('range');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');

  try {
    const conn = await connectDB();
    if (conn) {
      const query: any = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (range && range !== 'all') {
        query.range = range;
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      if (search) {
        query.$or = [
          { 'name.fr': { $regex: search, $options: 'i' } },
          { 'name.en': { $regex: search, $options: 'i' } },
          { 'shortDescription.fr': { $regex: search, $options: 'i' } },
          { slug: { $regex: search, $options: 'i' } }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 }).lean();
      if (products && products.length > 0) {
        return NextResponse.json({ success: true, data: products });
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, falling back to static products:', error);
  }

  // Fallback to initialProducts
  let filtered = [...initialProducts];
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (range && range !== 'all') {
    filtered = filtered.filter(p => p.range === range);
  }
  if (featured === 'true') {
    filtered = filtered.filter(p => p.isFeatured);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.fr.toLowerCase().includes(q) || 
      p.name.en.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
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

    if (!body.slug || !body.name?.fr || !body.price) {
      return NextResponse.json({ error: 'Slug, nom et prix sont obligatoires' }, { status: 400 });
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erreur de création' }, { status: 500 });
  }
}
