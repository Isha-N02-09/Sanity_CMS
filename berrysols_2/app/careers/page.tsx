"use client";

import { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  MonitorCheck,
  Palette,
  Rocket,
  Settings,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import BlogHero from "@/app/blog/BlogHero";
import { careerRoles } from "@/data/careers";

const process = [
  {
    step: "01",
    title: "Apply",
    copy: "Send your CV and a couple of things you have built.",
    icon: Handshake,
  },
  {
    step: "02",
    title: "Review",
    copy: "We read every application with direct feedback and a clear next step.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Interview",
    copy: "A conversation about your work, your thinking, and how you operate.",
    icon: Settings,
  },
  {
    step: "04",
    title: "Technical round",
    copy: "A short, practical challenge close to the kind of work we ship.",
    icon: MonitorCheck,
  },
  {
    step: "05",
    title: "Offer",
    copy: "We move fast when the fit is clear and the chemistry is right.",
    icon: Rocket,
  },
];

export default function CareersPage() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className="min-h-screen bg-white text-[#171410]">
      <style jsx>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .careers-marquee {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
          background: #fff;
          white-space: nowrap;
        }

        .careers-marquee-track {
          display: inline-flex;
          min-width: 100%;
          padding: 16px 0;
          animation: careers-scroll 24s linear infinite;
        }

        .careers-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          color: #111;
          font-size: 17px;
          letter-spacing: -0.02em;
          font-weight: 500;
          padding-right: 28px;
          text-transform: none;
        }

        .careers-marquee-item strong {
          color: #111;
          font-weight: 600;
        }

        @keyframes careers-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .careers-hero {
          margin-top: 74px;
          background: #fff;
        }

        .careers-rule {
          height: 1px;
          width: 100vw;
          margin-left: calc((100% - 100vw) / 2);
          margin-bottom: 10px;
          background: #111;
          opacity: 0.55;
        }

        .careers-masthead {
          padding: 0 0 38px;
        }

        .careers-masthead > p:first-of-type {
          margin: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        .careers-breadcrumb {
          margin-left: 24px !important;
        }

        .careers-masthead h1 {
          margin: 6px 0 0;
          font-size: clamp(4.8rem, 15.5vw, 12.8rem);
          font-weight: 800;
          line-height: 0.78;
          letter-spacing: -0.08em;
          text-align: center;
        }

        .careers-masthead > div:last-child {
          align-items: center;
          flex-direction: column;
          margin-top: 28px;
          gap: 22px;
          text-align: center;
        }

        .careers-masthead > div:last-child p {
          max-width: 42rem;
          color: #111;
          font-size: 1.125rem;
          line-height: 2rem;
        }

        .careers-role-row {
          transition: transform 0.25s ease, background 0.25s ease, padding-left 0.25s ease;
        }

        .careers-role-row:hover {
          transform: translateY(-1px);
          background: rgba(245, 240, 230, 0.55);
          padding-left: 18px;
        }

        .careers-role-arrow {
          transition: all 0.25s ease;
        }

        .careers-role-row:hover .careers-role-arrow {
          background: var(--orange);
          border-color: var(--orange);
          color: white;
          transform: rotate(45deg);
        }

        .process-line {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          min-height: 430px;
        }

        .process-line::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: #111;
        }

        .process-line::after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          height: 1px;
          width: 100%;
          background: #111;
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 1s ease;
        }

        [data-reveal].is-visible .process-line::after {
          transform: scaleX(1);
        }

        .process-step {
          position: relative;
          display: block;
          min-width: 0;
          text-align: center;
        }

        .process-marker {
          position: absolute;
          left: 50%;
          top: calc(50% - 86px);
          z-index: 1;
          display: grid;
          width: 62px;
          height: 62px;
          flex: 0 0 62px;
          place-items: center;
          border-radius: 50%;
          background: #111;
          color: #fff;
          transform: translateX(-50%);
        }

        .process-marker::after {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 1px;
          height: 22px;
          background: #111;
          content: "";
          transform: translateX(-50%);
        }

        .process-step:nth-child(even) .process-marker {
          top: calc(50% + 76px);
        }

        .process-step:nth-child(even) .process-marker::after {
          top: auto;
          bottom: 100%;
          height: 76px;
        }

        .process-number {
          position: absolute;
          top: calc(50% - 54px);
          font-size: 15px;
          font-weight: 700;
          color: #111;
          transform: translateY(-50%);
        }

        .process-step:nth-child(odd) .process-number {
          right: calc(100% + 10px);
        }

        .process-step:nth-child(even) .process-number {
          left: calc(100% + 10px);
          top: calc(50% + 107px);
        }

        .process-step-copy {
          position: absolute;
          top: 0;
          left: 50%;
          max-width: 170px;
          width: calc(100% - 24px);
          transform: translateX(-50%);
        }

        .process-step:nth-child(even) .process-step-copy {
          top: calc(50% + 154px);
        }

        .process-step h3 {
          margin-bottom: 6px;
          font-size: 15px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .process-step p {
          color: #756f65;
          font-size: 12px;
          line-height: 1.45;
        }

        @media (max-width: 860px) {
          .careers-role-row {
            grid-template-columns: 1fr;
            row-gap: 10px;
          }

          .careers-role-arrow {
            display: flex;
            justify-self: end;
          }

          .process-line {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            min-height: 0;
            gap: 24px;
          }

          .process-line::before,
          .process-line::after {
            display: none;
          }

          .process-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 4px;
          }

          .process-marker,
          .process-step:nth-child(even) .process-marker {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
          }

          .process-marker::after,
          .process-step:nth-child(even) .process-marker::after {
            display: none;
          }

          .process-step-copy,
          .process-step:nth-child(even) .process-step-copy {
            position: relative;
            top: auto;
            left: auto;
            width: auto;
            margin-top: 14px;
            transform: none;
            order: 3;
          }

          .process-number,
          .process-step:nth-child(even) .process-number {
            position: static;
            display: block;
            order: 1;
            transform: none;
            margin: 0 0 8px;
          }

          .process-marker,
          .process-step:nth-child(even) .process-marker {
            order: 2;
          }
        }

        @media (max-width: 640px) {
          .careers-hero {
            margin-top: 84px;
          }

          .careers-masthead {
            padding-bottom: 28px;
          }

          .careers-masthead h1 {
            font-size: clamp(4.25rem, 22vw, 8rem);
          }
        }
      `}</style>

      <Navbar />

      <BlogHero className="careers-page-hero">
        <header className="blog-sheet-header">
          <div className="blog-rule" />
          <div className="blog-masthead">
            <p className="careers-breadcrumb">Join the team / Careers</p>
            <h1>CAREERS</h1>
            <p>Build what ships, not what gathers dust. A small team with direct ownership, making production work for real clients.</p>
          </div>
        </header>
      </BlogHero>

      <div className="careers-marquee" aria-label="Hiring highlights">
        <div className="careers-marquee-track">
          {[...Array(2)].flatMap(() => [
            <span key={Math.random()} className="careers-marquee-item"><strong>Frontend Developer</strong><span>·</span></span>,
            <span key={Math.random()} className="careers-marquee-item"><strong>AI Engineer</strong><span>·</span></span>,
            <span key={Math.random()} className="careers-marquee-item"><strong>UI/UX Designer</strong><span>·</span></span>,
          ])}
        </div>
      </div>

      <section data-reveal className="border-b border-black/10 bg-white py-14 md:py-20">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Benefits</p>
            <h2 className="max-w-sm text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl">Where great careers take shape.</h2>
          </div>

          <div>
            <h3 className="mb-6 border-b border-black/15 pb-4 text-xl font-semibold tracking-[-0.03em]">Growth &amp; Learning</h3>
            <div className="grid border-t border-black/15 sm:grid-cols-2">
              {[
                "Certification reimbursement",
                "Internal mobility program",
                "Mentorship matching",
                "Conference sponsorship",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 border-b border-black/15 py-5 text-base text-[#5f5a53] sm:pr-6">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#171410] text-sm text-white" aria-hidden="true">✓</span>
                  {benefit}
                </div>
              ))}
            </div>
            <p className="mt-10 text-xl font-semibold uppercase leading-tight tracking-[-0.03em] text-[#171410] md:text-2xl">Your growth, our priority.</p>
          </div>
        </div>
      </section>

      <section data-reveal className="border-b border-black/10 py-10 md:py-14">
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-serif text-[2rem] font-semibold leading-none text-[#f45e2b] md:text-[3rem]">Live</div>
            <p className="mt-4 max-w-[20rem] text-sm leading-6 text-[#756f65]">Every project ships to a real client, not a demo.</p>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-semibold leading-none text-[#f45e2b] md:text-[3rem]">Sialkot</div>
            <p className="mt-4 max-w-[20rem] text-sm leading-6 text-[#756f65]">Our onsite home base for the whole team.</p>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-semibold leading-none text-[#f45e2b] md:text-[3rem]">1:1</div>
            <p className="mt-4 max-w-[20rem] text-sm leading-6 text-[#756f65]">Direct mentorship, no layers of management.</p>
          </div>
        </div>
      </section>

      <section id="open-roles" data-reveal className="py-20 md:py-32">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">Open positions</p>
              <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.04em] md:text-6xl">Find your role.</h2>
            </div>
          </div>

          <div className="rounded-[18px] border border-black/10 bg-white">
            {careerRoles.map((role) => (
              <a
                key={role.title}
                href={`/careers/${role.slug}/apply`}
                className="careers-role-row grid items-center gap-5 border-b border-black/10 px-5 py-6 md:grid-cols-[2.3fr_1fr_1fr_auto] md:px-8"
              >
                <div>
                  <div className="text-[1.5rem] font-semibold tracking-[-0.03em] md:text-[1.9rem]">{role.title}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#756f65]">{role.dept}</div>
                </div>
                <div className="text-sm text-[#5f5a53]">{role.location}</div>
                <div className="text-sm text-[#5f5a53]">{role.type}</div>
                <div className="careers-role-arrow flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-transparent text-lg text-[#171410]">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="py-20 md:py-32">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">How hiring works</p>
              <h2 className="max-w-3xl text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl">Five steps, two to three weeks.</h2>
            </div>
          </div>

          <div className="process-line">
            {process.map((item) => (
              <div key={item.step} className="process-step">
                <span className="process-number">{item.step}</span>
                <div className="process-step-copy">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="process-marker">
                  <item.icon size={27} strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="pb-28 pt-10 md:pb-36">
        <div className="container mx-auto rounded-[28px] border border-black/10 bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">
                <Sparkles size={16} aria-hidden="true" />
                We are always open
              </div>
              <h2 className="max-w-[20ch] text-3xl font-bold uppercase leading-[0.95] tracking-[-0.04em] md:text-5xl">
                Don’t see your role? Introduce yourself anyway.
              </h2>
            </div>

            <div className="flex flex-col items-start gap-5">
              <p className="max-w-[32rem] text-base leading-7 text-[#5f5a53]">
                We are always interested in meeting people who build good software. Send your CV and tell us the kind of work you would love to do.
              </p>
              <a
                href="mailto:careers@berrysols.com?subject=Introduce%20myself"
                className="inline-flex items-center gap-2 rounded-full bg-[#171410] px-7 py-4 text-sm font-semibold uppercase tracking-[0.04em] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#ce4111]"
              >
                Send your CV <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </main>
  );
}
