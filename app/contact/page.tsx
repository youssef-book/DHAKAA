import { ContactPage } from "@/components/contact-page";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Contact — DHAKAA",
  description: "Get in touch with DHAKAA to start your project.",
};

export default function ContactRoute() {
  return (
    <>
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
