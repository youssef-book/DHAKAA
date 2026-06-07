"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SolutionsProjectDetailCards } from "@/components/solutions-project-detail-cards";
import { SolutionsProjectGallery } from "@/components/solutions-project-gallery";
import { SolutionsProjectTags } from "@/components/solutions-project-tags";
import {
  aboutIntroRevealContainer,
  aboutIntroRevealItem,
} from "@/lib/about-motion";
import type { SolutionProject } from "@/lib/solutions-data";

type SolutionsProjectMobileCardProps = {
  project: SolutionProject;
  index: number;
};

export function SolutionsProjectMobileCard({
  project,
  index,
}: SolutionsProjectMobileCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : aboutIntroRevealContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      className="pb-16"
    >
      <SolutionsProjectGallery
        projectKey={project.title}
        images={project.images}
        priority={index === 0}
      />

      <div className="mt-4">
        <SolutionsProjectDetailCards
          project={project}
          projectKey={project.title}
        />
      </div>

      <div className="mt-8">
        <motion.p
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500"
        >
          Project {String(index + 1).padStart(2, "0")}
        </motion.p>
        <motion.h2
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="font-display mt-3 text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-dhakaa-950"
        >
          {project.title}
        </motion.h2>
        <motion.p
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="font-subtitle mt-3 text-sm font-normal leading-[1.6] tracking-[0.005em] text-dhakaa-500"
        >
          {project.description}
        </motion.p>
        <motion.p
          variants={reduceMotion ? undefined : aboutIntroRevealItem}
          className="mt-4 text-sm leading-relaxed text-dhakaa-600"
        >
          <span className="text-slate-500">Partner</span>{" "}
          <span className="font-semibold tracking-[-0.03em] text-dhakaa-950">
            {project.partner}
          </span>
        </motion.p>
        <motion.div variants={reduceMotion ? undefined : aboutIntroRevealItem}>
          <SolutionsProjectTags tags={project.tags} className="mt-4" />
        </motion.div>
      </div>
    </motion.article>
  );
}
