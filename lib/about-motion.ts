/** About page reveal — occasional/marketing load (Emil: ease-out, ~500ms range). */
export const aboutRevealEase = [0.23, 1, 0.32, 1] as const;

export const aboutIntroRevealContainer = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.08, staggerChildren: 0.12 },
  },
};

export const aboutIntroRevealItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: aboutRevealEase,
    },
  },
};

export const aboutGridOverlayReveal = {
  duration: 0.65,
  delay: 0.22,
  ease: aboutRevealEase,
};
