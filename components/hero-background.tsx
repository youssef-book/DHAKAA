"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getHeroGrid } from "@/lib/hero-grid";

/** When hero copy stagger should begin (seconds). */
export const HERO_REVEAL_CONTENT_DELAY_S = 0.55;

function DashedGridLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#hero-grid-stroke)"
      strokeWidth={1}
      strokeDasharray="6 10"
      strokeLinecap="butt"
    />
  );
}

export function HeroBackground() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      setSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const grid = useMemo(() => {
    if (size.width <= 0 || size.height <= 0) {
      return null;
    }
    return getHeroGrid(size.width, size.height);
  }, [size.width, size.height]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#070d18]"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-center"
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="hero-blueprint-ambient absolute inset-0" />
        <div className="hero-light-source hero-light-primary" aria-hidden />
        <div className="hero-light-source hero-light-secondary" aria-hidden />
      </motion.div>
      {grid && (
        <motion.svg
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ transformOrigin: "center" }}
          className="hero-cyber-grid absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <radialGradient
              id="hero-grid-stroke"
              gradientUnits="userSpaceOnUse"
              cx={size.width / 2}
              cy={size.height * 0.45}
              r={Math.hypot(size.width / 2, size.height / 2) * 0.82}
            >
              <stop offset="0%" stopColor="rgba(140, 190, 245, 0.3)" />
              <stop offset="28%" stopColor="rgba(75, 115, 175, 0.54)" />
              <stop offset="52%" stopColor="rgba(45, 72, 125, 0.68)" />
              <stop offset="75%" stopColor="rgba(25, 42, 78, 0.78)" />
              <stop offset="100%" stopColor="rgba(10, 18, 38, 0.88)" />
            </radialGradient>
            <radialGradient id="hero-center-glow" cx="50%" cy="45%" r="58%">
              <stop offset="0%" stopColor="rgba(38, 72, 130, 0.32)" />
              <stop offset="45%" stopColor="rgba(28, 52, 95, 0.18)" />
              <stop offset="100%" stopColor="rgba(7, 13, 24, 0)" />
            </radialGradient>
          </defs>

          <rect width={size.width} height={size.height} fill="url(#hero-center-glow)" />

          <g>
            {grid.horizontalLines.map((y) => (
              <DashedGridLine
                key={`h-${y}`}
                x1={0}
                y1={y}
                x2={size.width}
                y2={y}
              />
            ))}

            {grid.verticalLines.map((x) => (
              <DashedGridLine
                key={`v-${x}`}
                x1={x}
                y1={0}
                x2={x}
                y2={size.height}
              />
            ))}
          </g>
        </motion.svg>
      )}

      <motion.div
        className="hero-grid-scanline"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      />
      <div className="hero-grid-vignette" />
    </div>
  );
}
