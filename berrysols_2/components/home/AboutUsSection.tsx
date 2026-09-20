"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "@/styles/AboutUsSection.module.css";
import {homeWhyItems as items} from "@/data/homeContent";

const SPACING = 30; // degrees between each item on the arc
const CENTER_INDEX = 2; // item whose baseAngle is 0

type NodeStyle = CSSProperties & { "--angle": string };

export default function AboutUsSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lockRef = useRef(false);
  const previousSectionScrolls = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const isPinned = () => {
    const section = sectionRef.current;
    if (!section) return false;

    const bounds = section.getBoundingClientRect();
    return bounds.top <= 1 && bounds.bottom >= window.innerHeight - 1;
  };

  const isVisibleOnMobile = () => {
    const section = sectionRef.current;
    if (!section) return false;

    const bounds = section.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  };

  const select = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  const step = (dir: 1 | -1) => {
    if (lockRef.current) return false;

    const next = activeRef.current + dir;
    if (next < 0 || next > items.length - 1) return false;

    lockRef.current = true;
    select(next);
    setTimeout(() => {
      lockRef.current = false;
    }, 550);
    return true;
  };

  const moveToNextSection = () => {
    const section = sectionRef.current;
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop + section.offsetHeight,
      behavior: "smooth",
    });
  };

  const moveToPreviousSection = () => {
    const section = sectionRef.current;
    if (!section) return;

    window.scrollTo({
      top: Math.max(0, section.offsetTop - window.innerHeight),
      behavior: "smooth",
    });
  };

  // Capture wheel input while this section is pinned so every part of the
  // viewport follows the same numbered sequence.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      if (!isPinned()) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const canStep = direction === 1
        ? activeRef.current < items.length - 1
        : activeRef.current > 0;

      if (canStep) {
        previousSectionScrolls.current = 0;
        e.preventDefault();
      } else if (direction === 1 && activeRef.current === items.length - 1) {
        if (window.matchMedia("(max-width: 640px)").matches) return;
        e.preventDefault();
        moveToNextSection();
        previousSectionScrolls.current = 0;
      } else if (direction === -1 && activeRef.current === 0) {
        e.preventDefault();
        previousSectionScrolls.current += 1;

        if (previousSectionScrolls.current >= 2) {
          previousSectionScrolls.current = 0;
          moveToPreviousSection();
        }
      } else {
        previousSectionScrolls.current = 0;
      }
      step(direction);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const canHandleTouch = isMobile ? isVisibleOnMobile() : isPinned();
      if (Math.abs(delta) > 40 && canHandleTouch) step(delta > 0 ? 1 : -1);
      touchStartY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const groupRotation = -((active - CENTER_INDEX) * SPACING);
  const current = items[active];

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="why-us-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Why Berry solutions</p>
        <h2 id="why-us-heading" className={styles.heading}>
         Technology With
          <span> Purpose.</span>
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.description}>
          We bring clarity to complex challenges through technology built around <i> your </i>business.
        </p>
        <Link href="/about" className={styles.knowMore}>
          Know more <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.stage}>
        <span className={styles.orbit} aria-hidden="true" />

        <div
          className={styles.wheel}
          style={{ transform: `rotate(${groupRotation}deg)` }}
        >
          {items.map((item, i) => {
            const baseAngle = (i - CENTER_INDEX) * SPACING;
            const isActive = i === active;
            const nodeStyle: NodeStyle = { "--angle": `${baseAngle}deg` };
            return (
              <div className={styles.node} style={nodeStyle} key={item.number}>
                <button
                  type="button"
                  className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                  onClick={() => select(i)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive}
                />
                {!isActive && (
                  <button
                    type="button"
                    className={styles.numberLabel}
                    onClick={() => select(i)}
                  >
                    {item.number}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.panel}>
          <span className={styles.panelNumber}>{current.number}</span>
          <div className={styles.panelText}>
            <h3 className={styles.panelTitle}>{current.title}</h3>
            <p className={styles.panelBody}>{current.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}