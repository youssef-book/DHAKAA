"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { aboutGridOverlayReveal } from "@/lib/about-motion";

export const aboutCellClassName =
  "relative flex min-h-56 flex-col justify-between overflow-hidden transition-[background-color] duration-300 ease-[var(--ease-out)]";

const easeOut = [0.23, 1, 0.32, 1] as const;

const cellVariants = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

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

type AboutBentoShellProps = {
  className?: string;
  backdrop?: ReactNode;
  children: ReactNode;
};

export function AboutBentoShell({
  className,
  backdrop,
  children,
}: AboutBentoShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`${aboutCellClassName} group ${className ?? ""}`}>
      {backdrop}

      <motion.div
        className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-6"
        initial="rest"
        whileHover={reduceMotion ? "rest" : "hover"}
        variants={cellVariants}
      >
        {children}
      </motion.div>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-dhakaa-0"
          initial={{ height: "100%" }}
          animate={{ height: 0 }}
          transition={aboutGridOverlayReveal}
        />
      ) : null}
    </div>
  );
}

type AboutBentoCardProps = {
  label: string;
  title: string;
  body: string;
  className: string;
  labelClassName: string;
  bodyClassName: string;
};

export function AboutBentoCard({
  label,
  title,
  body,
  className,
  labelClassName,
  bodyClassName,
}: AboutBentoCardProps) {
  const reduceMotion = useReducedMotion();
  const motionVariants = reduceMotion ? undefined : labelVariants;
  const motionContentVariants = reduceMotion ? undefined : contentVariants;
  const motionBodyVariants = reduceMotion ? undefined : bodyVariants;

  return (
    <AboutBentoShell className={className}>
      <motion.p
        variants={motionVariants}
        className={`text-xs font-medium uppercase tracking-[0.2em] ${labelClassName}`}
      >
        {label}
      </motion.p>
      <motion.div variants={motionContentVariants} className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
        <motion.p
          variants={motionBodyVariants}
          className={`mt-4 text-sm leading-relaxed ${bodyClassName}`}
        >
          {body}
        </motion.p>
      </motion.div>
    </AboutBentoShell>
  );
}
