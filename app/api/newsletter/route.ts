import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { NewsletterSubscriber } from '@/models';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    await connectDB();
    const subs = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: subs });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, locale } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
    }

    try {
      await connectDB();
      await NewsletterSubscriber.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { $set: { locale: locale || 'fr' } },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.warn('Newsletter DB error:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription enregistrée avec succès'
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
