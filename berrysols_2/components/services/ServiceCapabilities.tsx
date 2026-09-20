"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

const folderCounts = ["3 items", "17 items", "5 items", "8 items", "11 items"];

export default function ServiceCapabilities({ service }: { service: Service }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollCards = (direction: number) => {
    const container = trackRef.current;
    if (!container) return;

    const firstCard = container.querySelector(`.${styles.capFolder}`) as HTMLElement | null;
    if (!firstCard) return;

    const gap = 22;
    const step = firstCard.getBoundingClientRect().width + gap;
    container.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className={`${styles.section} ${styles.capabilitiesSection}`}>
      <div className={styles.capContent}>
        <div className={styles.capHeader}>
          <div className={styles.sectionHead}>
            <span className="eyebrow">What We Do</span>
            <h2>Everything you need, in one place.</h2>
          </div>

          <div className={styles.capNav} aria-label="Capability navigation">
            <button className={styles.capNavButton} type="button" onClick={() => scrollCards(-1)} aria-label="Previous capabilities">
              <ChevronLeft size={18} />
            </button>
            <button className={styles.capNavButton} type="button" onClick={() => scrollCards(1)} aria-label="Next capabilities">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.capCarousel}>
          <div ref={trackRef} className={styles.capTrack}>
            {service.capabilities.map((cap, i) => (
              <article key={cap.title} className={`${styles.capFolder} ${styles[`capFolderTone${i % 3}`]}`}>
                <div className={styles.capFolderTab} />
                <div className={styles.capFolderBody}>
                  <div className={styles.capFolderTop}>
                    <span className={styles.capFolderDot} />
                  </div>
                  <h3>{cap.title}</h3>
                </div>
                <div className={styles.capMeta}>
                  <div className={styles.capAvatarStack}>
                    <span className={styles.capAvatar} />
                    <span className={styles.capAvatar} />
                    <span className={styles.capAvatar} />
                  </div>
                  <span className={styles.capCount}>{folderCounts[i % folderCounts.length]}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
