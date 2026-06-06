"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { LightHeroGrid } from "@/components/light-hero-grid";
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

const armBlurRevealEase = [0.23, 1, 0.32, 1] as const;

function armBlurReveal(delay: number) {
  return {
    hidden: { filter: "blur(16px)" },
    show: {
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.85,
        ease: armBlurRevealEase,
      },
    },
  };
}

function LightHeroBackground() {
  return <LightHeroGrid />;
}

type LightHeroArmProps = {
  transform?: MotionValue<string>;
  reduceMotion: boolean | null;
  revealDelay: number;
};

function LightHeroHumanArm({
  transform,
  reduceMotion,
  revealDelay = 0.3,
}: LightHeroArmProps) {
  return (
    <div
      className="pointer-events-none absolute -left-14 top-[24%] z-20 -translate-y-1/2 sm:-left-18"
      aria-hidden
    >
      <motion.div
        style={{
          transform,
          willChange: "transform",
        }}
      >
        <motion.div
          variants={reduceMotion ? undefined : armBlurReveal(revealDelay)}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <Image
            src="/humanarm.webp"
            alt=""
            width={2048}
            height={1548}
            sizes="(max-width: 768px) 46vw, 540px"
            className="h-auto w-[min(46vw,540px)] max-w-none rotate-[16deg] object-contain object-left mix-blend-screen"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function LightHeroRoboticArm({
  transform,
  reduceMotion,
  revealDelay = 0.48,
}: LightHeroArmProps) {
  return (
    <div
      className="pointer-events-none absolute -right-10 top-[63%] z-20 -translate-y-1/2 sm:-right-14"
      aria-hidden
    >
      <motion.div
        style={{
          transform,
          willChange: "transform",
        }}
      >
        <motion.div
          variants={reduceMotion ? undefined : armBlurReveal(revealDelay)}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <Image
            src="/reoboticarm.webp"
            alt=""
            width={1024}
            height={774}
            sizes="(max-width: 768px) 48vw, 580px"
            className="h-auto w-[min(50vw,580px)] max-w-none rotate-[28deg] object-contain object-right mix-blend-screen"
            priority
          />
        </motion.div>
      </motion.div>
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

export function LightHero2() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 130, damping: 22, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 130, damping: 22, mass: 0.35 });
  const humanHandTransform = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `translate3d(${(-x * 18).toFixed(2)}px, ${(-y * 12).toFixed(2)}px, 0)`
  );
  const roboticHandTransform = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `translate3d(${(x * 18).toFixed(2)}px, ${(y * 12).toFixed(2)}px, 0)`
  );

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(x);
    pointerY.set(y);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 sm:pb-24"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
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

        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <motion.h1 className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-dhakaa-950 sm:text-[3rem] md:text-[3.5rem]">
            <span className="font-medium text-blue-600">Software</span> built for
            how your business actually works
          </motion.h1>
        </motion.div>

        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <motion.p className="font-subtitle mt-6 max-w-lg text-[1rem] font-normal leading-[1.65] tracking-[0.005em] text-dhakaa-700 sm:mt-8 sm:text-[1.125rem] md:max-w-xl md:text-[1.2rem]">
            We partner with established companies to design and build bespoke
            software — not off-the-shelf tools forced to fit.
          </motion.p>
        </motion.div>

        <motion.div variants={reduceMotion ? undefined : revealItem}>
          <LightHeroCTAs />
        </motion.div>
      </motion.div>
      <LightHeroHumanArm
        transform={reduceMotion ? undefined : humanHandTransform}
        reduceMotion={reduceMotion}
        revealDelay={0.3}
      />
      <LightHeroRoboticArm
        transform={reduceMotion ? undefined : roboticHandTransform}
        reduceMotion={reduceMotion}
        revealDelay={0.48}
      />
    </section>
  );
}
