import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import {getServices} from "@/lib/sanity/queries";
import {getService, getAllSlugs} from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getServices();
  return (services ?? getAllSlugs().map((slug) => ({slug}))).map((service) => ({
    slug: typeof service === "string" ? service : service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sanityServices = await getServices();
  const service = sanityServices === null
    ? getService(params.slug)
    : sanityServices.find((item) => item.slug === params.slug);
  if (!service) return {};
  return {
    title: service.eyebrow,
    description: service.description,
    keywords: [service.eyebrow, "Berry Solutions", service.category],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.eyebrow,
      description: service.description,
      url: absoluteUrl(`/services/${service.slug}`),
    },
    twitter: { card: "summary" },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const sanityServices = await getServices();
  const service = sanityServices === null
    ? getService(params.slug)
    : sanityServices.find((item) => item.slug === params.slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
