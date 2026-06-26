import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jovico World - E-Mobility Platform | theforge Case Study",
  description:
    "How theforge built the digital platform for Jovico, Nigeria's electric mobility and solar retail brand.",
};

export default function JovicoCaseStudy() {
  return <CaseStudyDetail slug="jovico" />;
}
