"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { aboutGridBubbleHide, aboutGridBubbleReveal } from "@/lib/about-motion";

export type AboutBentoGlassVariant = "default" | "blue" | "accent" | "muted";

const glassVariantClass: Record<AboutBentoGlassVariant, string> = {
  default: "",
  blue: "about-bento-glass--blue",
  accent: "about-bento-glass--accent",
  muted: "about-bento-glass--muted",
};

export const aboutCellClassName =
  "about-bento-glass relative flex h-full min-h-56 flex-col justify-between text-dhakaa-950";

export const aboutCellClipClassName =
  "min-h-56 overflow-hidden rounded-[var(--radius-md)]";

export function AboutBentoLampLeft() {
  return (
    <div
      className="about-bento-glass__lamp-left pointer-events-none absolute inset-0 z-[4]"
      aria-hidden
    />
  );
}

export function AboutBentoLampTop() {
  return (
    <div
      className="about-bento-glass__lamp pointer-events-none absolute inset-0 z-[4]"
      aria-hidden
    />
  );
}

const easeOut = [0.23, 1, 0.32, 1] as const;

const shellHover = {
  scale: 1.016,
  transition: { duration: 0.32, ease: easeOut },
};

type AboutBentoShellProps = {
  className?: string;
  glassVariant?: AboutBentoGlassVariant;
  backdrop?: ReactNode;
  children: ReactNode;
  exiting?: boolean;
  revealIndex?: number;
  revealCount?: number;
  revealOverlay?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
};

const directionOffsets = {
  top: { y: -150, x: 0 },
  bottom: { y: 150, x: 0 },
  left: { x: -150, y: 0 },
  right: { x: 150, y: 0 },
};

export function AboutBentoShell({
  className,
  glassVariant = "blue",
  backdrop,
  children,
  exiting = false,
  revealIndex = 0,
  revealCount = 1,
  revealOverlay = true,
  direction = "bottom",
}: AboutBentoShellProps) {
  const reduceMotion = useReducedMotion();

  const shouldReveal = revealOverlay && !reduceMotion;
  const offset = directionOffsets[direction];

  return (
    <motion.div
      className={`${aboutCellClipClassName} ${className ?? ""}`}
      initial={shouldReveal ? { opacity: 0, x: offset.x, y: offset.y, scale: 0.95, filter: "blur(4px)" } : false}
      animate={
        shouldReveal
          ? exiting
            ? { opacity: 0, x: offset.x, y: offset.y, scale: 0.95, filter: "blur(4px)" }
            : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      whileHover={reduceMotion || exiting ? undefined : shellHover}
      style={{ transformOrigin: "center center" }}
      transition={
        shouldReveal
          ? exiting
            ? {
                ...aboutGridBubbleHide,
                delay: (revealCount - 1 - revealIndex) * 0.08,
              }
            : aboutGridBubbleReveal
          : undefined
      }
    >
      <div className={`${aboutCellClassName} ${glassVariantClass[glassVariant]}`}>
        <span className="about-bento-glass__noise" aria-hidden />
        <span className="about-bento-glass__lens" aria-hidden />
        <span className="about-bento-glass__tint" aria-hidden />
        <span className="about-bento-glass__edge" aria-hidden />
        {backdrop}

        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

type AboutBentoCardProps = {
  label: string;
  title: string;
  body: string;
  className: string;
  glassVariant?: AboutBentoGlassVariant;
  labelClassName: string;
  bodyClassName: string;
  compact?: boolean;
  exiting?: boolean;
  revealIndex?: number;
  revealCount?: number;
  backdrop?: ReactNode;
  lamp?: "top" | "left-bottom";
  direction?: "top" | "bottom" | "left" | "right";
};

export function AboutBentoCard({
  label,
  title,
  body,
  className,
  glassVariant = "blue",
  labelClassName,
  bodyClassName,
  compact = false,
  exiting = false,
  revealIndex = 0,
  revealCount = 1,
  backdrop,
  lamp,
  direction,
}: AboutBentoCardProps) {
  const lampBackdrop =
    backdrop ??
    (lamp === "left-bottom" ? (
      <AboutBentoLampLeft />
    ) : lamp === "top" ? (
      <AboutBentoLampTop />
    ) : undefined);

  return (
    <AboutBentoShell
      className={className}
      glassVariant={glassVariant}
      exiting={exiting}
      revealIndex={revealIndex}
      revealCount={revealCount}
      backdrop={lampBackdrop}
      direction={direction}
    >
      <p
        className={`text-xs font-medium uppercase tracking-[0.2em] ${labelClassName}`}
      >
        {label}
      </p>
      <div className={compact ? "mt-6" : "mt-12"}>
        <h2
          className={`font-semibold tracking-[-0.03em] ${compact ? "text-xl" : "text-2xl"}`}
        >
          {title}
        </h2>
        <p
          className={`${compact ? "mt-2" : "mt-4"} text-sm leading-relaxed ${bodyClassName}`}
        >
          {body}
        </p>
      </div>
    </AboutBentoShell>
  );
}
