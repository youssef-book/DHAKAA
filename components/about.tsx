import { Process } from "@/components/process";

export function About() {
  return (
    <>
      <section className="px-6 pb-20 pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400">
            About us
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-dhakaa-950 sm:text-4xl">
            We build software for companies that know their business — not
            startups chasing trends
          </h1>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-dhakaa-500">
            <p>
              DHAKAA is a development agency focused on one thing: custom
              premium software for established companies. The kind of
              organizations that have been running for decades, with workflows
              built over years of real operations.
            </p>
            <p>
              We don&apos;t sell templates or force-fit SaaS products. We embed
              with your team, understand how things actually work, and build
              software that fits — then evolve it as your business grows.
            </p>
          </div>
        </div>
      </section>
      <Process />
    </>
  );
}
