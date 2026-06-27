import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export const metadata: Metadata = {
  title: "SEO Services • theforge",
  description: SERVICE_DETAILS.seo.summary,
};
export default function Page() {
  return <ServiceDetailPage service={SERVICE_DETAILS.seo} />;
}
