import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export async function GET() {
  const err = await guard();
  if (err) return err;
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name, email, company, phone, created_at")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data });
}

export async function POST(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const body = await req.json();
  const data = createSchema.parse(body);
  const hash = await bcrypt.hash(data.password, 12);
  const { data: client, error } = await supabaseAdmin
    .from("clients")
    .insert({
      name: data.name,
      email: data.email.toLowerCase(),
      password_hash: hash,
      company: data.company,
      phone: data.phone,
    })
    .select("id, name, email, company, phone, created_at")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ client }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { data: client, error } = await supabaseAdmin
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select("id, name, email, company, phone, created_at")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ client });
}

export async function DELETE(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabaseAdmin.from("clients").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
