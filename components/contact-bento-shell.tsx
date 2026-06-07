import { type ReactNode } from "react";

type ContactBentoGlassVariant = "default" | "blue" | "accent" | "muted";

const glassVariantClass: Record<ContactBentoGlassVariant, string> = {
  default: "",
  blue: "about-bento-glass--blue",
  accent: "about-bento-glass--accent",
  muted: "about-bento-glass--muted",
};

const contactCellClassName =
  "about-bento-glass relative flex h-full min-h-56 flex-col justify-between text-dhakaa-950";

const contactCellClipClassName =
  "min-h-56 overflow-hidden rounded-[var(--radius-md)]";

type ContactBentoShellProps = {
  className?: string;
  glassVariant?: ContactBentoGlassVariant;
  backdrop?: ReactNode;
  children: ReactNode;
};

export function ContactBentoShell({
  className,
  glassVariant = "blue",
  backdrop,
  children,
}: ContactBentoShellProps) {
  return (
    <div className={`${contactCellClipClassName} ${className ?? ""}`}>
      <div
        className={`${contactCellClassName} ${glassVariantClass[glassVariant]}`}
      >
        <span className="about-bento-glass__noise" aria-hidden />
        <span className="about-bento-glass__lens" aria-hidden />
        <span className="about-bento-glass__tint" aria-hidden />
        <span className="about-bento-glass__edge" aria-hidden />
        {backdrop}

        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
