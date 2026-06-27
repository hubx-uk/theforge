import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export const metadata: Metadata = {
  title: "Paid Advertising • theforge",
  description: SERVICE_DETAILS["paid-ads"].summary,
};
export default function Page() {
  return <ServiceDetailPage service={SERVICE_DETAILS["paid-ads"]} />;
}
