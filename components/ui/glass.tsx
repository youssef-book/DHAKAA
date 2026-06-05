import { type ComponentPropsWithoutRef, type ElementType } from "react";

type GlassVariant = "default" | "strong" | "subtle" | "dark";

const variantClass: Record<GlassVariant, string> = {
  default: "glass",
  strong: "glass-strong",
  subtle: "glass-subtle",
  dark: "glass-dark",
};

type GlassProps<T extends ElementType> = {
  as?: T;
  variant?: GlassVariant;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Glass<T extends ElementType = "div">({
  as,
  variant = "default",
  className = "",
  ...props
}: GlassProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={`rounded-[var(--radius-lg)] ${variantClass[variant]} ${className}`}
      {...props}
    />
  );
}

type GlassButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariant: Record<GlassButtonVariant, string> = {
  primary:
    "glass-dark text-dhakaa-0 hover:bg-dhakaa-900/80 active:scale-[0.97]",
  secondary: "glass text-dhakaa-950 hover:glass-strong active:scale-[0.97]",
  ghost: "glass-subtle text-dhakaa-700 hover:glass active:scale-[0.97]",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-[transform,background,box-shadow] duration-150 ease-[var(--ease-out)]";

type GlassButtonProps<T extends ElementType> = {
  as?: T;
  variant?: GlassButtonVariant;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function GlassButton<T extends ElementType = "button">({
  as,
  variant = "primary",
  className = "",
  ...props
}: GlassButtonProps<T>) {
  const Component = as ?? "button";
  return (
    <Component
      className={`${buttonBase} ${buttonVariant[variant]} ${className}`}
      {...props}
    />
  );
}
