import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(254),
  workNeeds: z.enum([
    "web-apps",
    "mobile-apps",
    "ecommerce",
    "seo",
    "paid-ads",
    "content",
    "automation",
    "crm-setup",
    "analytics",
    "not-sure",
  ]),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Please check the form fields.",
        detail: result.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { name, company, email, workNeeds, message } = result.data;

  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    name,
    company: company || null,
    email,
    work_needed: workNeeds,
    message,
  });

  if (error) {
    console.error("[contact] Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
