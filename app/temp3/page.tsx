import { Footer } from "@/components/footer";
import { DarkHero3 } from "@/components/dark-hero-3";

export const metadata = {
  title: "Dark Hero Concept 3 — DHAKAA",
  description: "A dark theme version of the temp2 homepage concept for DHAKAA.",
};

export default function Temp3Page() {
  return (
    <>
      <main>
        <DarkHero3 />
      </main>
      <Footer theme="dark" />
    </>
  );
}
