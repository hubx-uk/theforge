import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getClientSession } from '@/lib/clientAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export async function PATCH(req: NextRequest) {
  const session = await getClientSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { currentPassword, newPassword } = passwordSchema.parse(body);

    const { data: client } = await supabaseAdmin
      .from('clients')
      .select('*')
      .eq('id', session.id)
      .single();

    if (!client) return NextResponse.json({ error: 'Account not found' }, { status: 404 });

    const match = await bcrypt.compare(currentPassword, client.password_hash);
    if (!match) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });

    const newHash = await bcrypt.hash(newPassword, 12);
    const { error } = await supabaseAdmin
      .from('clients')
      .update({ password_hash: newHash })
      .eq('id', session.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    console.error('Portal account error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
