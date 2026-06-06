import { Footer } from "@/components/footer";
import { LightHero } from "@/components/light-hero";

export const metadata = {
  title: "Light Hero Concept — DHAKAA",
  description: "A temporary light theme homepage concept for DHAKAA.",
};

export default function TempPage() {
  return (
    <>
      <main>
        <LightHero />
      </main>
      <Footer />
    </>
  );
}
