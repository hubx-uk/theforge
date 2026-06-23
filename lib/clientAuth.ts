import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './supabaseAdmin';

const COOKIE = 'forge_client';
const SECRET = new TextEncoder().encode(
  process.env.CLIENT_JWT_SECRET ?? 'forge-client-secret-change-in-production'
);
const TTL = 60 * 60 * 24 * 7; // 7 days

export type ClientSession = {
  id: string;
  name: string;
  email: string;
  company?: string;
};

export async function loginClient(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: ClientSession }> {
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (!client) return { success: false, error: 'Invalid credentials' };
  const match = await bcrypt.compare(password, client.password_hash);
  if (!match) return { success: false, error: 'Invalid credentials' };

  const session: ClientSession = {
    id: client.id,
    name: client.name,
    email: client.email,
    company: client.company ?? undefined,
  };

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

export async function getClientSession(): Promise<ClientSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as ClientSession;
  } catch {
    return null;
  }
}

export async function requireClientSession(): Promise<ClientSession> {
  const session = await getClientSession();
  if (!session) redirect('/portal/login');
  return session;
}

export async function clearClientSession() {
  (await cookies()).delete(COOKIE);
}
