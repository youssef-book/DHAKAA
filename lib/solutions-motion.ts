import {
  aboutGridBubbleHide,
  aboutGridBubbleReveal,
  aboutRevealEase,
} from "@/lib/about-motion";

/** Scroll-linked content — matches contactIntroExitItem / aboutIntroRevealItem. */
export const solutionsScrollVariants = {
  enter: {
    opacity: 0,
    y: 16,
    filter: "blur(5px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: aboutRevealEase,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(5px)",
    transition: {
      duration: 0.5,
      ease: aboutRevealEase,
    },
  },
};

/** Gallery panel — matches about bento bubble entrance. */
export const solutionsGalleryReveal = {
  enter: {
    opacity: 0,
    y: 24,
    scale: 0.95,
    filter: "blur(4px)",
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: aboutGridBubbleReveal,
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    filter: "blur(4px)",
    transition: aboutGridBubbleHide,
  },
};

export const solutionsImageReveal = (index: number) => ({
  duration: 0.52,
  delay: 0.22 + index * 0.08,
  ease: aboutRevealEase,
});
