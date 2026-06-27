import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export const metadata: Metadata = {
  title: "Workflow Automation • theforge",
  description: SERVICE_DETAILS.automation.summary,
};
export default function Page() {
  return <ServiceDetailPage service={SERVICE_DETAILS.automation} />;
}
