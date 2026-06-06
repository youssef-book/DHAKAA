import { type ReactNode } from "react";

type AboutBentoGridProps = {
  children: ReactNode;
  className?: string;
  desktopMinHeight?: boolean;
};

export function AboutBentoGrid({
  children,
  className,
  desktopMinHeight = true,
}: AboutBentoGridProps) {
  return (
    <div
      className={`grid auto-rows-[minmax(220px,auto)] grid-cols-1 sm:grid-cols-2 ${
        desktopMinHeight ? "lg:min-h-screen" : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
