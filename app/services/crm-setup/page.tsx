import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICE_DETAILS } from '@/lib/serviceDetails';

export const metadata: Metadata = { title: 'CRM Setup and Migration — theforge', description: SERVICE_DETAILS['crm-setup'].summary };
export default function Page() { return <ServiceDetailPage service={SERVICE_DETAILS['crm-setup']} />; }
