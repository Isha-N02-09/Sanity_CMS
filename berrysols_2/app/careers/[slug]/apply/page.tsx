import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CareerApplyTabs from "@/components/careers/CareerApplyTabs";
import { careerRoles, getCareerRole } from "@/data/careers";
import type { Metadata } from "next";

type ApplyPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export function generateMetadata({ params }: ApplyPageProps): Metadata {
  const role = getCareerRole(params.slug);
  return role ? {
    title: `Apply: ${role.title}`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}/apply` },
    robots: { index: false, follow: true },
  } : {};
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const role = getCareerRole(params.slug);

  if (!role) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#171410]">
      <div className="px-5 pb-8 pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[760px]">
          <Link href="/careers" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ce4111] transition-colors hover:text-[#171410]">
            <ArrowLeft size={15} aria-hidden="true" /> Back to all jobs
          </Link>
          <header className="border-b border-black/15 pb-8 text-center" data-back-to-top-hero>
            <div className="mb-5 flex items-center justify-center gap-2">
              <img src="/assets/icon2.png" alt="Berry Solutions" className="h-12 w-11 object-contain" />
              <span className="text-base font-extrabold uppercase tracking-[0.08em]">Berry Solutions</span>
            </div>
            <h1 className="text-3xl font-extrabold uppercase leading-[0.92] tracking-[-0.05em] md:text-5xl">{role.title}</h1>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#756f65]">
              <span>{role.location}</span>
              <span>{role.type}</span>
              <span>{role.dept}</span>
            </div>
          </header>
        </div>
      </div>
      <CareerApplyTabs role={role} />
      <footer className="mt-auto border-t border-black/10 bg-white px-5 py-5 md:px-8">
        <nav className="flex items-center justify-center gap-5 text-xs font-medium text-[#171410]" aria-label="Application footer">
          <Link href="/" className="transition-colors hover:text-[#171410]">View website</Link>
          <Link href="/careers" className="transition-colors hover:text-[#171410]">View all jobs</Link>
        </nav>
      </footer>
    </main>
  );
}
