import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About — DHAKAA",
  description:
    "DHAKAA builds custom premium software for established companies.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
