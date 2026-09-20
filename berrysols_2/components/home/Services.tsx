"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, HeartPulse, Network, Stethoscope, Timer, Truck } from "lucide-react";
import styles from "@/styles/Services.module.css";
import {homePortfolioFeatures} from "@/data/homeContent";

const featureIcons = {Timer, Truck, Stethoscope, Network, HeartPulse};
const features = homePortfolioFeatures.map((feature) => ({
  ...feature,
  icon: featureIcons[feature.icon as keyof typeof featureIcons],
}));

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [carouselCenter, setCarouselCenter] = useState(-4);

  useEffect(() => {
    const targetCenter = { current: 0 };
    const currentCenter = { current: 0 };
    let lastTime: number | null = null;
    let animationFrame = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = scrollable > 0
        ? Math.max(0, Math.min(1, -rect.top / scrollable))
        : 0;
      targetCenter.current = -4 + progress * (features.length + 7);
    };

    const animate = (now: number) => {
      if (lastTime === null) lastTime = now;
      const delta = now - lastTime;
      lastTime = now;
      const smoothing = 1 - Math.exp(-delta / 150);
      currentCenter.current += (targetCenter.current - currentCenter.current) * smoothing;
      setCarouselCenter(currentCenter.current);
      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className={styles.servicesHero}>
      <div className={styles.stickyStage}>
        <h2 className={styles.portfolioTitle}>
          <span className={styles.portfolioTitleOur}>Our</span>{" "}
          <span className={styles.portfolioTitleWord}>Portfolio</span>
        </h2>
        <Link href="/portfolio" className={`${styles.portfolioCta} btn ghost`}>
          View Portfolio <ArrowUpRight size={16} strokeWidth={2.35} aria-hidden="true" />
        </Link>
        <div className={styles.featureTrack}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const offset = index - carouselCenter;
            const distance = Math.abs(offset);
            const angle = offset * 25;
            const angleRadians = angle * Math.PI / 180;
            const radius = 900;
            const x = radius * Math.sin(angleRadians);
            const y = radius * (1 - Math.cos(angleRadians));
            const scale = Math.max(.62, 1 - distance * .09);
            const opacity = distance > 3.4 ? 0 : Math.max(0, 1 - Math.pow(distance / 3.4, 1.5));
            const isExternalLink = /^https?:\/\//.test(feature.href);
            return (
              <a
                key={feature.title}
                href={feature.href}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noreferrer" : undefined}
                className={styles.featureCard}
                style={{
                  "--x": `${x}px`,
                  "--y": `${y}px`,
                  "--angle": `${angle}deg`,
                  "--scale": scale,
                  "--opacity": opacity,
                  "--z": Math.round(200 - distance * 10),
                } as React.CSSProperties}
              >
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon size={30} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <span className={styles.cardDetails}>
                  <span className={styles.cardEyebrow}>{feature.eyebrow}</span>
                </span>
                <span className={styles.cardSpacer} />
                <span className={styles.cardButton}>CASE STUDY</span>
                <img
                  src={feature.visual}
                  alt=""
                  className={styles.cardVisual}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
