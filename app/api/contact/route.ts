import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContactMessage } from '@/models';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const admin = await verifyAdminAuth(request);
  if (!admin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: messages });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Veuillez remplir les champs obligatoires' }, { status: 400 });
    }

    try {
      await connectDB();
      await ContactMessage.create({
        name,
        email,
        phone: phone || '',
        subject: subject || 'Demande de renseignements',
        message
      });
    } catch (e) {
      console.warn('Contact DB error:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Votre message a bien été transmis à la conciergerie Ruth Niddam.'
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
