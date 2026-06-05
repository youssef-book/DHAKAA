const steps = [
  {
    step: "Discover",
    detail:
      "We embed with your team to map workflows, pain points, and constraints.",
  },
  {
    step: "Design",
    detail:
      "Architecture and interfaces shaped by how people actually work — not trends.",
  },
  {
    step: "Build",
    detail:
      "Iterative delivery with your stakeholders in the loop at every milestone.",
  },
  {
    step: "Evolve",
    detail:
      "Long-term partnership. Software that grows as your business does.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-dhakaa-950 px-6 py-28 text-dhakaa-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-dhakaa-500">
            Our process
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From legacy thinking to living software
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((item, i) => (
            <div key={item.step}>
              <span className="font-mono text-xs text-dhakaa-600">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-base font-semibold">{item.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dhakaa-400">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
