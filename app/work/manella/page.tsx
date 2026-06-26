import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manella Stores - E-Commerce Rebuild | theforge Case Study",
  description:
    "How theforge redesigned and optimised a WooCommerce store for Manella.",
};

export default function ManellaCaseStudy() {
  return <CaseStudyDetail slug="manella" />;
}
