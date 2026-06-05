import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-[#040710]"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-5 pb-20 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <Image
              src="/logo.svg"
              alt="DHAKAA"
              width={96}
              height={20}
              className="h-3.5 w-auto brightness-0 invert opacity-80"
            />
            <p className="font-subtitle max-w-xs text-left text-xs leading-snug tracking-[0.005em] text-dhakaa-500">
              Custom premium software for established companies.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <nav
              aria-label="Footer"
              className="flex flex-wrap justify-end gap-x-5 gap-y-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-dhakaa-400 transition-colors duration-150 ease-out hover:text-blue-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-right text-xs text-dhakaa-600">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
