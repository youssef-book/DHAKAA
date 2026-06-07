"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactBentoShell } from "@/components/contact-bento-shell";

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

type ContactBentoTriggerProps = {
  onOpen: () => void;
  active?: boolean;
};

export function ContactBentoTrigger({
  onOpen,
  active = false,
}: ContactBentoTriggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={active}
      className={`block h-full min-h-0 w-full text-left ${
        active
          ? "ring-2 ring-blue-700/40 ring-offset-2 ring-offset-dhakaa-50"
          : ""
      }`}
    >
      <ContactBentoShell className="group h-full min-h-0! cursor-pointer bg-dhakaa-950 text-dhakaa-0 hover:bg-dhakaa-900 [&>div]:p-5 lg:[&>div]:pb-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-out)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(37, 99, 235, 0.22), transparent 62%)",
          }}
          aria-hidden
        />
        <motion.div
          className="relative flex min-h-0 flex-1 flex-col justify-between"
          initial="rest"
          whileHover={reduceMotion ? "rest" : "hover"}
          variants={cellVariants}
        >
          <motion.p
            variants={reduceMotion ? undefined : labelVariants}
            className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-500 transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-blue-300"
          >
            Message
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : contentVariants}>
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              Send us a note
            </h2>
            <motion.p
              variants={reduceMotion ? undefined : bodyVariants}
              className="mt-2.5 max-w-sm text-sm leading-snug text-dhakaa-400"
            >
              Share your project, timeline, and team context — we&apos;ll reply
              within one business day.
            </motion.p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-700/30 bg-blue-700/10 px-3.5 py-1.5 text-xs font-medium text-blue-200 transition-[background,border-color,transform] duration-300 ease-[var(--ease-out)] group-hover:border-blue-500/40 group-hover:bg-blue-700/20 sm:text-sm">
              Open form
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.div>
        </motion.div>
      </ContactBentoShell>
    </button>
  );
}
