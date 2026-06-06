"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  aboutIntroRevealContainer,
  aboutIntroRevealItem,
  aboutRevealEase,
} from "@/lib/about-motion";

type ContactIntroProps = {
  exiting?: boolean;
};

const introTransition = {
  duration: 0.6,
  ease: aboutRevealEase,
};

const introExitVariants = {
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    filter: "blur(0px)",
  },
  exit: {
    opacity: 1,
    x: -48,
    clipPath: "inset(0 100% 0 0)",
    filter: "blur(0px)",
  },
};

export function ContactIntro({ exiting = false }: ContactIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : introExitVariants}
      initial={false}
      animate={reduceMotion ? undefined : exiting ? "exit" : "show"}
      transition={reduceMotion ? { duration: 0 } : introTransition}
      className="relative z-10 bg-dhakaa-50 px-6 pt-6 pb-10 lg:fixed lg:left-0 lg:top-0 lg:w-[38%] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <motion.div
        variants={reduceMotion ? undefined : aboutIntroRevealContainer}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
      >
        <motion.h1
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="font-display max-w-[17rem] text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-dhakaa-950 sm:max-w-xs sm:text-2xl lg:text-[1.65rem]"
        >
          Ready to build something that{" "}
          <span className="font-medium text-blue-700">fits</span>?
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="font-subtitle mt-4 max-w-[17rem] text-sm font-normal leading-[1.6] tracking-[0.005em] text-dhakaa-500 sm:max-w-xs sm:text-[0.9375rem]"
        >
          Tell us about your company and what you need. We&apos;ll schedule a
          discovery call to see if we&apos;re the right fit.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
