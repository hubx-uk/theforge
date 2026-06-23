import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './supabaseAdmin';

const COOKIE = 'forge_admin';
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'forge-admin-secret-change-in-production'
);
const TTL = 60 * 60 * 8; // 8 hours

export type AdminSession = { id: string; name: string; email: string; role: string };

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const { data: admin } = await supabaseAdmin
    .from('admins')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (!admin) return { success: false, error: 'Invalid credentials' };
  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) return { success: false, error: 'Invalid credentials' };

  const session: AdminSession = { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
  const token = await new SignJWT(session as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Math.floor(Date.now() / 1000) + TTL)
    .sign(SECRET);

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TTL,
    path: '/',
  });

  return { success: true, session };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return session;
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}
