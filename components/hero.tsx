"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  HERO_REVEAL_CONTENT_DELAY_S,
  HeroBackground,
} from "@/components/hero-background";
import { HeroCTAs } from "@/components/hero-cta";

const revealContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: HERO_REVEAL_CONTENT_DELAY_S,
      staggerChildren: 0.18,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-16 sm:pb-24">
      <HeroBackground />
      <motion.div
        variants={reduceMotion ? undefined : revealContainer}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <Image
            src="/logo.svg"
            alt="DHAKAA"
            width={280}
            height={56}
            className="mb-8 h-9 w-auto brightness-0 invert sm:mb-10 sm:h-11"
            priority
          />
        </motion.div>

        <motion.h1
          variants={reduceMotion ? undefined : revealItem}
          className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-dhakaa-50 sm:text-[3rem] md:text-[3.5rem]"
        >
          Software built for how your business{" "}
          <span className="font-medium text-blue-200">actually</span> works
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : revealItem}
          className="font-subtitle mt-6 max-w-lg text-[1rem] font-normal leading-[1.65] tracking-[0.005em] text-dhakaa-300 sm:mt-8 sm:text-[1.125rem] md:max-w-xl md:text-[1.2rem]"
        >
          We partner with established companies to design and build bespoke
          software — not off-the-shelf tools forced to fit.
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <HeroCTAs />
        </motion.div>
      </motion.div>
    </section>
  );
}
