"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ContactFormPanel } from "@/components/contact-form-panel";
import { ContactGrid } from "@/components/contact-grid";
import { ContactIntro } from "@/components/contact-intro";
import { aboutRevealEase } from "@/lib/about-motion";

const layerTransition = {
  duration: 0.6,
  ease: aboutRevealEase,
};

const sheetVariants = {
  enter: {
    clipPath: "inset(0 0 100% 0)",
  },
  show: {
    clipPath: "inset(0 0 0% 0)",
  },
  // Exit handled per-region so lower cards can lose height downward, not whole-page upward.
  exit: {
    clipPath: "inset(0 0 0% 0)",
  },
};

const formLayerVariants = {
  closed: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
  },
  open: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
  },
};

export function Contact() {
  const [formOpen, setFormOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleClose = () => {
    setFormOpen(false);
  };

  return (
    <section className="relative min-h-svh overflow-hidden bg-dhakaa-50 text-dhakaa-950 lg:h-svh lg:min-h-svh">
      <motion.div
        className="absolute inset-0 z-10"
        variants={reduceMotion ? undefined : formLayerVariants}
        initial={false}
        animate={reduceMotion ? { opacity: formOpen ? 1 : 0 } : formOpen ? "open" : "closed"}
        transition={reduceMotion ? { duration: 0 } : layerTransition}
        style={{ pointerEvents: formOpen ? "auto" : "none" }}
        aria-hidden={!formOpen}
      >
        <ContactFormPanel open={formOpen} onClose={handleClose} />
      </motion.div>

      <motion.div
        className="relative z-20 overflow-hidden lg:h-svh"
        variants={reduceMotion ? undefined : sheetVariants}
        initial={reduceMotion ? false : "enter"}
        animate={
          reduceMotion
            ? { opacity: formOpen ? 0 : 1 }
            : formOpen
              ? "exit"
              : "show"
        }
        transition={reduceMotion ? { duration: 0 } : layerTransition}
        style={{
          pointerEvents: formOpen ? "none" : "auto",
        }}
      >
        <div className="grid lg:h-svh lg:grid-cols-[minmax(0,38%)_1fr] lg:items-stretch">
          <div className="relative lg:min-h-svh">
            <ContactIntro exiting={formOpen} />
          </div>

          <ContactGrid
            onOpen={() => setFormOpen(true)}
            active={formOpen}
            exiting={formOpen}
          />
        </div>
      </motion.div>
    </section>
  );
}
