import Image from "next/image";
import { AboutBentoShell } from "@/components/about-bento-cell";

export function AboutLogoCell() {
  return (
    <AboutBentoShell
      className="sm:col-span-2"
      backdrop={
        <div
          className="about-bento-glass__lamp pointer-events-none absolute inset-0 z-[4]"
          aria-hidden
        />
      }
    >
      <div className="flex h-full min-h-52 flex-col justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Logo
        </p>
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="DHAKAA"
            width={260}
            height={55}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-dhakaa-600">
            A focused development partner for teams that need software shaped
            around how their business already wins.
          </p>
        </div>
      </div>
    </AboutBentoShell>
  );
}
