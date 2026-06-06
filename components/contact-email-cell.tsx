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

const bodyVariants = {
  rest: { opacity: 0.9 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

const actionClassName =
  "inline-flex items-center gap-2 rounded-full border border-blue-700/30 bg-blue-700/10 px-4 py-2.5 text-sm font-medium text-blue-200 transition-[background,border-color,transform] duration-300 ease-[var(--ease-out)] hover:border-blue-500/40 hover:bg-blue-700/20 active:scale-[0.97]";

export function ContactEmailCell() {
  const reduceMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that block clipboard access.
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
      className="h-full bg-dhakaa-950 text-dhakaa-0 hover:bg-dhakaa-900 sm:col-span-2"
      revealOverlay={false}
      backdrop={
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out)] group-hover:opacity-100"
            style={{
              opacity: 0.75,
              background:
                "radial-gradient(ellipse at 18% 80%, rgba(37, 99, 235, 0.28), transparent 58%), radial-gradient(ellipse at 92% 8%, rgba(59, 130, 246, 0.16), transparent 50%)",
            }}
          />

        </div>
      }
    >
      <div className="flex h-full min-h-52 flex-col justify-between">
        <motion.p
          variants={reduceMotion ? undefined : labelVariants}
          className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-500 transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-blue-300"
        >
          Email
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : contentVariants}>
          <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-dhakaa-0 sm:text-3xl">
            {EMAIL}
          </p>
          <motion.p
            variants={reduceMotion ? undefined : bodyVariants}
            className="mt-3 max-w-md text-sm leading-relaxed text-dhakaa-400"
          >
            Prefer email? Reach out directly — we read every message.
          </motion.p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className={actionClassName}
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
                  Copied
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="5.5"
                      y="5.5"
                      width="8"
                      height="8"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10.5 5.5V4a1.5 1.5 0 00-1.5-1.5H4A1.5 1.5 0 002.5 4v5A1.5 1.5 0 004 10.5h1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Copy email
                </>
              )}
            </button>

            <a href={`mailto:${EMAIL}`} className={actionClassName}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2.5 4.5h11v7h-11v-7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 5l5.5 4 5.5-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Open mail app
            </a>
          </div>
        </motion.div>
      </div>
    </AboutBentoShell>
  );
}
