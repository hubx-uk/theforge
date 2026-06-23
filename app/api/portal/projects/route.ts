import { NextResponse } from 'next/server';
import { getClientSession } from '@/lib/clientAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const session = await getClientSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: projects, error } = await supabaseAdmin
    .from('projects')
    .select(`*, project_milestones(id, title, status, due_date, sort_order), project_updates(id, message, author, created_at)`)
    .eq('client_id', session.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects });
}
