const solutions = [
  {
    title: "Custom SaaS Platforms",
    description:
      "End-to-end product development — from discovery and architecture to launch and iteration.",
    tag: "01",
  },
  {
    title: "Internal Operations Tools",
    description:
      "Replace spreadsheets and duct-taped workflows with software your team actually wants to use.",
    tag: "02",
  },
  {
    title: "Legacy Modernization",
    description:
      "Migrate aging systems to modern stacks without disrupting the business that depends on them.",
    tag: "03",
  },
];

export function Solutions() {
  return (
    <section className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-400">
            Solutions
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-dhakaa-950 sm:text-4xl">
            Built around your operations
          </h1>
          <p className="mt-4 text-base leading-relaxed text-dhakaa-500">
            Every engagement starts with how your business runs today — then
            builds toward where it needs to go.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {solutions.map((solution) => (
            <div key={solution.tag}>
              <span className="font-mono text-xs text-dhakaa-300">
                {solution.tag}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-dhakaa-950">
                {solution.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dhakaa-500">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
