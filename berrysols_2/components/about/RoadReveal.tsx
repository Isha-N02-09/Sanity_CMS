"use client";

import { useEffect, useId, useRef, useState } from "react";
import "@/styles/RoadReveal.css";

type RoadRevealProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x},${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index === 0 ? 0 : index - 1];
    const current = points[index];
    const next = points[index + 1];
    const following = points[index + 2] ?? next;
    const controlOne = {
      x: current.x + (next.x - previous.x) / 6,
      y: current.y + (next.y - previous.y) / 6,
    };
    const controlTwo = {
      x: next.x - (following.x - current.x) / 6,
      y: next.y - (following.y - current.y) / 6,
    };
    path += ` C ${controlOne.x},${controlOne.y} ${controlTwo.x},${controlTwo.y} ${next.x},${next.y}`;
  }
  return path;
}

function buildRoadPath(width: number, height: number) {
  if (!width || !height) return "";
  const bends = Math.max(5, Math.round(height / 240));
  const points = [{ x: width * 0.22, y: 0 }];
  for (let index = 1; index <= bends; index += 1) {
    points.push({
      x: index % 2 === 1 ? width * 0.78 : width * 0.22,
      y: (height * index) / (bends + 1),
    });
  }
  points.push({ x: width * 0.78, y: height });
  return smoothPath(points);
}

export default function RoadReveal({ children, className = "", contentClassName = "" }: RoadRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskId = useId();
  const gradientId = useId();
  const maskRectRef = useRef<SVGRectElement>(null);
  const boxRef = useRef({ width: 0, height: 0 });
  const [box, setBox] = useState({ width: 0, height: 0 });
  const targetRevealRef = useRef(0);
  const displayRevealRef = useRef(0);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const content = container.querySelector<HTMLElement>(".roadReveal__content");
    if (!content) return;

    let scrollFrame = 0;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextBox = { width: entry.contentRect.width, height: entry.contentRect.height };
      boxRef.current = nextBox;
      setBox(nextBox);
    });
    resizeObserver.observe(content);

    const updateTarget = () => {
      scrollFrame = 0;
      if (motionQuery.matches) {
        targetRevealRef.current = 1;
        return;
      }
      const rect = content.getBoundingClientRect();
      targetRevealRef.current = Math.min(Math.max((window.innerHeight * 0.5 - rect.top) / rect.height, 0), 1);
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateTarget);
    };
    const tick = () => {
      const target = motionQuery.matches ? 1 : targetRevealRef.current;
      const next = displayRevealRef.current + (target - displayRevealRef.current) * 0.12;
      displayRevealRef.current = Math.abs(target - next) < 0.001 ? target : next;
      maskRectRef.current?.setAttribute("height", String(displayRevealRef.current * boxRef.current.height));
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    updateTarget();
    animationFrameRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motionQuery.addEventListener("change", updateTarget);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motionQuery.removeEventListener("change", updateTarget);
      resizeObserver.disconnect();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const path = buildRoadPath(box.width, box.height);
  const roadWidth = Math.max(14, box.width * 0.035);
  const dashWidth = Math.max(1.5, roadWidth * 0.05);

  return (
    <div ref={containerRef} className={`roadReveal ${className}`}>
      {box.width > 0 && box.height > 0 ? (
        <svg className="roadReveal__svg" viewBox={`0 0 ${box.width} ${box.height}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="white" />
              <stop offset="95%" stopColor="white" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={box.width} height={box.height}>
              <rect ref={maskRectRef} width={box.width} height="0" fill={`url(#${gradientId})`} />
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            <path className="roadReveal__base" d={path} style={{ strokeWidth: roadWidth }} />
            <path className="roadReveal__dash" d={path} style={{ strokeWidth: dashWidth, strokeDasharray: `${dashWidth * 2.2} ${Math.max(10, roadWidth * 0.16)}` }} />
          </g>
        </svg>
      ) : null}
      <div className={`roadReveal__content ${contentClassName}`}>{children}</div>
    </div>
  );
}
