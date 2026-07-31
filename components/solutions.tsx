"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SolutionsProjectDetailCards } from "@/components/solutions-project-detail-cards";
import { SolutionsGalleryHeader } from "@/components/solutions-gallery-header";
import { SolutionsIntro } from "@/components/solutions-intro";
import { SolutionsProjectGallery } from "@/components/solutions-project-gallery";
import { SolutionsProjectMobileCard } from "@/components/solutions-project-card";
import { solutionProjects } from "@/lib/solutions-data";

export function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSectionRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      sectionRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const updateActiveProject = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionRefs.current.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    updateActiveProject();
    window.addEventListener("scroll", updateActiveProject, { passive: true });
    window.addEventListener("resize", updateActiveProject);

    return () => {
      window.removeEventListener("scroll", updateActiveProject);
      window.removeEventListener("resize", updateActiveProject);
    };
  }, []);

  const activeProject = solutionProjects[activeIndex];

  return (
    <section className="bg-white text-dhakaa-950 lg:min-h-screen">
      <div className="grid lg:grid-cols-[minmax(0,38%)_1fr] lg:items-stretch">
        <div className="relative hidden lg:block lg:min-h-screen">
          <SolutionsIntro
            project={activeProject}
            index={activeIndex}
            total={solutionProjects.length}
          />
        </div>

        <div className="relative bg-white px-6 pt-6 pb-28 lg:min-h-screen lg:p-2 lg:pb-32 lg:pt-2">
          <div className="fixed top-2 right-0 left-[38%] z-10 hidden flex-col gap-4 bg-white p-2 lg:flex lg:px-6 lg:pt-6">
            <SolutionsGalleryHeader />
            <SolutionsProjectGallery
              projectKey={activeProject.title}
              images={activeProject.images}
              priority={activeIndex === 0}
            />
            <SolutionsProjectDetailCards
              project={activeProject}
              projectKey={activeProject.title}
            />
          </div>

          <div className="hidden lg:block">
            {solutionProjects.map((project, index) => (
              <div
                key={project.title}
                ref={setSectionRef(index)}
                className="h-svh"
                aria-hidden
              />
            ))}
          </div>

          <div className="lg:hidden">
            {solutionProjects.map((project, index) => (
              <SolutionsProjectMobileCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
