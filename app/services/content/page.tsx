import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { SERVICE_DETAILS } from '@/lib/serviceDetails';

export const metadata: Metadata = { title: 'Content Strategy and Production — theforge', description: SERVICE_DETAILS.content.summary };
export default function Page() { return <ServiceDetailPage service={SERVICE_DETAILS.content} />; }
