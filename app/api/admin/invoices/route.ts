import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

const invoiceSchema = z.object({
  project_id: z.string().uuid().optional().nullable(),
  client_id: z.string().uuid(),
  description: z.string().min(2),
  amount: z.number().positive(),
  invoice_type: z.enum(["one_time", "retainer"]).default("one_time"),
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).default("draft"),
  due_date: z.string().optional().nullable(),
});

export async function GET() {
  const err = await guard();
  if (err) return err;
  const { data, error } = await supabaseAdmin
    .from("invoices")
    .select(`*, clients(name, email), projects(name)`)
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoices: data });
}

export async function POST(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const body = await req.json();
  const data = invoiceSchema.parse(body);
  const { data: invoice, error } = await supabaseAdmin
    .from("invoices")
    .insert(data)
    .select("*")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ invoice }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id, ...updates } = await req.json();
  const paidAt =
    updates.status === "paid" ? { paid_at: new Date().toISOString() } : {};
  const { data: invoice, error } = await supabaseAdmin
    .from("invoices")
    .update({ ...updates, ...paidAt })
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ invoice });
}

export async function DELETE(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabaseAdmin.from("invoices").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
