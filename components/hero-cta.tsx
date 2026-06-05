"use client";

import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";

import { DotmSquare1 } from "@/components/ui/dotm-square-1";
import { DotmSquare12 } from "@/components/ui/dotm-square-12";
import type { DotmSquare1Props } from "@/components/ui/dotm-square-1";

const LOADER_SIZE = 16;
const LOADER_DOT = 2;

type LoaderProps = Pick<
  DotmSquare1Props,
  "animated" | "hoverAnimated" | "size" | "dotSize" | "color" | "className" | "ariaLabel"
>;

type HeroCTALinkProps = {
  href: string;
  children: ReactNode;
  primary?: boolean;
  Loader?: ComponentType<LoaderProps>;
  loaderColor?: string;
  loaderAlwaysVisible?: boolean;
};

function HeroCTALink({
  href,
  children,
  primary = false,
  Loader,
  loaderColor,
  loaderAlwaysVisible = false,
}: HeroCTALinkProps) {
  const [hovered, setHovered] = useState(false);
  const showLoader = loaderAlwaysVisible || hovered;

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${
        primary
          ? "border-transparent bg-dhakaa-0 text-dhakaa-950 hover:bg-dhakaa-100"
          : "border-transparent text-dhakaa-300 hover:bg-white/8 hover:text-dhakaa-50"
      }`}
    >
      {Loader ? (
        <span
          aria-hidden
          className={`flex h-4 shrink-0 items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-out ${
            showLoader ? "w-4 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <Loader
            size={LOADER_SIZE}
            dotSize={LOADER_DOT}
            color={loaderColor ?? (primary ? "#09090b" : "currentColor")}
            animated={loaderAlwaysVisible || hovered}
            hoverAnimated={false}
            ariaLabel=""
            className="pointer-events-none"
          />
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  );
}

export function HeroCTAs() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="glass-dark flex items-center gap-1 rounded-full p-1.5">
        <HeroCTALink
          href="/solutions"
          primary
          Loader={DotmSquare12}
          loaderAlwaysVisible
        >
          See what we do
        </HeroCTALink>

        <div className="mx-1 h-5 w-px bg-white/10" aria-hidden />

        <HeroCTALink href="/contact" Loader={DotmSquare1} loaderAlwaysVisible>
          Book a discovery call
        </HeroCTALink>
      </div>
    </div>
  );
}
