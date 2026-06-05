import { GlassButton } from "@/components/ui/glass";

export function ContactPage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 pb-20 pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-dhakaa-950 sm:text-4xl">
          Ready to build something that fits?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-dhakaa-500 sm:text-base">
          Tell us about your company and what you need. We&apos;ll schedule a
          discovery call to see if we&apos;re the right fit.
        </p>
        <div className="mt-8">
          <GlassButton as="a" href="mailto:hello@dhakaa.com" variant="primary">
            hello@dhakaa.com
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
