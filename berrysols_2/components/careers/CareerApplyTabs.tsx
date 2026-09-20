"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import ApplicationForm from "@/components/careers/ApplicationForm";
import type { CareerRole } from "@/data/careers";

type CareerApplyTabsProps = {
  role: CareerRole;
};

export default function CareerApplyTabs({ role }: CareerApplyTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "application">("overview");

  return (
    <>
      <div className="border-y border-black/10 bg-white">
        <div className="mx-auto flex max-w-[760px] justify-center gap-8 px-5 md:px-8">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            aria-selected={activeTab === "overview"}
            className={`border-b-2 px-0 py-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${activeTab === "overview" ? "border-[#ce4111] text-[#ce4111]" : "border-transparent text-[#756f65] hover:text-[#171410]"}`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("application")}
            aria-selected={activeTab === "application"}
            className={`border-b-2 px-0 py-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${activeTab === "application" ? "border-[#ce4111] text-[#ce4111]" : "border-transparent text-[#756f65] hover:text-[#171410]"}`}
          >
            Application
          </button>
        </div>
      </div>

      <section className="bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[760px]">
          {activeTab === "overview" ? (
            <article>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Description</h2>
              <p className="text-sm leading-7 text-[#5f5a53]">{role.summary}</p>

              <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Responsibilities</h2>
              <ul className="space-y-2 text-sm leading-6 text-[#5f5a53]">
                {role.responsibilities.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 shrink-0 text-[#ce4111]" size={15} aria-hidden="true" />{item}</li>)}
              </ul>

              <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Requirements</h2>
              <ul className="space-y-2 text-sm leading-6 text-[#5f5a53]">
                {role.requirements.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 shrink-0 text-[#ce4111]" size={15} aria-hidden="true" />{item}</li>)}
              </ul>
            </article>
          ) : (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Apply to this position</p>
              <h2 className="text-3xl font-extrabold uppercase leading-[0.92] tracking-[-0.05em] md:text-5xl">Tell us about yourself.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#756f65]">Complete the form below. Your CV will be sent securely with your application.</p>
              <ApplicationForm roleSlug={role.slug} roleTitle={role.title} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
