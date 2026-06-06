"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getHeroGrid } from "@/lib/hero-grid";

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

function LightGridLine({
  x1,
  y1,
  x2,
  y2,
  strokeId,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeId: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={`url(#${strokeId})`}
      strokeWidth={1}
      strokeDasharray="4 9"
      strokeLinecap="butt"
    />
  );
}

function PlusMark({
  x,
  y,
  strokeId,
  arm = 4,
}: {
  x: number;
  y: number;
  strokeId: string;
  arm?: number;
}) {
  return (
    <g stroke={`url(#${strokeId})`} strokeWidth={1} strokeLinecap="round">
      <line x1={x - arm} y1={y} x2={x + arm} y2={y} />
      <line x1={x} y1={y - arm} x2={x} y2={y + arm} />
    </g>
  );
}

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
      ? 0.08
      : panel.variant === "rail"
        ? 0.07
        : panel.variant === "strip"
          ? 0.06
          : 0.045;
  const strokeOpacity = panel.variant === "center" ? 0.12 : 0.1;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={panelWidth}
        height={panelHeight}
        rx={10}
        fill="rgba(255, 255, 255, 0.84)"
        stroke={`rgba(82, 82, 91, ${strokeOpacity})`}
        strokeWidth={1}
      />
      <rect
        x={x + 1}
        y={y + 1}
        width={panelWidth - 2}
        height={panelHeight - 2}
        rx={9}
        fill={`rgba(82, 82, 91, ${fillOpacity})`}
      />
    </g>
  );
}

export function LightHeroGrid() {
  const reduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");
  const strokeId = `light-hero-grid-stroke-${gradientId}`;
  const nodeId = `light-hero-grid-node-${gradientId}`;
  const glowId = `light-hero-grid-glow-${gradientId}`;
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
    return getHeroGrid(size.width, size.height, {
      columnCount: 16,
      rowCount: 11,
    });
  }, [size.width, size.height]);

  const nodes = useMemo(() => {
    if (!grid) return [];
    const points: { x: number; y: number }[] = [];
    grid.verticalLines.forEach((x) => {
      grid.horizontalLines.forEach((y) => {
        points.push({ x, y });
      });
    });
    return points;
  }, [grid]);

  const gridGlowX = size.width * 0.5;
  const gridGlowY = size.height * 0.42;
  const gridGlowR = Math.hypot(size.width / 2, size.height / 2) * 0.82;

  const sideFadeMask =
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-white"
      aria-hidden
    >
      {grid && (
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
              id={strokeId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              <stop offset="0%" stopColor="rgba(113, 113, 122, 0.18)" />
              <stop offset="35%" stopColor="rgba(161, 161, 170, 0.12)" />
              <stop offset="62%" stopColor="rgba(161, 161, 170, 0.07)" />
              <stop offset="100%" stopColor="rgba(161, 161, 170, 0)" />
            </radialGradient>
            <radialGradient
              id={nodeId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              <stop offset="0%" stopColor="rgba(113, 113, 122, 0.28)" />
              <stop offset="45%" stopColor="rgba(161, 161, 170, 0.16)" />
              <stop offset="100%" stopColor="rgba(161, 161, 170, 0)" />
            </radialGradient>
            <radialGradient
              id={glowId}
              gradientUnits="userSpaceOnUse"
              cx={gridGlowX}
              cy={gridGlowY}
              r={gridGlowR}
            >
              <stop offset="0%" stopColor="rgba(82, 82, 91, 0.07)" />
              <stop offset="55%" stopColor="rgba(113, 113, 122, 0.04)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
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

          <g opacity={0.72}>
            {grid.horizontalLines.map((y) => (
              <LightGridLine
                key={`h-${y}`}
                strokeId={strokeId}
                x1={0}
                y1={y}
                x2={size.width}
                y2={y}
              />
            ))}

            {grid.verticalLines.map((x) => (
              <LightGridLine
                key={`v-${x}`}
                strokeId={strokeId}
                x1={x}
                y1={0}
                x2={x}
                y2={size.height}
              />
            ))}
          </g>

          <g opacity={0.85}>
            {nodes.map(({ x, y }) => (
              <PlusMark
                key={`n-${x}-${y}`}
                x={x}
                y={y}
                strokeId={nodeId}
              />
            ))}
          </g>
        </motion.svg>
      )}

      <div className="light-hero-grid-vignette absolute inset-0" aria-hidden />
    </div>
  );
}
