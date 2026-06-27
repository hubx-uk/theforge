import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export const metadata: Metadata = {
  title: "Web App Development • theforge",
  description: SERVICE_DETAILS["web-apps"].summary,
};
export default function Page() {
  return <ServiceDetailPage service={SERVICE_DETAILS["web-apps"]} />;
}
