import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminSession } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

const projectSchema = z.object({
  client_id: z.string().uuid().optional().nullable(),
  name: z.string().min(2),
  plan_tier: z.enum(['spark', 'ember', 'blaze', 'inferno', 'custom']).default('custom'),
  billing_type: z.enum(['one_time', 'retainer', 'both']).default('one_time'),
  status: z.enum(['discovery', 'in_progress', 'review', 'completed', 'on_hold']).default('discovery'),
  budget: z.number().optional().nullable(),
  retainer_amount: z.number().optional().nullable(),
  start_date: z.string().optional().nullable(),
  target_date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  case_study_slug: z.string().optional().nullable(),
});

export async function GET() {
  const err = await guard(); if (err) return err;
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select(`*, clients(name, email, company)`)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data });
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err;
  const body = await req.json();
  const data = projectSchema.parse(body);
  const { data: project, error } = await supabaseAdmin
    .from('projects')
    .insert({ ...data, updated_at: new Date().toISOString() })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const err = await guard(); if (err) return err;
  const { id, ...updates } = await req.json();
  const { data: project, error } = await supabaseAdmin
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project });
}
