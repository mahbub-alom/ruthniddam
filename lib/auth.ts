import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'ruth_niddam_super_secure_jwt_secret_key_2026_paris';
export const ADMIN_COOKIE_NAME = 'rn_admin_token';

export interface AdminJwtPayload {
  adminId: string;
  email: string;
  role: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getSessionAdmin(): Promise<AdminJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function verifyAdminAuth(request?: Request): Promise<AdminJwtPayload | null> {
  // Check Authorization header first
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const verified = verifyAdminToken(token);
      if (verified) return verified;
    }
  }

  // Fallback to cookie
  return getSessionAdmin();
}
