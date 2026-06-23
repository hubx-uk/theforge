import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loginClient, clearClientSession, getClientSession } from '@/lib/clientAuth';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);
    const result = await loginClient(email, password);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 401 });
    return NextResponse.json({ success: true, user: result.session });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
export async function DELETE() {
  await clearClientSession();
  return NextResponse.json({ success: true });
}
export async function GET() {
  const session = await getClientSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user: session });
}
