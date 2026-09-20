"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Megaphone,
  Monitor,
  Search,
} from "lucide-react";
import { CSSProperties, useEffect, useState } from "react";
import {services} from "@/data/services";
import styles from "@/styles/Servicesshowcase.module.css";

const CARD_STYLES = [
  { tone: "orange", icon: "code" },
  { tone: "coral", icon: "analytics" },
  { tone: "amber", icon: "cloud" },
  { tone: "orangeLight", icon: "digital" },
  { tone: "coral", icon: "marketing" },
  { tone: "amber", icon: "seo" },
  { tone: "orange", icon: "analytics" },
  { tone: "coral", icon: "code" },
] as const;

const CARD_DESCRIPTIONS: Record<string, string> = {
  "ai-automation": "Streamline repetitive work with practical AI solutions.",
  "web-development": "Fast, responsive websites built around your goals.",
  "desktop-app-development": "Reliable desktop tools designed for everyday workflows.",
  "enterprise-resource-planning-erp": "Connect operations, teams, and data in one clear system.",
  "legacy-software": "Modernize essential systems without losing what works.",
  "startup-support": "Build momentum with the right technology partner.",
  "staff-augmentation": "Extend your team with skilled technical support.",
  "digital-marketing": "Reach the right audience with measurable campaigns.",
};

const SERVICES = services.map((service, index) => ({
  slug: service.slug,
  title: service.eyebrow,
  description: CARD_DESCRIPTIONS[service.slug] ?? service.description,
  ...CARD_STYLES[index],
}));

export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth <= 560 ? 1 : window.innerWidth <= 899 ? 2 : 4);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const changeService = (direction: number) => {
    const lastStart = SERVICES.length - visibleCards;
    setActiveIndex((current) => {
      const nextIndex = current + direction;
      return nextIndex > lastStart ? 0 : nextIndex < 0 ? lastStart : nextIndex;
    });
  };

  return (
    <section id="portfolio" className={styles.root}>
      <div className={styles.header}>
        <h2>Our services</h2>
      </div>

      <div className={styles.carousel}>
        <button className={styles.navButton} onClick={() => changeService(-1)} aria-label="Previous service">
          <ChevronLeft size={22} />
        </button>

        <div className={styles.cardsViewport}>
          <div
            className={styles.cardsGrid}
            style={{ "--active-index": activeIndex } as CSSProperties}
          >
            {SERVICES.map((service, index) => (
              <article
                className={`${styles.card} ${styles[service.tone]} ${index === activeIndex ? styles.activeCard : ""}`}
                key={service.title}
              >
                <div className={styles.cardCenterIcon} aria-hidden="true">
                  <ServiceIcon name={service.icon} />
                </div>
                <div className={styles.cardCopy}>
                  <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={`/services/${service.slug}`} className={`${styles.learnMore} btn ghost`}>
                    Learn more <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button className={styles.navButton} onClick={() => changeService(1)} aria-label="Next service">
          <ChevronRight size={22} />
        </button>
      </div>

      <Link href="/services" className={`${styles.viewAllServices} btn ghost`}>
        View all services <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
      </Link>
    </section>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const icons = {
    code: Code2,
    analytics: BarChart3,
    cloud: Cloud,
    digital: Monitor,
    marketing: Megaphone,
    seo: Search,
  };
  const Icon = icons[name as keyof typeof icons];

  return <Icon size={22} strokeWidth={1.8} />;
}
