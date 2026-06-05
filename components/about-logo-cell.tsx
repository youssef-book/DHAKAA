"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AboutBentoShell } from "@/components/about-bento-cell";
import { HeroBackground } from "@/components/hero-background";

const easeOut = [0.23, 1, 0.32, 1] as const;

const labelVariants = {
  rest: { opacity: 1, x: 0 },
  hover: { opacity: 1, x: 3, transition: { duration: 0.3, ease: easeOut } },
};

const contentVariants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.35, ease: easeOut } },
};

const bodyVariants = {
  rest: { opacity: 0.88 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

export function AboutLogoCell() {
  const reduceMotion = useReducedMotion();

  return (
    <AboutBentoShell
      className="sm:col-span-2"
      backdrop={
        <div
          className="pointer-events-none absolute inset-0 z-0 scale-100 opacity-95 transition-[opacity,transform] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03] group-hover:opacity-100"
          aria-hidden
        >
          <HeroBackground animate={false} fadeGridSides glowAnchor="left" />
        </div>
      }
    >
      <div className="flex h-full min-h-52 flex-col justify-between">
        <motion.p
          variants={reduceMotion ? undefined : labelVariants}
          className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400 transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-dhakaa-300"
        >
          Logo
        </motion.p>
        <motion.div variants={reduceMotion ? undefined : contentVariants} className="relative">
          <div
            className="pointer-events-none absolute -bottom-6 left-0 h-36 w-[min(100%,22rem)] scale-100 rounded-full blur-3xl transition-[opacity,transform] duration-500 ease-[var(--ease-out)] group-hover:scale-110 group-hover:opacity-100 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse at 18% 60%, rgba(65, 120, 190, 0.38), rgba(40, 75, 135, 0.12) 48%, transparent 72%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="DHAKAA"
              width={260}
              height={55}
              className="h-9 w-auto brightness-0 invert transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.02]"
            />
            <motion.p
              variants={reduceMotion ? undefined : bodyVariants}
              className="mt-5 max-w-sm text-sm leading-relaxed text-dhakaa-300"
            >
              A focused development partner for teams that need software shaped
              around how their business already wins.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </AboutBentoShell>
  );
}
