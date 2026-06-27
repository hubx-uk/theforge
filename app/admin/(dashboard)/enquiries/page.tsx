import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EnquiriesClient } from "@/components/admin/EnquiriesClient";

export const metadata: Metadata = { title: "Enquiries • theforge Admin" };

export default async function AdminEnquiriesPage() {
  await requireAdminSession();

  const { data: enquiries } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <EnquiriesClient enquiries={enquiries ?? []} />
    </div>
  );
}
