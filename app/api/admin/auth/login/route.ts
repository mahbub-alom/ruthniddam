import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models';
import { comparePassword, signAdminToken, ADMIN_COOKIE_NAME, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const envEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || '';
    const defaultEmail = 'admin@ruthniddam.fr';
    const defaultPassword = 'RuthNiddam2026!';

    const normalizedEmail = email.toLowerCase().trim();

    let admin = null;
    let passwordValid = false;

    // 1. Check if matches environment or default credentials directly
    if (envEmail && normalizedEmail === envEmail && password === envPassword) {
      passwordValid = true;
      admin = {
        _id: '660f1b2c3d4e5f6a7b8c9d01',
        name: 'Administrateur Principal',
        email: envEmail,
        role: 'superadmin'
      };
    } else if (normalizedEmail === defaultEmail && password === defaultPassword) {
      passwordValid = true;
      admin = {
        _id: '660f1b2c3d4e5f6a7b8c9d02',
        name: 'Ruth Niddam Conciergerie',
        email: defaultEmail,
        role: 'superadmin'
      };
    }

    // 2. Otherwise or additionally, verify in MongoDB
    if (!passwordValid) {
      const conn = await connectDB();
      if (conn) {
        const dbAdmin = await Admin.findOne({ email: normalizedEmail });
        if (dbAdmin && dbAdmin.password) {
          const isValid = await comparePassword(password, dbAdmin.password);
          if (isValid) {
            passwordValid = true;
            admin = {
              _id: dbAdmin._id,
              name: dbAdmin.name,
              email: dbAdmin.email,
              role: dbAdmin.role
            };
          }
        }
      }
    }

    if (!admin || !passwordValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    const payload = {
      adminId: admin._id ? admin._id.toString() : 'admin_default',
      email: admin.email,
      role: admin.role,
      name: admin.name
    };

    const token = signAdminToken(payload);

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
