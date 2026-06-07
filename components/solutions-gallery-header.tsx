"use client";

import { motion, useReducedMotion } from "framer-motion";
import { aboutIntroRevealItem } from "@/lib/about-motion";

export function SolutionsGalleryHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : aboutIntroRevealItem}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
      className="min-h-[4.5rem]"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        Gallery
      </p>
    </motion.div>
  );
}
