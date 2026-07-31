"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AccentTitle } from "@/components/solutions-accent-title";
import { SolutionsProjectTags } from "@/components/solutions-project-tags";
import {
  aboutIntroRevealContainer,
} from "@/lib/about-motion";
import { solutionsScrollVariants } from "@/lib/solutions-motion";
import type { SolutionProject } from "@/lib/solutions-data";

type SolutionsIntroProps = {
  project: SolutionProject;
  index: number;
  total: number;
};

export function SolutionsIntro({ project, index, total }: SolutionsIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : aboutIntroRevealContainer}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
      className="relative z-10 flex h-full flex-col justify-between bg-white px-6 pt-6 pb-28 lg:fixed lg:left-0 lg:top-0 lg:h-svh lg:w-[38%] lg:justify-start lg:px-8 lg:pt-8 lg:pb-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.title}
          variants={reduceMotion ? undefined : solutionsScrollVariants}
          initial={reduceMotion ? false : "enter"}
          animate={reduceMotion ? undefined : "center"}
          exit={reduceMotion ? undefined : "exit"}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Project {String(index + 1).padStart(2, "0")}{" "}
            <span className="text-dhakaa-300">/</span>{" "}
            {String(total).padStart(2, "0")}
          </p>

          <AccentTitle
            as="h1"
            text={project.title}
            accentWordIndex={1}
            className="font-display mt-4 max-w-[17rem] text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-dhakaa-950 sm:max-w-md sm:text-2xl lg:text-[1.65rem]"
          />

          <p className="font-subtitle mt-4 max-w-[17rem] text-sm font-normal leading-[1.6] tracking-[0.005em] text-dhakaa-500 sm:max-w-md sm:text-[0.9375rem]">
            {project.description}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-dhakaa-600">
            <span className="text-slate-500">Partner</span>{" "}
            <span className="font-semibold tracking-[-0.03em] text-dhakaa-950">
              {project.partner}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${project.title}-tags`}
          variants={reduceMotion ? undefined : solutionsScrollVariants}
          initial={reduceMotion ? false : "enter"}
          animate={reduceMotion ? undefined : "center"}
          exit={reduceMotion ? undefined : "exit"}
          className="lg:absolute lg:bottom-24 lg:left-8 lg:right-8"
        >
          <SolutionsProjectTags tags={project.tags} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
