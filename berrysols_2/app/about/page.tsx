"use client";


import "@/styles/about.css";
import { useEffect, useRef, useState } from "react";
import { BarChart3, Bot, MessageCircle, Zap } from "lucide-react";
import SimpleFooter from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import CapabilityWave from "@/components/home/CapabilityWave";
import ImpactStats from "@/components/home/ImpactStats";
import RoadReveal from "@/components/about/RoadReveal";

const TEAM = [
  {
    name: "Isha",
    role: "AI & Automation",
    img: "/assets/team/isha.png",
    initials: "IS",
  },
  {
    name: "Ahmed mehmood",
    role: "Chief Technology Officer",
    img: "/assets/team/ahmed.png",
    initials: "AM",
  },
  {
    name: "Ahsan Mehmood",
    role: "Chief Executive Officer",
    img: "/assets/team/ahsan.jpg",
    initials: "AH",
  },
  {
    name: "Safi Ahmed",
    role: "Project Manager",
    img: "/assets/team/safi.jpg",
    initials: "SA",
  },
  {
    name: "Fahad Yaseen",
    role: "Software Developer",
    img: "/assets/team/fahad.jpg",
    initials: "FY",
  },
];

export default function AboutPage() {
  const whoHeroRef = useRef<HTMLElement>(null);
  const halfLeftRef = useRef<HTMLSpanElement>(null);
  const halfRightRef = useRef<HTMLSpanElement>(null);
  const whoEyebrowRef = useRef<HTMLDivElement>(null);
  const whoStoryRef = useRef<HTMLDivElement>(null);
  const stepsWrapRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);
  const dotFieldSvgRef = useRef<SVGSVGElement>(null);

  const [activeTeam, setActiveTeam] = useState(2);

  // generic reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    document
      .querySelectorAll(".reveal, .reveal-stagger, .step")
      .forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);

  // "Who We Are" pinned reveal
  useEffect(() => {
    function onScrollWho() {
      const whoHero = whoHeroRef.current;
      const halfLeft = halfLeftRef.current;
      const halfRight = halfRightRef.current;
      const whoEyebrow = whoEyebrowRef.current;
      const whoStory = whoStoryRef.current;

      if (
        !whoHero ||
        !halfLeft ||
        !halfRight ||
        !whoEyebrow ||
        !whoStory
      ) {
        return;
      }

      const rect = whoHero.getBoundingClientRect();
      const total = whoHero.offsetHeight - window.innerHeight;

      const scrolled = -rect.top;

      const progress =
        total > 0
          ? Math.min(Math.max(scrolled / total, 0), 1)
          : 0;

      const spread = progress * 46;

      halfLeft.style.transform = `translateX(${-spread}vw)`;
      halfRight.style.transform = `translateX(${spread}vw)`;

      const titleFade = Math.max(1 - progress * 1.6, 0);

      halfLeft.style.opacity = String(titleFade);
      halfRight.style.opacity = String(titleFade);
      whoEyebrow.style.opacity = String(titleFade);

      const storyIn = Math.min(
        Math.max((progress - 0.25) / 0.55, 0),
        1
      );

      whoStory.style.opacity = String(storyIn);
      whoStory.style.transform = `translateY(${(1 - storyIn) * 18}px)`;
    }

    document.addEventListener("scroll", onScrollWho, {
      passive: true,
    });

    window.addEventListener("resize", onScrollWho);

    onScrollWho();

    return () => {
      document.removeEventListener("scroll", onScrollWho);
      window.removeEventListener("resize", onScrollWho);
    };
  }, []);

  // approach timeline fill
  useEffect(() => {
    function onScrollSteps() {
      const stepsWrap = stepsWrapRef.current;
      const fillLine = fillLineRef.current;

      if (!stepsWrap || !fillLine) return;

      const rect = stepsWrap.getBoundingClientRect();
      const steps = stepsWrap.querySelectorAll<HTMLElement>(".step");

      const progressed = Math.min(
        Math.max(
          (window.innerHeight * 0.8 - rect.top) / rect.height,
          0
        ),
        1
      );

      fillLine.style.height = progressed * 100 + "%";

      steps.forEach((step, idx) => {
        const stepRect = step.getBoundingClientRect();
        const center = stepRect.top + stepRect.height / 2;
        const travel = window.innerHeight * 0.72 - center;
        const distance = Math.abs(travel) / (window.innerHeight * 0.65);

        step.classList.toggle("active", distance < 0.9);
        step.style.setProperty("--pulse", String(1 - Math.min(distance, 1)));

        if (idx < steps.length - 1) {
          const next = steps[idx + 1];
          const nextRect = next.getBoundingClientRect();
          const nextCenter = nextRect.top + nextRect.height / 2;
          const linkGlow = Math.max(0, 1 - Math.abs((center + nextCenter) / 2 - window.innerHeight * 0.62) / (window.innerHeight * 0.42));
          next.style.setProperty("--link-glow", String(linkGlow));
        }
      });
    }

    document.addEventListener("scroll", onScrollSteps, {
      passive: true,
    });

    window.addEventListener("resize", onScrollSteps);

    onScrollSteps();

    return () => {
      document.removeEventListener("scroll", onScrollSteps);
      window.removeEventListener("resize", onScrollSteps);
    };
  }, []);

  // fixed bubble field
  useEffect(() => {
    const svg = dotFieldSvgRef.current;

    if (!svg) return;

    const NS = "http://www.w3.org/2000/svg";

    const W = 1000;
    const H = 620;

    const cx0 = W * 0.86;
    const cy0 = H * 0.88;

    const spreadX = W * 0.4;
    const spreadY = H * 0.5;

    const count = 70;

    const dots: {
      el: SVGCircleElement;
      dx: number;
      dy: number;
      baseR: number;
      speed: number;
      phase: number;
      wobble: number;
      pulse: number;
    }[] = [];

    const SHADES = [
      "#FF5A1F",
      "#FF8A3D",
      "#FFB020",
      "#E0470B",
      "#FFD08A",
    ];

    let seed = 42;

    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < count; i++) {
      const baseX =
        cx0 + (rand() - 0.5) * 2 * spreadX * rand();

      const baseY =
        cy0 + (rand() - 0.5) * 2 * spreadY * rand();

      const baseR = 3 + rand() * rand() * 20;

      const circle = document.createElementNS(NS, "circle");

      circle.setAttribute("r", String(baseR));

      circle.setAttribute(
        "fill",
        SHADES[Math.floor(rand() * SHADES.length)]
      );

      circle.style.opacity = String(0.18 + rand() * 0.42);

      svg.appendChild(circle);

      dots.push({
        el: circle,
        dx: baseX - cx0,
        dy: baseY - cy0,
        baseR,
        speed: 0.5 + rand() * 1.2,
        phase: rand() * Math.PI * 2,
        wobble: 8 + rand() * 20,
        pulse: 0.3 + rand() * 0.6,
      });
    }

    let targetFrac = 0;
    let currentFrac = 0;

    function onScroll() {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      targetFrac =
        max > 0 ? window.scrollY / max : 0;
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll, {
      passive: true,
    });

    onScroll();

    let raf = 0;

    function tick() {
      currentFrac +=
        (targetFrac - currentFrac) * 0.06;

      const angle =
        currentFrac * Math.PI * 1.6;

      const scale =
        0.85 + currentFrac * 0.3;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      dots.forEach((d) => {
        const rx =
          (d.dx * cos - d.dy * sin) * scale;

        const ry =
          (d.dx * sin + d.dy * cos) * scale;

        const t =
          currentFrac * 12 * d.speed + d.phase;

        const x =
          cx0 +
          rx +
          Math.sin(t) * d.wobble;

        const y =
          cy0 +
          ry +
          Math.cos(t * 0.8) * d.wobble;

        const r = Math.max(
          2,
          d.baseR +
            Math.sin(t * 1.3) *
              d.baseR *
              d.pulse *
              0.5
        );

        d.el.setAttribute("cx", x.toFixed(1));
        d.el.setAttribute("cy", y.toFixed(1));
        d.el.setAttribute("r", r.toFixed(1));
      });

      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      cancelAnimationFrame(raf);

      dots.forEach((d) => d.el.remove());
    };
  }, []);

  return (
    <>
     

      <main>
        <Navbar />

        <div className="bg-layer" />


        {/* ===================== WHO WE ARE ===================== */}
        <section className="who-hero" ref={whoHeroRef} data-back-to-top-hero>
          <div className="who-sticky">
            <div
              className="eyebrow who-eyebrow"
              ref={whoEyebrowRef}
            >
            About Berry Solutions
            </div>

            <h1 className="who-title">
              <span
                className="half"
                ref={halfLeftRef}
              >
                Who we
              </span>

              <span
                className="half accent-word"
                ref={halfRightRef}
              >
                are
              </span>
            </h1>

            <div
              className="who-story"
              ref={whoStoryRef}
            >
              <p>
                A team that came together around one belief — technology works best when it starts with people. From early ideas to complex challenges, we’ve grown into a studio of thinkers and builders who listen, question, and create with purpose.
              </p>
            </div>

            <div className="who-cue">
              Keep scrolling
            </div>
          </div>
        </section>

        <section className="section mission-vision-section" aria-labelledby="mission-vision-heading">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">What guides us</span>
              <h2 id="mission-vision-heading">Our Mission <span className="accent-word">&amp; Vision</span></h2>
            </div>

            <div className="mission-vision-cards reveal-stagger">
              <article className="mission-vision-card">
                <h3>Mission</h3>
                <p>
                  We combine strategy, design, and technology to create clear,
                  useful digital products that help businesses move forward.
                </p>
              </article>

              <article className="mission-vision-card">
                <h3>Vision</h3>
                <p>
                  To make technology feel simpler, smarter, and more human for
                  every business we work with.
                </p>
              </article>
            </div>
          </div>
        </section>

        <CapabilityWave />

        {/* ===================== ORIGIN STORY ===================== */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">
                Where it started
              </span>

              <h2 className="origin-title">
                The story behind Berry Solutions
              </h2>
            </div>

            <div className="story-copy">
              <RoadReveal
                className="milestones-road"
                contentClassName="milestones reveal-stagger"
              >
                <article className="milestone">
                  <div className="milestone-year">2021</div>
                  <div className="milestone-card">
                    <h3>The Spark</h3>
                    <p>An idea to build technology with purpose.</p>
                  </div>
                </article>
                <article className="milestone">
                  <div className="milestone-year">2022</div>
                  <div className="milestone-card">
                    <h3>The Foundation</h3>
                    <p>Turning that idea into something real.</p>
                  </div>
                </article>
                <article className="milestone">
                  <div className="milestone-year">2023</div>
                  <div className="milestone-card">
                    <h3>The Lessons</h3>
                    <p>Every project taught us how to build better.</p>
                  </div>
                </article>
                <article className="milestone">
                  <div className="milestone-year">2024</div>
                  <div className="milestone-card">
                    <h3>The Expansion</h3>
                    <p>From individual solutions to bigger business challenges.</p>
                  </div>
                </article>
                <article className="milestone">
                  <div className="milestone-year">2025</div>
                  <div className="milestone-card">
                    <h3>The Impact</h3>
                    <p>Creating technology that moves businesses forward.</p>
                  </div>
                </article>
                <article className="milestone">
                  <div className="milestone-year">2026</div>
                  <div className="milestone-card">
                    <h3>The Next Chapter</h3>
                    <p>Still questioning. Still building. Still moving forward.</p>
                  </div>
                </article>
              </RoadReveal>
            </div>
          </div>
        </section>

        <ImpactStats />

        {/* ===================== APPROACH ===================== */}
        <section className="section workflow-section">
          <div className="wrap workflow-grid">
            <div className="workflow-copy reveal">
              <span className="eyebrow workflow-eyebrow">
                OUR WORKFLOW
              </span>

              <h2>
                THIS IS HOW WE APPROACH
                <span>EVERY SINGLE PROJECT</span>
              </h2>

              <p>
                At Berry Solutions, we believe successful projects start with clarity and end with measurable impact. With 5+ years of experience in IT services, our process ensures efficiency, transparency, and results that exceed expectations for businesses worldwide.
              </p>

              <a href="/portfolio" className="workflow-cta">
                VIEW ALL PORTFOLIO
              </a>
            </div>

            <div className="workflow-column">
              <div className="workflow-list">
                <div className="workflow-item reveal">
                  <div className="workflow-icon" aria-hidden="true">
                    <span className="workflow-mark">◼</span>
                  </div>
                  <div className="workflow-content">
                    <h3>
                      <a href="/services">
                        Introduction
                      </a>
                    </h3>
                    <p>
                      Berry Solutions helps businesses grow with innovative technology services tailored to their unique needs. From IT support to digital transformation, we keep you ahead in the digital world.
                    </p>
                  </div>
                </div>

                <div className="workflow-item reveal">
                  <div className="workflow-icon" aria-hidden="true">
                    <span className="workflow-mark">◫</span>
                  </div>
                  <div className="workflow-content">
                    <h3>
                      <a href="/services">
                        IT Strategy Consulting
                      </a>
                    </h3>
                    <p>
                      IT strategy consulting helps businesses align technology with long-term goals, driving growth and efficiency.
                    </p>
                  </div>
                </div>

                <div className="workflow-item reveal">
                  <div className="workflow-icon" aria-hidden="true">
                    <span className="workflow-mark">◌</span>
                  </div>
                  <div className="workflow-content">
                    <h3>
                      <a href="/services">
                        Meeting
                      </a>
                    </h3>
                    <p>
                      It’s not just a discussion, it’s the starting point for creating strategies that drive real business growth.
                    </p>
                  </div>
                </div>

                <div className="workflow-item reveal">
                  <div className="workflow-icon" aria-hidden="true">
                    <span className="workflow-mark">▣</span>
                  </div>
                  <div className="workflow-content">
                    <h3>
                      <a href="/services">
                        Business Goals and KPIs
                      </a>
                    </h3>
                    <p>
                      Business Goals and KPIs help organizations set clear objectives and measure progress effectively. Goals define where you want to go, while KPIs track how well you’re getting there.
                    </p>
                  </div>
                </div>

                <div className="workflow-item reveal">
                  <div className="workflow-icon" aria-hidden="true">
                    <span className="workflow-mark">◍</span>
                  </div>
                  <div className="workflow-content">
                    <h3>
                      <a href="/services">
                        Scope of work
                      </a>
                    </h3>
                    <p>
                      Berry Solutions creates clear, detailed Scope of Work (SOW) documents that align vision, define deliverables, and ensure flawless project execution from start to finish.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================== TEAM ===================== */}
        <section className="section family-section">
          <div className="wrap">

            <div className="section-head reveal">
              <span className="eyebrow">
                Our Team
              </span>

              <h2>
                Small on paper. Close in practice.
              </h2>

              <p>
                We&apos;re small enough that everyone knows
                every project, and close enough that
                &quot;team meeting&quot; usually looks a lot
                like family dinner — opinions included.
              </p>
            </div>

            <div className="team-stage reveal">
              {TEAM.map((member, i) => (
                <div
                  key={i}
                  className={`team-card${
                    activeTeam === i ? " active" : ""
                  }`}
                  onClick={() => setActiveTeam(i)}
                >
                  {member.img && <img src={member.img} alt={`${member.name} portrait`} />}
                  {!member.img && <div className="fallback">{member.initials}</div>}
                </div>
              ))}
            </div>

            <div className="team-info">
              <h3>{TEAM[activeTeam].name}</h3>

              <div className="m-role">
                {TEAM[activeTeam].role}
              </div>
            </div>

            <div className="team-dots">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show team member ${i + 1}`}
                  className={
                    activeTeam === i ? "active" : ""
                  }
                  onClick={() => setActiveTeam(i)}
                />
              ))}
            </div>

          </div>
        </section>

      </main>

      <SimpleFooter />
    </>
  );
}