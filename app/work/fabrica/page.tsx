import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fabrica - Construction Digital Platform | theforge Case Study",
  description:
    "How theforge built a full-stack construction CMS and client portal for Fabrica.",
};

export default function FabricaCaseStudy() {
  return <CaseStudyDetail slug="fabrica" />;
}
