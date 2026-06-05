"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  aboutIntroRevealContainer,
  aboutIntroRevealItem,
} from "@/lib/about-motion";

export function AboutIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : aboutIntroRevealContainer}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
      className="relative z-10 bg-dhakaa-50 px-6 pt-6 pb-10 lg:fixed lg:left-0 lg:top-0 lg:w-[38%] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <motion.h1
        variants={reduceMotion ? undefined : aboutIntroRevealItem}
        className="font-display max-w-[17rem] text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-dhakaa-950 sm:max-w-xs sm:text-2xl lg:text-[1.65rem]"
      >
        Software built for companies that{" "}
        <span className="font-medium text-blue-700">know</span> their business.
      </motion.h1>

      <motion.p
        variants={reduceMotion ? undefined : aboutIntroRevealItem}
        className="font-subtitle mt-4 max-w-[17rem] text-sm font-normal leading-[1.6] tracking-[0.005em] text-dhakaa-500 sm:max-w-xs sm:text-[0.9375rem]"
      >
        Bespoke software for established teams — not templates or force-fit SaaS.
      </motion.p>
    </motion.div>
  );
}
