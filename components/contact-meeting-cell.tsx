"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AboutBentoShell } from "@/components/about-bento-cell";

const EMAIL = "hello@dhakaa.com";
const MEETING_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Book a meeting with DHAKAA",
)}&body=${encodeURIComponent(
  "Hi DHAKAA,\n\nI'd like to book a discovery call.\n\nCompany:\nProject context:\nPreferred times:\n",
)}`;
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
  rest: { opacity: 0.9 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

export function ContactMeetingCell() {
  const reduceMotion = useReducedMotion();

  return (
    <AboutBentoShell
      className="h-full min-h-0 bg-blue-700 text-dhakaa-0 hover:bg-blue-800 [&>div]:p-5 lg:[&>div]:pb-8"
      revealOverlay={false}
      backdrop={
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0 opacity-40 transition-opacity duration-500 ease-out group-hover:opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 18% 20%, rgba(255, 255, 255, 0.24), transparent 58%), radial-gradient(ellipse at 85% 85%, rgba(15, 23, 42, 0.24), transparent 55%)",
            }}
          />
        </div>
      }
    >
      <motion.p
        variants={reduceMotion ? undefined : labelVariants}
        className="text-xs font-medium uppercase tracking-[0.2em] text-blue-100 transition-colors duration-300 ease-out group-hover:text-white"
      >
        Meeting
      </motion.p>

      <motion.div variants={reduceMotion ? undefined : contentVariants}>
        <h2 className="text-xl font-semibold tracking-[-0.03em]">
          Book a discovery call
        </h2>
        <motion.p
          variants={reduceMotion ? undefined : bodyVariants}
          className="mt-2.5 max-w-sm text-sm leading-snug text-blue-100"
        >
          Prefer to talk it through? Send a few times that work and we&apos;ll
          set up a focused 30-minute call.
        </motion.p>
        <a
          href={MEETING_HREF}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition-[background,border-color,transform] duration-300 ease-out hover:border-white/35 hover:bg-white/15 active:scale-[0.97] sm:text-sm"
        >
          Book a meeting
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </AboutBentoShell>
  );
}
