"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  PenLine,
  Pin,
  Search,
  Target,
} from "lucide-react";
import type { CaseStudyData } from "@/data/portfolio";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import CapabilityWave from "@/components/home/CapabilityWave";
import ScrollReveal from "@/components/home/ScrollReveal";
import { Technology } from "@/components/portfolio/technology";
import styles from "@/styles/CaseStudyPage.module.css";

function SectionLabel({ children, size = "md" }: { children: string; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "text-[11px]" : size === "lg" ? "text-[13px]" : "text-[12px]";
  return (
    <div className={`flex items-center gap-3 uppercase tracking-[0.22em] text-[#f45e2b] ${sizeClass} font-black`}>
      <span className="h-px w-7 bg-[#f45e2b]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

const stats = [
  { value: "30+", label: "years of dental excellence" },
  { value: "35K+", label: "implant patients treated" },
  { value: "13", label: "specialist doctors profiled" },
  { value: "1", label: "certified ZAGA center in the UAE" },
];

function CaseHero({ study }: { study: CaseStudyData }) {
  return (
    <section className="wrap pt-20 lg:pt-28" data-back-to-top-hero>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-center gap-3 uppercase tracking-[0.2em] text-[#f45e2b]">
            <span aria-hidden="true" className="h-px w-8 bg-[#f45e2b] lg:w-12" />
            <p className="text-[11px] font-semibold md:text-[12px]">{study.eyebrow}</p>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#111111] text-balance">{study.title}</h1>

          <p className="max-w-xl text-[1.05rem] leading-[1.8] text-[#4b4b4b] text-pretty">{study.lede}</p>

          <div className="flex flex-wrap gap-3">
            {study.liveSite && (
              <a href={study.liveSite} target="_blank" rel="noreferrer" className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#f45e2b]">
                Visit site <span aria-hidden="true">↗</span>
              </a>
            )}
            <Link href="/portfolio" className="rounded-full border border-[#111111] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#111111] hover:text-white">
              Go back to work
            </Link>
          </div>

        </div>

        <figure className="flex flex-col gap-3">
          <BrowserFrame image={study.image} />
          <figcaption className="flex justify-between text-xs text-[#6b6b6b]">
            <span>Homepage - desktop</span>
            <span className="font-mono">1920 x 1080</span>
          </figcaption>
        </figure>
      </div>

      <dl className="mt-16 grid gap-8 border-t border-[#e6e6e6] pt-10 md:grid-cols-3 md:gap-0 md:border-t-0 md:pt-0">
        {[
          { label: "Client", value: study.client },
          { label: "Role", value: study.role },
          { label: "Category", value: study.category },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-2 text-center md:px-8 ${i > 0 ? "md:border-l md:border-[#e6e6e6]" : "md:pl-0"}`}
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f45e2b]">{item.label}</dt>
            <dd className="text-sm font-medium leading-[1.7] text-[#111111]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BrowserFrame({ image }: { image: string }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-4 bg-[#111111] px-4 py-2.5 text-white/70">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex gap-2" aria-hidden="true">
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs">
          <Search className="size-3" aria-hidden="true" />
          <span className="mx-auto">{image.replace(/^\/assets\/portfolio\//, '').replace(/\.(png|jpg|jpeg|webp)$/i, '')}</span>
        </div>
      </div>
      <Image
        src={image}
        alt="Same Day Dental Clinic homepage hero"
        width={1926}
        height={816}
        priority
        className="aspect-[1926/816] w-full object-cover"
      />
    </div>
  );
}

function StatsRow({ study }: { study: CaseStudyData }) {
  return (
    <section aria-label="Clinic statistics" className="mx-auto max-w-7xl px-6 lg:px-10">
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {study.stats.map((stat, i) => (
          <li
            key={stat.label}
            className={`relative flex h-32 items-center justify-center border-[#e6e6e6] ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l lg:border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""}`}
          >
            <span aria-hidden="true" className="select-none text-7xl font-extrabold tracking-tight text-transparent [-webkit-text-stroke:2px_#e6e6e6] md:text-8xl">
              {stat.value}
            </span>
            <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-[11px] font-semibold uppercase leading-snug tracking-[0.18em] text-[#f45e2b] text-balance">
              <span className="sr-only">{stat.value} </span>
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function OverviewSection({ study }: { study: CaseStudyData }) {
  return (
    <section className="wrap">
      <SectionLabel>01 / Overview</SectionLabel>
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-6 text-base leading-relaxed text-pretty">
          <h3 className="text-[clamp(1.6rem,2vw,2.2rem)] font-black leading-tight tracking-[-0.04em]">{study.overviewTitle}</h3>
          {study.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Image
          src={study.overviewImage ?? study.image}
          alt={`${study.title} overview`}
          width={1563}
          height={1006}
          className="w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}

type Note = { number: string; title: string; text: string; left: number; top: number };

function StickyNotes({ title, notes, connectors, boardHeight }: { title: string; notes: Note[]; connectors: string[]; boardHeight: number }) {
  return (
    <section className="wrap">
      <SectionLabel>{title}</SectionLabel>

      <ol className="mt-8 flex flex-col gap-10 md:hidden">
        {notes.map((note) => (
          <li key={note.number} className="mx-auto w-full max-w-xs">
            <NoteCard note={note} />
          </li>
        ))}
      </ol>

      <div className="relative mt-6 hidden w-full md:block" style={{ aspectRatio: `1200 / ${boardHeight}` }}>
        <svg
          aria-hidden="true"
          viewBox={`0 0 1200 ${boardHeight}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="14 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {connectors.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <ol>
          {notes.map((note) => (
            <li key={note.number} className="absolute w-[26%]" style={{ left: `${note.left}%`, top: `${note.top}%` }}>
              <NoteCard note={note} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function NoteCard({ note }: { note: Note }) {
  return (
    <article className="relative bg-white p-4 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.35)]">
      <Pin aria-hidden="true" className="absolute -top-3 -right-2 size-12 rotate-[30deg] text-[#6b6b6b]/70 drop-shadow" strokeWidth={1.25} />
      <p className="text-2xl font-bold">{note.number}</p>
      <div className="mt-3 flex flex-col gap-2 rounded-lg bg-[#fbe9e0] px-5 py-7 text-center">
        <h3 className="text-base font-bold leading-snug text-balance">{note.title}</h3>
        <p className="text-sm leading-relaxed text-pretty">{note.text}</p>
      </div>
    </article>
  );
}

function StandoutFlowSection({ study }: { study: CaseStudyData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="pt-2">
        <SectionLabel>04 / Why it stands out</SectionLabel>
      </div>

      <div className="relative mt-8 pl-4 md:pl-4">
        <ol className="space-y-7 pl-10 md:pl-12">
          {study.standout.map((point, index) => (
            <li key={point.title} className="relative">
              <span className="absolute left-[-2.3rem] top-6 flex size-8 items-center justify-center rounded-full bg-[#f45e2b] text-[10px] font-black text-white md:left-[-2.8rem] md:top-5 md:size-9">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="rounded-xl border border-[#f0f0f0] bg-[#fffaf8] p-5 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.25)]">
                <h3 className="text-[1.15rem] font-black leading-tight tracking-[-0.02em] text-[#111111]">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-[#4b4b4b] text-pretty">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const designSteps = [
  {
    icon: Search,
    title: "Discover",
    items: ["Stakeholder interviews", "Patient journey review", "Competitor clinics audit"],
  },
  {
    icon: Target,
    title: "Define",
    items: ["Patient personas", "Anxiety & trust mapping", "Information architecture"],
  },
  {
    icon: Lightbulb,
    title: "Ideate",
    items: ["Navigation restructure", "Content grouping", "Booking flow sketches"],
  },
  {
    icon: PenLine,
    title: "Design",
    items: ["Wireframes -> high fidelity", "Visual & component system", "Responsive prototype"],
  },
  {
    icon: Check,
    title: "Test",
    items: ["Usability walkthroughs", "Mobile QA", "Iteration on feedback"],
  },
];

function DesignProcessSection() {
  return (
    <section className="wrap max-md:text-center">
      <div className="max-md:flex max-md:justify-center">
        <SectionLabel size="sm">05 / Design process</SectionLabel>
      </div>

      <div className="relative mt-10">
        <ol className="relative z-10 grid justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {designSteps.map((step, index) => (
            <li key={step.title} className="relative flex w-full max-w-xs flex-col items-center gap-4 text-center lg:items-start lg:text-left">
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-[#f45e2b]/60 bg-white text-[#f45e2b] shadow-sm">
                <step.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              {index < designSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-6 hidden h-px border-t-2 border-dashed border-[#111111] lg:block"
                  style={{ width: "calc(100% + 2.5rem)" }}
                />
              )}
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <ul className="flex flex-col items-center gap-1 text-xs leading-relaxed text-muted-foreground lg:items-start">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type Device = 'desktop' | 'mobile';
type Mode = 'live' | 'screenshot';

function PreviewSection({ study }: { study: CaseStudyData }) {
  const [device, setDevice] = useState<Device>('desktop');
  const [mode, setMode] = useState<Mode>('screenshot');
  const liveUrl = study.liveSite ? `/portfolio/${study.slug}/preview` : undefined;

  const width = device === 'desktop' ? '1440px' : '390px';

  return (
    <section className="mx-auto max-w-7xl" id="preview">
      <div className="px-6 lg:px-10">
        <SectionLabel size="sm">07 / Preview</SectionLabel>
        <h3 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.6rem]">
          Desktop &amp; mobile - live.
        </h3>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#e6e6e6] bg-white p-1.5 shadow-sm">
          <div role="tablist" aria-label="Preview device" className="flex gap-1">
            {(['desktop', 'mobile'] as Device[]).map((d) => (
              <button
                key={d}
                role="tab"
                type="button"
                aria-selected={device === d}
                onClick={() => setDevice(d)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                  device === d ? 'bg-[#111111] text-white' : 'hover:bg-[#f5f5f5]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <span aria-hidden="true" className="h-5 w-px bg-[#e6e6e6]" />
          <div role="tablist" aria-label="Preview mode" className="flex gap-1">
            {(
              [
                { id: 'live', label: 'Try live' },
                { id: 'screenshot', label: 'Screenshot' },
              ] as { id: Mode; label: string }[]
            ).map((m) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                aria-selected={mode === m.id}
                onClick={() => setMode(m.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  mode === m.id ? 'bg-[#f45e2b] text-white' : 'hover:bg-[#f5f5f5]'
                }`}
              >
                {m.id === 'live' && !liveUrl ? 'Live unavailable' : m.label}
              </button>
            ))}
          </div>
          <span className="pr-3 pl-1 text-xs text-[#6b6b6b]">{width}</span>
        </div>

        <div className="w-full rounded-2xl border border-[#e6e6e6] bg-white p-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:p-6">
          <div
            className={`mx-auto overflow-hidden rounded-xl border border-[#e6e6e6] bg-white ${
              device === 'mobile' ? 'w-full max-w-[390px]' : 'w-full'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-[#e6e6e6] bg-[#f5f5f5] px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#e6e6e6]" />
                <span className="size-2.5 rounded-full bg-[#e6e6e6]" />
                <span className="size-2.5 rounded-full bg-[#e6e6e6]" />
              </div>
              <span className="truncate text-xs text-[#6b6b6b]">
                {study.liveSite?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? 'local preview'}
              </span>
            </div>

            {mode === 'live' && liveUrl ? (
              <iframe
                src={liveUrl}
                title={`${study.title} live site`}
                loading="lazy"
                className={`block w-full bg-white ${
                  device === 'mobile' ? 'aspect-[390/780]' : 'aspect-[16/9]'
                }`}
              />
            ) : device === 'desktop' ? (
              <Image
                src={study.previewImage ?? study.image}
                alt={`${study.title} homepage on desktop`}
                width={1926}
                height={816}
                className="block w-full object-cover"
              />
            ) : (
              <Image
                src={study.mobileImage ?? study.previewImage ?? study.image}
                alt={`${study.title} homepage on mobile`}
                width={942}
                height={1670}
                className="block w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const lineColor = 'bg-[#111111]/25';

function Sitemap({ study }: { study: CaseStudyData }) {
  return (
    <section className="mx-auto max-w-7xl" id="sitemap">
      <div className="px-6 lg:px-10">
        <SectionLabel size="sm">08 / Sitemap</SectionLabel>
        <h3 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.6rem]">
          Information architecture
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
          A project-specific structure keeps the experience browsable and makes the next step clear.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center px-6 lg:px-10">
        <div className="rounded-md bg-[#111111] px-6 py-2.5 text-sm font-semibold text-white">
          Home
        </div>
        <span aria-hidden="true" className={`h-8 w-px ${lineColor}`} />

        <ul className="relative grid w-full grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
          {/* horizontal trunk connecting first and last branch centers on desktop */}
          <span
            aria-hidden="true"
            className={`absolute top-0 left-[8.333%] right-[8.333%] hidden h-px lg:block ${lineColor}`}
          />
          {study.sitemap.map((branch) => (
            <li key={branch.title} className="flex flex-col items-center">
              <span aria-hidden="true" className={`hidden h-6 w-px lg:block ${lineColor}`} />
              <div className="rounded-md border border-[#111111] bg-white px-4 py-2 text-center text-xs font-semibold">
                {branch.title}
              </div>
              <ul className="flex flex-col items-center">
                {branch.children.map((child) => (
                  <li key={child} className="flex flex-col items-center">
                    <span aria-hidden="true" className={`h-4 w-px ${lineColor}`} />
                    <span className="rounded-md border border-[#e6e6e6] bg-white px-3 py-1.5 text-center text-[11px] leading-snug text-[#111111]">
                      {child}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  const challengeNotes: Note[] = study.problems.map((problem, index) => ({
    number: `0${index + 1}`,
    title: problem.title,
    text: problem.text,
    left: [3, 36, 71][index] ?? 0,
    top: [0, 32, 0][index] ?? 0,
  }));

  const solutionNotes: Note[] = study.solutions.map((solution, index) => ({
    number: `0${index + 1}`,
    title: solution.title,
    text: solution.text,
    left: [3, 36, 71, 3, 36, 71][index] ?? 0,
    top: [0, 8, 12, 48, 52, 48][index] ?? 0,
  }));

  return (
    <main className="overflow-x-hidden bg-white text-[#111111]">
      <Navbar />

      <ScrollReveal className="mb-10 lg:mb-16">
        <CaseHero study={study} />
      </ScrollReveal>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <dl className="grid gap-8 border-t border-[#e6e6e6] pt-10 md:grid-cols-3 md:gap-0 md:border-t-0 md:pt-0" />
      </div>

      <ScrollReveal className="my-10 lg:my-16">
        <StatsRow study={study} />
      </ScrollReveal>

      <ScrollReveal className="my-14 lg:my-24">
        <OverviewSection study={study} />
      </ScrollReveal>
      <div className="my-8 lg:my-12">
        <CapabilityWave />
      </div>
      <ScrollReveal className="my-14 lg:my-24">
        <StickyNotes title="02 / The challenge" notes={challengeNotes} connectors={["M348 170 H 400 V 420 H 430", "M746 400 H 800 V 130 H 852", "M520 230 C 520 260, 520 265, 520 290"]} boardHeight={640} />
      </ScrollReveal>
      <ScrollReveal className="my-14 lg:my-24">
        <StickyNotes title="03 / The solution" notes={solutionNotes} connectors={["M348 160 H 400 V 230 H 432", "M744 230 H 800 V 160 H 852", "M1008 290 V 330 H 190 V 440", "M348 540 H 400 V 590 H 432", "M744 590 H 800 V 540 H 852"]} boardHeight={760} />
      </ScrollReveal>
      <ScrollReveal className="my-14 lg:my-24">
        <StandoutFlowSection study={study} />
      </ScrollReveal>
      <div className="my-8 lg:my-12">
        <CapabilityWave />
      </div>
      <ScrollReveal className="my-14 lg:my-24">
        <DesignProcessSection />
      </ScrollReveal>
      <ScrollReveal className="my-14 lg:my-24">
        <Technology study={study} />
      </ScrollReveal>
      <ScrollReveal className="my-14 lg:my-24">
        <PreviewSection study={study} />
      </ScrollReveal>
      <ScrollReveal className="my-14 lg:my-24">
        <Sitemap study={study} />
      </ScrollReveal>
      <SimpleFooter />
    </main>
  );
}
