"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AboutBentoShell } from "@/components/about-bento-cell";

const EMAIL = "hello@dhakaa.com";
const easeOut = [0.23, 1, 0.32, 1] as const;

const labelVariants = {
  rest: { opacity: 1, x: 0 },
  hover: { opacity: 1, x: 3, transition: { duration: 0.3, ease: easeOut } },
};

const contentVariants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.35, ease: easeOut } },
};

const actionClassName =
  "mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-blue-700/20 bg-blue-700/8 px-4 py-2 text-sm font-medium text-blue-700 transition-[background,border-color,transform] duration-300 ease-[var(--ease-out)] hover:border-blue-700/30 hover:bg-blue-700/12 active:scale-[0.97]";

export function ContactResponseCell() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
      <AboutBentoShell
      className="h-full min-h-0 bg-dhakaa-0 text-dhakaa-950 hover:bg-dhakaa-50 [&>div]:p-5 lg:[&>div]:pb-8"
      revealOverlay={false}
    >
      <motion.p
        variants={reduceMotion ? undefined : labelVariants}
        className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400 transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-blue-700"
      >
        Careers
      </motion.p>

      <motion.div
        variants={reduceMotion ? undefined : contentVariants}
      >
        <h2 className="text-xl font-semibold tracking-[-0.03em]">
          Interested in building with us?
        </h2>
        <p className="mt-2.5 max-w-sm text-sm leading-snug text-dhakaa-500">
          We&apos;re always glad to hear from thoughtful designers, engineers,
          and operators who care about custom software.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Email copied" : `Copy ${EMAIL} to clipboard`}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-700/20 bg-blue-700/8 px-3.5 py-1.5 text-xs font-medium text-blue-700 transition-[background,border-color,transform] duration-300 ease-[var(--ease-out)] hover:border-blue-700/30 hover:bg-blue-700/12 active:scale-[0.97] sm:text-sm"
        >
          {copied ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3.5 8.5l3 3 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Email copied, contact us {EMAIL}
            </>
          ) : (
            <>
              Say hello
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </motion.div>
    </AboutBentoShell>
  );
}
