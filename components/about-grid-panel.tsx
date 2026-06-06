import { type ReactNode } from "react";

type AboutGridPanelProps = {
  children: ReactNode;
};

export function AboutGridPanel({ children }: AboutGridPanelProps) {
  return <div className="relative bg-white lg:min-h-screen">{children}</div>;
}
