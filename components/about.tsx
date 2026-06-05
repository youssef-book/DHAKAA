import { AboutBentoCard } from "@/components/about-bento-cell";
import { AboutBentoGrid } from "@/components/about-bento-grid";
import { AboutIntro } from "@/components/about-intro";
import { AboutLogoCell } from "@/components/about-logo-cell";

const bentoCards = [
  {
    label: "Vision",
    title: "Software that feels native to the business.",
    body: "We study how teams actually operate, then design tools around those real workflows.",
    className:
      "bg-dhakaa-950 text-dhakaa-0 hover:bg-dhakaa-900 sm:col-span-2 lg:col-span-1 lg:row-span-2",
    labelClassName: "text-dhakaa-500 group-hover:text-dhakaa-400",
    bodyClassName: "text-dhakaa-400",
  },
  {
    label: "Statement",
    title: "Premium custom builds, not forced templates.",
    body: "Every interface, system, and integration is shaped for established companies with serious operations.",
    className: "bg-dhakaa-900 text-dhakaa-0 hover:bg-dhakaa-800",
    labelClassName: "text-dhakaa-500 group-hover:text-dhakaa-400",
    bodyClassName: "text-dhakaa-400",
  },
  {
    label: "Location",
    title: "Remote-first, built close to your team.",
    body: "DHAKAA partners across locations and works inside your cadence from discovery to long-term evolution.",
    className: "bg-dhakaa-100 text-dhakaa-950 hover:bg-dhakaa-50",
    labelClassName: "text-dhakaa-400 group-hover:text-dhakaa-500",
    bodyClassName: "text-dhakaa-500",
  },
];

export function About() {
  return (
    <section className="bg-dhakaa-50 text-dhakaa-950 lg:min-h-screen">
      <div className="grid lg:grid-cols-[minmax(0,38%)_1fr] lg:items-stretch">
        <div className="relative lg:min-h-screen">
          <AboutIntro />
        </div>

        <AboutBentoGrid>
          <AboutLogoCell />

          {bentoCards.map((card) => (
            <AboutBentoCard key={card.label} {...card} />
          ))}
        </AboutBentoGrid>
      </div>
    </section>
  );
}
