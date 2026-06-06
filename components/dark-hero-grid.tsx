"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TILE_COLUMNS = 12;
const TILE_ROWS = 8;

type GlassPanel = {
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
  variant?: "large" | "rail" | "strip" | "quiet" | "center";
};

const GLASS_PANELS: GlassPanel[] = [
  { column: 1, row: 1, columnSpan: 3, rowSpan: 1, variant: "quiet" },
  { column: 4, row: 1, columnSpan: 6, rowSpan: 1, variant: "strip" },
  { column: 10, row: 1, columnSpan: 3, rowSpan: 1, variant: "quiet" },
  { column: 1, row: 2, columnSpan: 2, rowSpan: 5, variant: "rail" },
  { column: 3, row: 2, columnSpan: 3, rowSpan: 2 },
  { column: 6, row: 2, columnSpan: 2, rowSpan: 2, variant: "quiet" },
  { column: 8, row: 2, columnSpan: 3, rowSpan: 2 },
  { column: 11, row: 2, columnSpan: 2, rowSpan: 5, variant: "rail" },
  { column: 3, row: 4, columnSpan: 8, rowSpan: 3, variant: "center" },
  { column: 1, row: 7, columnSpan: 3, rowSpan: 2, variant: "quiet" },
  { column: 4, row: 7, columnSpan: 6, rowSpan: 2, variant: "strip" },
  { column: 10, row: 7, columnSpan: 3, rowSpan: 2, variant: "quiet" },
];

function PanelRect({
  panel,
  width,
  height,
}: {
  panel: GlassPanel;
  width: number;
  height: number;
}) {
  const gap = 5;
  const cellWidth = width / TILE_COLUMNS;
  const cellHeight = height / TILE_ROWS;
  const x = (panel.column - 1) * cellWidth + gap;
  const y = (panel.row - 1) * cellHeight + gap;
  const panelWidth = panel.columnSpan * cellWidth - gap * 2;
  const panelHeight = panel.rowSpan * cellHeight - gap * 2;
  const fillOpacity =
    panel.variant === "center"
      ? 0.18
      : panel.variant === "rail"
        ? 0.14
        : panel.variant === "strip"
          ? 0.12
          : 0.1;
  const strokeOpacity = panel.variant === "center" ? 0.22 : 0.18;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={panelWidth}
        height={panelHeight}
        rx={10}
        fill="rgba(9, 9, 11, 0.5)"
        stroke={`rgba(82, 82, 91, ${strokeOpacity})`}
        strokeWidth={1}
      />
      <rect
        x={x + 1}
        y={y + 1}
        width={panelWidth - 2}
        height={panelHeight - 2}
        rx={9}
        fill={`rgba(39, 39, 42, ${fillOpacity})`}
      />
    </g>
  );
}

export function DarkHeroGrid() {
  const reduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");
  const glowId = `dark-hero-grid-glow-${gradientId}`;
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

  const gridGlowX = size.width * 0.5;
  const gridGlowY = size.height * 0.42;
  const gridGlowR = Math.hypot(size.width / 2, size.height / 2) * 0.82;

  const sideFadeMask =
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-dhakaa-950"
      aria-hidden
    >
      {size.width > 0 && size.height > 0 && (
        <motion.svg
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }
          }
          style={{
            WebkitMaskImage: sideFadeMask,
            maskImage: sideFadeMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          className="light-hero-cyber-grid absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <radialGradient
              id={glowId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              <stop offset="0%" stopColor="rgba(63, 63, 70, 0.16)" />
              <stop offset="55%" stopColor="rgba(39, 39, 42, 0.1)" />
              <stop offset="100%" stopColor="rgba(9, 9, 11, 0)" />
            </radialGradient>
          </defs>

          <rect width={size.width} height={size.height} fill={`url(#${glowId})`} />

          <g opacity={0.95}>
            {GLASS_PANELS.map((panel, index) => (
              <PanelRect
                key={index}
                panel={panel}
                width={size.width}
                height={size.height}
              />
            ))}
          </g>
        </motion.svg>
      )}

      <div className="dark-hero-grid-vignette absolute inset-0" aria-hidden />
    </div>
  );
}
