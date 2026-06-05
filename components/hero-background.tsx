"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getHeroGrid } from "@/lib/hero-grid";

/** When hero copy stagger should begin (seconds). */
export const HERO_REVEAL_CONTENT_DELAY_S = 0.55;

function DashedGridLine({
  x1,
  y1,
  x2,
  y2,
  strokeId,
  dashArray = "6 10",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeId: string;
  dashArray?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={`url(#${strokeId})`}
      strokeWidth={1}
      strokeDasharray={dashArray}
      strokeLinecap="butt"
    />
  );
}

type HeroBackgroundProps = {
  animate?: boolean;
  fadeLeft?: boolean;
  fadeColor?: string;
  showGrid?: boolean;
  fadeGridSides?: boolean;
  glowAnchor?: "center" | "left";
};

export function HeroBackground({
  animate = true,
  fadeLeft = false,
  fadeColor = "#fafafa",
  showGrid = true,
  fadeGridSides = false,
  glowAnchor = "center",
}: HeroBackgroundProps = {}) {
  const gradientId = useId().replace(/:/g, "");
  const strokeId = `hero-grid-stroke-${gradientId}`;
  const glowId = `hero-center-glow-${gradientId}`;
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

  const gridDashArray = fadeGridSides ? "3 7" : "6 10";
  const glowLeft = glowAnchor === "left";
  const gridGlowX = glowLeft ? size.width * 0.22 : size.width / 2;
  const gridGlowY = size.height * 0.45;
  const gridGlowR = Math.hypot(size.width / 2, size.height / 2) * (glowLeft ? 0.92 : 0.82);

  const sideFadeMask = glowLeft
    ? "linear-gradient(to right, black 0%, black 82%, rgba(0,0,0,0.55) 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"
    : "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";

  const scanlineMask = glowLeft
    ? "linear-gradient(to right, black 0%, black 84%, rgba(0,0,0,0.5) 94%, transparent 100%)"
    : "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

  const grid = useMemo(() => {
    if (size.width <= 0 || size.height <= 0) {
      return null;
    }
    return getHeroGrid(
      size.width,
      size.height,
      fadeGridSides ? { columnCount: 16, rowCount: 11 } : {},
    );
  }, [size.width, size.height, fadeGridSides]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#070d18]"
      aria-hidden
    >
      <motion.div
        className={`absolute inset-0 ${glowLeft ? "origin-left" : "origin-center"} ${glowLeft ? "hero-bg-glow-left" : ""}`}
        initial={animate ? { opacity: 0, scale: 1.18 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          animate
            ? { duration: 2, ease: [0.16, 1, 0.3, 1] as const }
            : { duration: 0 }
        }
      >
        <div className="hero-blueprint-ambient absolute inset-0" />
        <div className="hero-light-source hero-light-primary" aria-hidden />
        <div className="hero-light-source hero-light-secondary" aria-hidden />
      </motion.div>
      {grid && (
        <motion.svg
          initial={animate ? { opacity: 0, scale: 1.06 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            animate
              ? { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }
              : { duration: 0 }
          }
          style={{
            transformOrigin: glowLeft ? "left center" : "center",
            ...(fadeGridSides
              ? {
                  WebkitMaskImage: sideFadeMask,
                  maskImage: sideFadeMask,
                  WebkitMaskComposite: "source-in",
                  maskComposite: "intersect",
                }
              : {}),
          }}
          className="hero-cyber-grid absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <radialGradient
              id={strokeId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              {fadeGridSides ? (
                <>
                  <stop offset="0%" stopColor="rgba(150, 195, 245, 0.28)" />
                  <stop offset="32%" stopColor="rgba(95, 140, 200, 0.2)" />
                  <stop offset="58%" stopColor="rgba(55, 90, 150, 0.12)" />
                  <stop offset="82%" stopColor="rgba(30, 55, 100, 0.05)" />
                  <stop offset="100%" stopColor="rgba(10, 18, 38, 0)" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="rgba(140, 190, 245, 0.3)" />
                  <stop offset="28%" stopColor="rgba(75, 115, 175, 0.54)" />
                  <stop offset="52%" stopColor="rgba(45, 72, 125, 0.68)" />
                  <stop offset="75%" stopColor="rgba(25, 42, 78, 0.78)" />
                  <stop offset="100%" stopColor="rgba(10, 18, 38, 0.88)" />
                </>
              )}
            </radialGradient>
            <radialGradient
              id={glowId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              <stop offset="0%" stopColor="rgba(38, 72, 130, 0.32)" />
              <stop offset="45%" stopColor="rgba(28, 52, 95, 0.18)" />
              <stop offset="100%" stopColor="rgba(7, 13, 24, 0)" />
            </radialGradient>
          </defs>

          <rect width={size.width} height={size.height} fill={`url(#${glowId})`} />

          {showGrid && (
            <g opacity={fadeGridSides ? 0.72 : 1}>
              {grid.horizontalLines.map((y) => (
                <DashedGridLine
                  key={`h-${y}`}
                  strokeId={strokeId}
                  dashArray={gridDashArray}
                  x1={0}
                  y1={y}
                  x2={size.width}
                  y2={y}
                />
              ))}

              {grid.verticalLines.map((x) => (
                <DashedGridLine
                  key={`v-${x}`}
                  strokeId={strokeId}
                  dashArray={gridDashArray}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={size.height}
                />
              ))}
            </g>
          )}
        </motion.svg>
      )}

      {showGrid && (
        <motion.div
          className="hero-grid-scanline"
          style={
            fadeGridSides
              ? {
                  WebkitMaskImage: scanlineMask,
                  maskImage: scanlineMask,
                }
              : undefined
          }
          aria-hidden
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: fadeGridSides ? 0.14 : 0.55 }}
          transition={
            animate
              ? { duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }
              : { duration: 0 }
          }
        />
      )}
      {fadeLeft ? (
        <div
          className="absolute inset-y-0 -left-32 right-0 z-20"
          style={{
            background: `linear-gradient(to right, ${fadeColor} 0%, ${fadeColor} 14%, rgba(250, 250, 250, 0.72) 28%, transparent 52%)`,
          }}
          aria-hidden
        />
      ) : showGrid && !fadeGridSides ? (
        <div className="hero-grid-vignette" />
      ) : null}
    </div>
  );
}
