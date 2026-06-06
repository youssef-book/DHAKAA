"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { DotmSquare1 } from "@/components/ui/dotm-square-1";
import { DotmSquare12 } from "@/components/ui/dotm-square-12";

const revealContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.14,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function LightHeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-dhakaa-50"
      aria-hidden
    >
      <div className="absolute inset-x-0 bottom-0 translate-y-[8%] sm:translate-y-[10%]">
        <Image
          src="/Background.webp"
          alt=""
          width={9900}
          height={4200}
          sizes="100vw"
          className="h-auto w-full object-bottom opacity-90"
          priority
        />
      </div>
    </div>
  );
}

function LightHeroCTAs() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="glass-strong flex items-center gap-1 rounded-full p-1.5">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 rounded-full bg-dhakaa-950 px-5 py-2.5 text-sm font-medium text-dhakaa-0 shadow-[0_14px_36px_rgba(9,9,11,0.18)] transition-[background-color,transform] duration-150 ease-out hover:bg-dhakaa-800 active:scale-[0.97]"
        >
          <DotmSquare12
            size={16}
            dotSize={2}
            color="currentColor"
            animated
            hoverAnimated={false}
            ariaLabel=""
            className="pointer-events-none"
          />
          <span>See what we do</span>
        </Link>

        <div className="mx-1 h-5 w-px bg-dhakaa-950/10" aria-hidden />

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-dhakaa-700 transition-[background-color,color,transform] duration-150 ease-out hover:bg-dhakaa-950/5 hover:text-dhakaa-950 active:scale-[0.97]"
        >
          <DotmSquare1
            size={16}
            dotSize={2}
            color="currentColor"
            animated
            hoverAnimated={false}
            ariaLabel=""
            className="pointer-events-none"
          />
          <span>Book a discovery call</span>
        </Link>
      </div>
    </div>
  );
}

export function LightHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 sm:pb-24">
      <LightHeroBackground />
      <motion.div
        variants={reduceMotion ? undefined : revealContainer}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <Image
            src="/logo.svg"
            alt="DHAKAA"
            width={280}
            height={56}
            className="mb-8 h-9 w-auto sm:mb-10 sm:h-11"
            priority
          />
        </motion.div>

        <motion.h1
          variants={reduceMotion ? undefined : revealItem}
          className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-dhakaa-950 sm:text-[3rem] md:text-[3.5rem]"
        >
          Software built for how your business{" "}
          <span className="font-medium text-blue-600">actually</span> works
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : revealItem}
          className="font-subtitle mt-6 max-w-lg text-[1rem] font-normal leading-[1.65] tracking-[0.005em] text-dhakaa-700 sm:mt-8 sm:text-[1.125rem] md:max-w-xl md:text-[1.2rem]"
        >
          We partner with established companies to design and build bespoke
          software — not off-the-shelf tools forced to fit.
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <LightHeroCTAs />
        </motion.div>
      </motion.div>
    </section>
  );
}
