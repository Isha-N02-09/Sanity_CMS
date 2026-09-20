import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";
import { atfMoversCaseStudy, caseStudies, clockLogCaseStudy, ibuildCaseStudy, portfolioProjects, sameDayCaseStudy, telehealthCaseStudy } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = params.slug === "same-day-me" ? sameDayCaseStudy : params.slug === "atf-movers" ? atfMoversCaseStudy : params.slug === "telehealth" ? telehealthCaseStudy : params.slug === "ibuild-co" ? ibuildCaseStudy : params.slug === "clock-log-is-a-tracker-application" ? clockLogCaseStudy : caseStudies[params.slug];
  return study ? {
    title: study.title,
    description: study.excerpt,
    alternates: { canonical: `/portfolio/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.excerpt,
      url: absoluteUrl(`/portfolio/${study.slug}`),
      images: [{ url: absoluteUrl(study.image), alt: `${study.title} case study` }],
    },
    twitter: { card: "summary_large_image" },
  } : {};
}

export default function PortfolioCaseStudy({ params }: { params: { slug: string } }) {
  const study = params.slug === "same-day-me" ? sameDayCaseStudy : params.slug === "atf-movers" ? atfMoversCaseStudy : params.slug === "telehealth" ? telehealthCaseStudy : params.slug === "ibuild-co" ? ibuildCaseStudy : params.slug === "clock-log-is-a-tracker-application" ? clockLogCaseStudy : caseStudies[params.slug];
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
