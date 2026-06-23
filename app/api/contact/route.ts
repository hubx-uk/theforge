import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional().default(''),
  email: z.string().trim().email().max(254),
  workNeeds: z.enum(['web-apps', 'mobile-apps', 'ecommerce', 'seo', 'paid-ads', 'content', 'automation', 'crm-setup', 'analytics', 'not-sure']),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const result = contactSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });

    const { name, company, email, workNeeds, message } = result.data;
    const { error } = await supabase.from('contact_submissions').insert([{
      name,
      company: company || null,
      email,
      work_needed: workNeeds,
      message,
      created_at: new Date().toISOString(),
    }]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
