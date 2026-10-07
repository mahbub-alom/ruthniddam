import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { 
  Admin, 
  Product, 
  Treatment, 
  BeautyRitual, 
  Formation, 
  PressItem, 
  BlogPost 
} from '@/models';
import { 
  initialProducts, 
  initialTreatments, 
  initialRituals, 
  initialFormations, 
  initialPress, 
  initialBlogPosts 
} from '@/lib/seed-data';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({
        success: true,
        message: 'Données Ruth Niddam initialisées en mémoire (MongoDB offline - fallback activé).'
      });
    }

    // 1. Seed or update Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ruthniddam.fr';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'RuthNiddam2026!';
      const hashedPassword = await hashPassword(defaultPassword);
      await Admin.create({
        name: 'Ruth Niddam Conciergerie',
        email: adminEmail,
        password: hashedPassword,
        role: 'superadmin'
      });
    }

    // 2. Seed Products
    for (const p of initialProducts) {
      await Product.findOneAndUpdate(
        { slug: p.slug },
        { $set: p },
        { upsert: true, new: true }
      );
    }

    // 3. Seed Treatments
    for (const t of initialTreatments) {
      await Treatment.findOneAndUpdate(
        { slug: t.slug },
        { $set: t },
        { upsert: true, new: true }
      );
    }

    // 4. Seed Beauty Rituals
    for (const r of initialRituals) {
      await BeautyRitual.findOneAndUpdate(
        { slug: r.slug },
        { $set: r },
        { upsert: true, new: true }
      );
    }

    // 5. Seed Formations
    for (const f of initialFormations) {
      await Formation.findOneAndUpdate(
        { slug: f.slug },
        { $set: f },
        { upsert: true, new: true }
      );
    }

    // 6. Seed Press Items
    for (const pr of initialPress) {
      await PressItem.findOneAndUpdate(
        { publication: pr.publication },
        { $set: pr },
        { upsert: true, new: true }
      );
    }

    // 7. Seed Blog Posts
    for (const b of initialBlogPosts) {
      await BlogPost.findOneAndUpdate(
        { slug: b.slug },
        { $set: b },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ruth Niddam database successfully seeded with all initial catalog and admin accounts.'
    });
  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Seed execution failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
