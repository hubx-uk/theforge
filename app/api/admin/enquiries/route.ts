import { type NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function guard() {
  const s = await getAdminSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function PATCH(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ enquiry: data });
}

export async function DELETE(req: NextRequest) {
  const err = await guard();
  if (err) return err;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabaseAdmin
    .from("contact_submissions")
    .delete()
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
