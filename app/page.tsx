import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { UniversityMarquee } from "@/components/landing/UniversityMarquee";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Destinations } from "@/components/landing/Destinations";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <UniversityMarquee />
        <Services />
        <HowItWorks />
        <Destinations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
