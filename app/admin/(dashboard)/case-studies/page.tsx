import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CaseStudiesClient } from "@/components/admin/CaseStudiesClient";

export const metadata: Metadata = { title: "Case Studies - theforge Admin" };

export default async function AdminCaseStudiesPage() {
  await requireAdminSession();
  const { data: caseStudies } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .order("sort_order");

  return (
    <div className="p-8">
      <CaseStudiesClient caseStudies={caseStudies ?? []} />
    </div>
  );
}
