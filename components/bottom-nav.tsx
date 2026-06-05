"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/";

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-3.5"
    >
      <div className="glass-dark pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
        <Link
          href="/"
          aria-label="Home"
          aria-current={homeActive ? "page" : undefined}
          className={`flex items-center justify-center rounded-full p-2.5 transition-[background,color,transform] duration-150 ease-out active:scale-[0.97] ${
            homeActive
              ? "bg-dhakaa-0 text-dhakaa-950"
              : "text-dhakaa-300 hover:bg-white/8 hover:text-dhakaa-50"
          }`}
        >
          <Image
            src="/icon.svg"
            alt=""
            width={22}
            height={22}
            className={`h-[22px] w-[22px] ${homeActive ? "" : "invert opacity-70"}`}
          />
        </Link>

        <div className="mx-1 h-5 w-px bg-white/10" aria-hidden />

        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-[background,color,transform] duration-150 ease-out active:scale-[0.97] ${
                active
                  ? "bg-dhakaa-0 text-dhakaa-950"
                  : "text-dhakaa-300 hover:bg-white/8 hover:text-dhakaa-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
