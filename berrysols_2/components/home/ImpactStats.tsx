"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ImpactStats.module.css";
import {homeStats as stats} from "@/data/homeContent";

function CountUpValue({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = valueRef.current;
    if (!element || hasStarted.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted.current) return;
      hasStarted.current = true;
      observer.disconnect();

      const startedAt = performance.now();
      const duration = 1400;

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * easedProgress));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, { threshold: 0.6 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={valueRef}>{value}{suffix}</span>;
}

export default function ImpactStats() {
  return (
    <section className={styles.section} aria-label="Berry Solutions by the numbers">
      <div className={styles.inner}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <p className={styles.value}>
              <CountUpValue target={stat.target} suffix={stat.suffix} />
            </p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}