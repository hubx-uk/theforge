import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

const caseStudySchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lower-case alphanumeric and dashes only",
    ),
  client: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(10),
  body: z.string().min(20),
  industry: z.string().min(2),
  tier: z.enum(["Spark", "Ember", "Blaze", "Inferno", "Custom"]),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Use a valid hex color"),
  tags: z.array(z.string().min(1)).default([]),
  home_category: z.string().nullable().optional(),
  home_desc: z.string().nullable().optional(),
  show_on_home: z.boolean().default(true),
  show_on_work: z.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
});

export async function GET() {
  const err = await guard();
  if (err) return err;

  const { data, error } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .order("sort_order");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ caseStudies: data });
}

export async function POST(req: NextRequest) {
  const err = await guard();
  if (err) return err;

  try {
    const body = await req.json();
    const data = caseStudySchema.parse(body);
    const { data: caseStudy, error } = await supabaseAdmin
      .from("case_studies")
      .insert(data)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ caseStudy }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Validation error" },
      { status: 400 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const err = await guard();
  if (err) return err;

  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const validated = caseStudySchema.partial().parse(updates);
    const { data: caseStudy, error } = await supabaseAdmin
      .from("case_studies")
      .update(validated)
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ caseStudy });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Validation error" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const err = await guard();
  if (err) return err;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("case_studies")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
