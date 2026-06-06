import { AboutBentoCard } from "@/components/about-bento-cell";
import { AboutBentoGrid } from "@/components/about-bento-grid";
import { AboutGridPanel } from "@/components/about-grid-panel";
import { AboutIntro } from "@/components/about-intro";
import { AboutLogoCell } from "@/components/about-logo-cell";

const bentoText = {
  labelClassName: "text-slate-500",
  bodyClassName: "text-dhakaa-600",
};

const bentoCards = [
  {
    label: "Vision",
    title: "Software that feels native to the business.",
    body: "We study how teams actually operate, then design tools around those real workflows.",
    className: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
    lamp: "left-bottom" as const,
    ...bentoText,
  },
  {
    label: "Statement",
    title: "Premium custom builds, not forced templates.",
    body: "Every interface, system, and integration is shaped for established companies with serious operations.",
    className: "",
    ...bentoText,
  },
  {
    label: "Location",
    title: "Remote-first, built close to your team.",
    body: "DHAKAA partners across locations and works inside your cadence from discovery to long-term evolution.",
    className: "",
    glassVariant: "muted" as const,
    ...bentoText,
  },
];

export function About() {
  return (
    <section className="bg-white text-dhakaa-950 lg:min-h-screen">
      <div className="grid lg:grid-cols-[minmax(0,38%)_1fr] lg:items-stretch">
        <div className="relative lg:min-h-screen">
          <AboutIntro />
        </div>

        <AboutGridPanel>
          <AboutBentoGrid className="h-full gap-1.5 p-2 sm:gap-2 sm:p-2">
            <AboutLogoCell />

            {bentoCards.map((card) => (
              <AboutBentoCard key={card.label} {...card} />
            ))}
          </AboutBentoGrid>
        </AboutGridPanel>
      </div>
    </section>
  );
}
