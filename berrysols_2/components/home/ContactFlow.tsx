"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {useServices} from "@/lib/sanity/useServices";

const steps = 6;
const whatsappNumber = "92339456789";

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

function Icon({ name }: { name: "chat" | "user" | "mail" | "layers" | "note" | "check" }) {
  const common = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "chat") {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M5 6.5h14v9.2H9.2L5 19.5V6.5Z" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19c1.4-3 3.6-4.5 6.5-4.5S17.6 16 19 19" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M4.5 8.5 12 4.5l7.5 4L12 12.5 4.5 8.5Z" />
        <path d="m4.5 12.2 7.5 4 7.5-4" />
        <path d="m4.5 15.8 7.5 4 7.5-4" />
      </svg>
    );
  }
  if (name === "note") {
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
        <path d="M7 4.5h7.2L19.5 10v9.5H7V4.5Z" />
        <path d="M14 4.5V10h5.5" />
        <path d="M10 13.5h6M10 17h4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
      <path d="M5.5 12.5 10 17l8.5-9" />
    </svg>
  );
}

const icons: Array<"chat" | "user" | "mail" | "layers" | "note" | "check"> = ["chat", "user", "mail", "layers", "note", "check"];

export default function ContactFlow() {
  const services = useServices();
  const projectTypes = [...services.map((service) => service.eyebrow), "Other"];
  const flowRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [points, setPoints] = useState<{ x: number; y: number }[]>(() => icons.map(() => ({ x: 0, y: 0 })));

  const layoutBubbles = useCallback(() => {
    const flow = flowRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!flow || !path || !svg) return;
    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;
    const length = path.getTotalLength();
    const flowRect = flow.getBoundingClientRect();
    const scaleX = svgRect.width / 1000;
    const scaleY = svgRect.height / 170;
    const offsetX = svgRect.left - flowRect.left;
    const offsetY = svgRect.top - flowRect.top;
    const next = icons.map((_, index) => {
      const frac = icons.length === 1 ? 0.5 : index / (icons.length - 1);
      const point = path.getPointAtLength(length * frac);
      return { x: offsetX + point.x * scaleX, y: offsetY + point.y * scaleY };
    });
    setPoints(next);
  }, []);

  useEffect(() => {
    layoutBubbles();
    const ro = new ResizeObserver(() => layoutBubbles());
    if (svgRef.current) ro.observe(svgRef.current);
    window.addEventListener("resize", layoutBubbles);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layoutBubbles);
    };
  }, [layoutBubbles, step]);

  const goTo = (next: number) => {
    setError("");
    setStep(Math.min(steps - 1, Math.max(0, next)));
  };

  const continueFromName = () => {
    if (!name.trim()) {
      setError("Please add your name.");
      return;
    }
    goTo(2);
  };

  const continueFromEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please add a valid email.");
      return;
    }
    goTo(3);
  };

  const enquiryBody = () => {
    const trimmedName = name.trim() || "there";
    return `Name: ${trimmedName}\nEmail: ${email.trim()}\nService: ${project || "Not specified"}\nMessage: ${message.trim() || "Not specified"}`;
  };

  const emailHref = () => {
    const trimmedName = name.trim() || "there";
    return `mailto:hello@berrysols.com?subject=${encodeURIComponent(`Project enquiry from ${trimmedName}`)}&body=${encodeURIComponent(enquiryBody())}`;
  };

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiryBody())}`;

  const review = () => {
    goTo(5);
  };

  return (
    <section className="cta" id="contact">
      <div className="contact-flow" ref={flowRef}>
        <div className="flow-progress" aria-hidden="true">
          {[1, 2, 3, 4].map((index) => (
            <span key={index} className={index < step ? "done" : index === step ? "current" : ""} />
          ))}
        </div>

        <div className="flow-stage">
          <div className={`flow-step ${step === 0 ? "active" : ""}`}>
            <span className="eyebrow"><span /> Let&apos;s talk</span>
            <h2>Have a project in mind?</h2>
            <p>Tell us what you&apos;re building. We&apos;ll reply with next steps, not a sales script.</p>
            <button type="button" className="button light" onClick={() => goTo(1)}>Start your project <Arrow /></button>
          </div>

          <div className={`flow-step ${step === 1 ? "active" : ""}`}>
            <h2>What&apos;s your name?</h2>
            <input
              type="text"
              className="flow-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") continueFromName(); }}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            {error && step === 1 ? <p className="flow-error">{error}</p> : null}
            <button type="button" className="button light" onClick={continueFromName}>Continue <Arrow /></button>
          </div>

          <div className={`flow-step ${step === 2 ? "active" : ""}`}>
            <h2>What&apos;s your email?</h2>
            <input
              type="email"
              className="flow-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") continueFromEmail(); }}
              placeholder="jane@company.com"
              autoComplete="email"
            />
            {error && step === 2 ? <p className="flow-error">{error}</p> : null}
            <button type="button" className="button light" onClick={continueFromEmail}>Continue <Arrow /></button>
          </div>

          <div className={`flow-step ${step === 3 ? "active" : ""}`}>
            <h2>What describes your project?</h2>
            <div className="flow-choices">
              {projectTypes.map((type) => (
                <button
                  type="button"
                  className={`flow-choice ${project === type ? "selected" : ""}`}
                  key={type}
                  onClick={() => {
                    setProject(type);
                    setTimeout(() => goTo(4), 220);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={`flow-step ${step === 4 ? "active" : ""}`}>
            <h2>{project === "Other" ? "Which service do you need?" : "Tell us a bit more"}</h2>
            <textarea
              className="flow-input flow-textarea"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={project === "Other" ? "Write the service you need..." : "A few lines about your idea, timeline or budget..."}
            />
            <button type="button" className="button light" onClick={review}>Review enquiry <Arrow /></button>
          </div>

          <div className={`flow-step ${step === 5 ? "active" : ""}`}>
            <h2>Here&apos;s what we&apos;ll receive</h2>
            <pre className="flow-summary">{enquiryBody()}</pre>
            <p>Choose where you&apos;d like to send your enquiry.</p>
            <div className="flow-actions">
              <a className="button light" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp us</a>
              <a className="button ghost flow-mail" href={emailHref()}>Email us</a>
            </div>
          </div>
        </div>

        <svg className="flow-path" viewBox="0 0 1000 170" preserveAspectRatio="none" ref={svgRef} aria-hidden="true">
          <path ref={pathRef} d="M0,95 C 160,20 340,165 500,95 C 660,20 840,165 1000,95" />
        </svg>
        <div className="flow-bubbles" aria-hidden="true">
          {icons.map((icon, index) => (
            <span
              className={`flow-bubble ${index === step ? "is-current" : ""}`}
              key={icon}
              style={{ left: points[index]?.x ?? 0, top: points[index]?.y ?? 0 }}
            >
              <Icon name={icon} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}