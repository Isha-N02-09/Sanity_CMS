"use client";

import styles from "@/styles/NodeFlow.module.css";

type NodeFlowProps = {
  steps: string[];
};

// Lays out `steps` as a zig-zag chain of connected nodes — the visual
// expression of "technology that connects the dots." Line count and
// node positions are derived from the data, so every service gets a
// visual that's structurally its own, not a copy with different labels.
export default function NodeFlow({ steps }: NodeFlowProps) {
  const width = 460;
  const height = 360;
  const n = steps.length;

  const points = steps.map((_, i) => {
    const x = 70 + (i % 2 === 0 ? 0 : 160) + (i / (n - 1 || 1)) * 90;
    const y = 40 + i * ((height - 80) / Math.max(n - 1, 1));
    return { x, y };
  });

  return (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Process flow: ${steps.join(" → ")}`}
    >
      {points.slice(1).map((p, i) => {
        const prev = points[i];
        return (
          <line
            key={`line-${i}`}
            x1={prev.x}
            y1={prev.y}
            x2={p.x}
            y2={p.y}
            className={styles.link}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        );
      })}

      {points.map((p, i) => (
        <g key={`node-${i}`} style={{ animationDelay: `${i * 0.25}s` }} className={styles.nodeGroup}>
          <circle cx={p.x} cy={p.y} r={i === 0 || i === n - 1 ? 7 : 5} className={styles.node} />
          <circle cx={p.x} cy={p.y} r={16} className={styles.pulse} />
          <text
            x={p.x + (i % 2 === 0 ? 16 : -16)}
            y={p.y + 4}
            textAnchor={i % 2 === 0 ? "start" : "end"}
            className={styles.label}
          >
            {steps[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
