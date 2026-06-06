"use client";

import { type FormEvent, useEffect, useState } from "react";
import { GlassButton } from "@/components/ui/glass";

type ContactFormPanelProps = {
  onClose: () => void;
  open?: boolean;
};

export function ContactFormPanel({ onClose, open = true }: ContactFormPanelProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      company ? `Project inquiry — ${company}` : "Project inquiry",
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
    );

    window.location.href = `mailto:hello@dhakaa.com?subject=${subject}&body=${body}`;
  };

  const fieldClassName =
    "w-full border-0 bg-transparent px-0 py-2 text-sm text-dhakaa-950 placeholder:text-dhakaa-400 focus:outline-none";

  const fieldCellClassName =
    "relative flex flex-col gap-2 bg-dhakaa-0 p-6 transition-[box-shadow] duration-150 ease-[var(--ease-out)] focus-within:z-10 focus-within:shadow-[inset_0_0_0_2px_#2563eb] focus-within:[&>span]:text-blue-700 lg:p-6";

  return (
    <div className="relative h-svh max-h-svh w-full overflow-hidden bg-dhakaa-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(9, 9, 11, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 9, 11, 0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative grid h-full w-full lg:grid-cols-[minmax(0,38%)_1fr]">
        <aside className="flex min-h-0 flex-col justify-between overflow-y-auto border-b border-dhakaa-200 bg-dhakaa-50 px-6 pt-6 pb-8 lg:border-b-0 lg:border-r lg:px-8 lg:pt-8 lg:pb-8">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-medium text-dhakaa-500 transition-colors duration-150 ease-[var(--ease-out)] hover:text-dhakaa-950"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M10 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to contact
            </button>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400">
              Message
            </p>
            <h2 className="font-display mt-4 max-w-[17rem] text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-dhakaa-950 sm:max-w-xs sm:text-2xl lg:text-[1.65rem]">
              Tell us about your project
            </h2>
            <p className="font-subtitle mt-4 max-w-[17rem] text-sm font-normal leading-[1.6] tracking-[0.005em] text-dhakaa-500 sm:max-w-xs sm:text-[0.9375rem]">
              Share a few details and we&apos;ll get back within one business
              day.
            </p>
          </div>

          <p className="mt-8 text-xs text-dhakaa-400">
            Press{" "}
            <kbd className="border border-dhakaa-300 bg-dhakaa-0 px-1.5 py-0.5 font-mono text-[10px] text-dhakaa-600">
              Esc
            </kbd>{" "}
            to return
          </p>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto pb-24 sm:grid-cols-2 lg:grid-rows-[auto_auto_minmax(0,1fr)_auto] lg:overflow-hidden lg:pb-0"
        >
          <label className={`${fieldCellClassName} sm:col-span-1 lg:row-start-1`}>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-dhakaa-500">
              Name
            </span>
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClassName}
              placeholder="Your name"
            />
          </label>

          <label className={`${fieldCellClassName} sm:col-span-1 lg:row-start-1`}>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-dhakaa-500">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClassName}
              placeholder="you@company.com"
            />
          </label>

          <label className={`${fieldCellClassName} sm:col-span-2 lg:row-start-2`}>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-dhakaa-500">
              Company
            </span>
            <input
              type="text"
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className={fieldClassName}
              placeholder="Company name"
            />
          </label>

          <label
            className={`${fieldCellClassName} min-h-0 sm:col-span-2 lg:row-start-3 lg:min-h-0`}
          >
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-dhakaa-500">
              Message
            </span>
            <textarea
              required
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${fieldClassName} min-h-32 flex-1 resize-none lg:min-h-0`}
              placeholder="What are you building? Timeline, team size, constraints..."
            />
          </label>

          <div className="flex shrink-0 flex-col gap-3 bg-dhakaa-950 px-6 py-4 text-dhakaa-0 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between lg:row-start-4 lg:px-8 lg:py-5">
            <p className="text-xs text-dhakaa-400">
              Or email us at{" "}
              <a
                href="mailto:hello@dhakaa.com"
                className="text-dhakaa-200 underline-offset-2 hover:text-blue-300 hover:underline"
              >
                hello@dhakaa.com
              </a>
            </p>
            <GlassButton type="submit" variant="primary" className="sm:shrink-0">
              Send message
            </GlassButton>
          </div>
        </form>
      </div>
    </div>
  );
}
