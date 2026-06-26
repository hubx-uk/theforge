import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: caseStudy } = await supabaseAdmin
    .from("case_studies")
    .select("client, title, description")
    .eq("slug", slug)
    .single();

  if (!caseStudy) return { title: "Case Study - theforge" };

  return {
    title: `${caseStudy.client} - ${caseStudy.title} | theforge Case Study`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyDetail slug={slug} />;
}
