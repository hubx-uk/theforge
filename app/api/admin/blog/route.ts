import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

const postSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lower-case alphanumeric and dashes only",
    ),
  title: z.string().min(2),
  excerpt: z.string().min(2),
  body: z.string().min(5),
  tag: z.string().min(1),
  read_time: z.string().default("5 min read"),
  status: z.enum(["draft", "published"]).default("draft"),
});

export async function GET() {
  const err = await guard();
  if (err) return err;
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  try {
    const body = await req.json();
    const data = postSchema.parse(body);
    const payload = {
      ...data,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
    };
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .insert(payload)
      .select("*")
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ post }, { status: 201 });
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

    const validated = postSchema.partial().parse(updates);
    const payload = {
      ...validated,
      ...(updates.status === "published"
        ? { published_at: new Date().toISOString() }
        : {}),
    };

    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ post });
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
    .from("blog_posts")
    .delete()
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
