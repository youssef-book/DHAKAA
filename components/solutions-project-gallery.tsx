"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  solutionsGalleryReveal,
  solutionsImageReveal,
} from "@/lib/solutions-motion";
import type { SolutionProjectImage } from "@/lib/solutions-data";

type SolutionsProjectGalleryProps = {
  images: SolutionProjectImage[];
  projectKey: string;
  priority?: boolean;
};

const navButtonClassName =
  "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-transparent text-dhakaa-500 transition-[color,opacity,transform] duration-200 ease-out hover:text-dhakaa-950 active:scale-[0.97] sm:size-12";

export function SolutionsProjectGallery({
  images,
  projectKey,
  priority = false,
}: SolutionsProjectGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [projectKey]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const target = itemRefs.current[index];
      if (!target) return;

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
    },
    [reduceMotion],
  );

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const container = scrollRef.current;
      if (!container) return;

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (items.length === 0) return;

      const scrollLeft = container.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const nextIndex =
        direction === 1
          ? Math.min(closestIndex + 1, items.length - 1)
          : Math.max(closestIndex - 1, 0);

      scrollToIndex(nextIndex);
    },
    [scrollToIndex],
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={projectKey}
        variants={reduceMotion ? undefined : solutionsGalleryReveal}
        initial={reduceMotion ? false : "enter"}
        animate={reduceMotion ? undefined : "center"}
        exit={reduceMotion ? undefined : "exit"}
        className="relative w-full"
        aria-label="Project gallery"
      >
        <div className="relative w-full">
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Previous photo"
                className={`${navButtonClassName} left-2 sm:left-3`}
              >
                <ChevronLeft className="size-5 sm:size-6" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Next photo"
                className={`${navButtonClassName} right-2 sm:right-3`}
              >
                <ChevronRight className="size-5 sm:size-6" strokeWidth={2} />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max snap-x snap-mandatory gap-2 px-1 py-1 sm:gap-2">
              {images.map((image, imageIndex) => (
                <motion.figure
                  key={`${projectKey}-${image.src}-${imageIndex}`}
                  ref={(node) => {
                    itemRefs.current[imageIndex] = node;
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 24, scale: 0.95, filter: "blur(4px)" }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  }
                  transition={
                    reduceMotion ? { duration: 0 } : solutionsImageReveal(imageIndex)
                  }
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.016, transition: { duration: 0.32 } }
                  }
                  className="relative aspect-[4/3] w-[min(58vw,260px)] shrink-0 snap-start overflow-hidden rounded-[var(--radius-md)] shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:w-[min(46vw,300px)] lg:w-[min(32vw,340px)]"
                  style={{ transformOrigin: "center center" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 58vw, 32vw"
                    priority={priority && imageIndex === 0}
                    unoptimized={image.src.startsWith("http")}
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
