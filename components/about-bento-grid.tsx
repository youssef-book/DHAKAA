import { type ReactNode } from "react";

type AboutBentoGridProps = {
  children: ReactNode;
};

export function AboutBentoGrid({ children }: AboutBentoGridProps) {
  return (
    <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 sm:grid-cols-2 lg:min-h-screen">
      {children}
    </div>
  );
}
