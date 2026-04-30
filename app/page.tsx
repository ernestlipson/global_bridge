import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { UniversityMarquee } from "@/components/landing/UniversityMarquee";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Destinations } from "@/components/landing/Destinations";
import { Events } from "@/components/landing/Events";
import { Testimonials } from "@/components/landing/Testimonials";
import { CommunityJoin } from "@/components/landing/CommunityJoin";
import { CTA } from "@/components/landing/CTA";
import { AiBrain01Icon } from "hugeicons-react";

export default function Home() {
  return (
    <>
      <Navbar showBookConsultation />
      <main>
        <Hero />
        <UniversityMarquee />
        <Services />
        <HowItWorks />
        <Destinations />
        <Events />
        <Testimonials />
        <CommunityJoin />
        <CTA />
      </main>
      <Footer />

      {/* Floating AI Chat Button */}
      <Link
        href="/chat"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
        aria-label="Open AI Chat"
      >
        <AiBrain01Icon size={22} />
      </Link>
    </>
  );
}
