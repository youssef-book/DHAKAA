"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AboutBentoGrid } from "@/components/about-bento-grid";
import { ContactBentoTrigger } from "@/components/contact-bento-trigger";
import { ContactEmailCell } from "@/components/contact-email-cell";
import { ContactMeetingCell } from "@/components/contact-meeting-cell";
import { ContactResponseCell } from "@/components/contact-response-cell";
import { aboutRevealEase } from "@/lib/about-motion";

type ContactGridProps = {
  onOpen: () => void;
  active?: boolean;
  exiting?: boolean;
};

const cardTransition = {
  duration: 0.6,
  ease: aboutRevealEase,
};

const emailCardVariants = {
  enter: {
    opacity: 0,
    y: -32,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
  },
  exit: {
    opacity: 1,
    y: -32,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(0px)",
  },
};

const lowerCardVariants = {
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    filter: "blur(0px)",
  },
  exit: {
    opacity: 1,
    y: 48,
    clipPath: "inset(100% 0 0 0)",
    filter: "blur(0px)",
  },
};

export function ContactGrid({
  onOpen,
  active = false,
  exiting = false,
}: ContactGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AboutBentoGrid
      desktopMinHeight={false}
      className="lg:h-svh lg:max-h-svh lg:min-h-0 lg:grid-cols-3 lg:grid-rows-[18rem_minmax(0,1fr)] lg:overflow-hidden"
    >
      <div className="contents">
        <motion.div
          variants={reduceMotion ? undefined : emailCardVariants}
          initial={reduceMotion ? false : "enter"}
          animate={reduceMotion ? undefined : exiting ? "exit" : "show"}
          transition={reduceMotion ? { duration: 0 } : cardTransition}
          style={{ transformOrigin: "top" }}
          className="overflow-hidden sm:col-span-2 lg:col-span-3"
        >
          <ContactEmailCell />
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : lowerCardVariants}
          initial={false}
          animate={reduceMotion ? undefined : exiting ? "exit" : "show"}
          transition={reduceMotion ? { duration: 0 } : cardTransition}
          className="h-full min-h-0 overflow-hidden sm:col-span-2 lg:col-span-1 lg:row-start-2"
        >
          <ContactBentoTrigger active={active} onOpen={onOpen} />
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : lowerCardVariants}
          initial={false}
          animate={reduceMotion ? undefined : exiting ? "exit" : "show"}
          transition={reduceMotion ? { duration: 0 } : cardTransition}
          className="h-full min-h-0 overflow-hidden sm:col-span-2 lg:col-span-1 lg:row-start-2"
        >
          <ContactMeetingCell />
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : lowerCardVariants}
          initial={false}
          animate={reduceMotion ? undefined : exiting ? "exit" : "show"}
          transition={reduceMotion ? { duration: 0 } : cardTransition}
          className="h-full min-h-0 overflow-hidden sm:col-span-2 lg:col-span-1 lg:row-start-2"
        >
          <ContactResponseCell />
        </motion.div>
      </div>
    </AboutBentoGrid>
  );
}
