"use client";

import {
  BarChart3,
  BrainCircuit,
  ChartNoAxesCombined,
  Cog,
  HeartHandshake,
  Route,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {homeConcepts} from "@/data/homeContent";

const conceptIcons = {Route, HeartHandshake, BarChart3, Cog, BrainCircuit, ChartNoAxesCombined};

export default function BerryConcept() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`berry-concept ${isVisible ? "is-visible" : ""}`} aria-labelledby="berry-concept-title">
      <div className="berry-concept-inner">
        <div className="berry-concept-heading">
          <p className="berry-concept-kicker">BERRY Solutions</p>
          <h2 id="berry-concept-title">Technology that connects the dots.</h2>
        </div>

        <div className="berry-ecosystem" aria-label="Berry digital ecosystem">
          <svg className="berry-connectors" viewBox="0 0 1000 720" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path id="connector-strategy" className="connector connector-strategy" pathLength="1" d="M448 305 H410 Q390 305 390 285 V112 Q390 92 370 92 H260" />
            <path id="connector-people" className="connector connector-people" pathLength="1" d="M552 305 H590 Q610 305 610 285 V112 Q610 92 630 92 H740" />
            <path id="connector-data" className="connector connector-data" pathLength="1" d="M448 360 H260" />
            <path id="connector-systems" className="connector connector-systems" pathLength="1" d="M552 360 H740" />
            <path id="connector-intelligence" className="connector connector-intelligence" pathLength="1" d="M448 415 H410 Q390 415 390 435 V608 Q390 628 370 628 H260" />
            <path id="connector-growth" className="connector connector-growth" pathLength="1" d="M552 415 H590 Q610 415 610 435 V608 Q610 628 630 628 H740" />
            <path className="connector-flow" pathLength="1" d="M448 305 H410 Q390 305 390 285 V112 Q390 92 370 92 H260" />
            <path className="connector-flow" pathLength="1" d="M552 305 H590 Q610 305 610 285 V112 Q610 92 630 92 H740" />
            <path className="connector-flow" pathLength="1" d="M448 360 H260" />
            <path className="connector-flow" pathLength="1" d="M552 360 H740" />
            <path className="connector-flow" pathLength="1" d="M448 415 H410 Q390 415 390 435 V608 Q390 628 370 628 H260" />
            <path className="connector-flow" pathLength="1" d="M552 415 H590 Q610 415 610 435 V608 Q610 628 630 628 H740" />
          </svg>

          <div className="berry-center" aria-label="Berry. Technology that connects the dots.">
            <span>BERRY</span>
          </div>

          {homeConcepts.map((concept) => {
            const Icon = conceptIcons[concept.icon as keyof typeof conceptIcons];
            return (
              <article className={`berry-ecosystem-card berry-${concept.position}`} key={concept.title}>
                <div className="berry-card-icon"><Icon size={20} strokeWidth={1.8} /></div>
                <div>
                  <h3>{concept.title}</h3>
                  <p>{concept.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
