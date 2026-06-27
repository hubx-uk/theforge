import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export const metadata: Metadata = {
  title: "Analytics and Reporting • theforge",
  description: SERVICE_DETAILS.analytics.summary,
};
export default function Page() {
  return <ServiceDetailPage service={SERVICE_DETAILS.analytics} />;
}
