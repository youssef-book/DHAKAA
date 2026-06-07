"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AboutBentoLampLeft,
  AboutBentoLampTop,
  AboutBentoShell,
} from "@/components/about-bento-cell";
import { solutionsScrollVariants } from "@/lib/solutions-motion";
import type { SolutionProject } from "@/lib/solutions-data";

type SolutionsProjectDetailCardsProps = {
  project: SolutionProject;
  projectKey: string;
};

const labelClassName = "text-slate-500";
const bodyClassName = "text-dhakaa-600";

export function SolutionsProjectDetailCards({
  project,
  projectKey,
}: SolutionsProjectDetailCardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={projectKey}
        variants={reduceMotion ? undefined : solutionsScrollVariants}
        initial={reduceMotion ? false : "enter"}
        animate={reduceMotion ? undefined : "center"}
        exit={reduceMotion ? undefined : "exit"}
        className="grid gap-1.5 sm:grid-cols-2 sm:gap-2"
      >
        <AboutBentoShell
          glassVariant="blue"
          direction="bottom"
          revealOverlay={false}
          backdrop={<AboutBentoLampTop />}
          className="min-h-48"
        >
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] ${labelClassName}`}
          >
            Photo
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-dhakaa-950">
              Platform views
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${bodyClassName}`}>
              {project.photoDescription}
            </p>
          </div>
        </AboutBentoShell>

        <AboutBentoShell
          glassVariant="blue"
          direction="right"
          revealOverlay={false}
          backdrop={<AboutBentoLampLeft />}
          className="min-h-48"
        >
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] ${labelClassName}`}
          >
            Partner
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-dhakaa-950">
              {project.partner}
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${bodyClassName}`}>
              &ldquo;{project.partnerRecommendation}&rdquo;
            </p>
            <p className={`mt-4 text-sm leading-relaxed ${bodyClassName}`}>
              {project.partnerComment}
            </p>
          </div>
        </AboutBentoShell>
      </motion.div>
    </AnimatePresence>
  );
}
