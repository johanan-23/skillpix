import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./components/hero-section";
import EducationProblemsSection from "./components/education-problems-section";
import NewMethodologySection from "./components/new-methodology-section";
import HowItWorksSection from "./components/how-it-works-section";
import ComplementSection from "./components/complement-section";
import FeaturesSection from "./components/features-section";
import BenefitsSection from "./components/benefits-section";
import Header from "./components/header";
import Footer from "./components/footer";
import PlacementTrainingSection from "./components/placement-training";

const FaqSection = dynamic(() => import("./components/faq-section"), {
  ssr: true,
  loading: () => (
    <div className="min-h-[200px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
  ),
});
const ContactSection = dynamic(() => import("./components/contact-section"), {
  ssr: true,
  loading: () => (
    <div className="min-h-[200px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
  ),
});
const Chatbot = dynamic(() => import("./components/chatbot"), { ssr: true });
const CtaSection = dynamic(() => import("./components/cta-section"), {
  ssr: true,
  loading: () => (
    <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
  ),
});
const InnovationFundSection = dynamic(
  () => import("./components/innovation-fund-section"),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
    ),
  }
);
const ScrollToTop = dynamic(() => import("./components/scroll-to-top"), {
  ssr: true,
  loading: () => (
    <div className="h-16 w-full animate-pulse bg-muted/30 rounded-xl my-4" />
  ),
});

export default async function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        <Header />
        <HeroSection />
        <EducationProblemsSection />
        <NewMethodologySection />
        <HowItWorksSection />
        <ComplementSection />
        <FeaturesSection />
        <BenefitsSection />
        <PlacementTrainingSection />
        <Suspense
          fallback={
            <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
          }
        >
          {" "}
          <InnovationFundSection />{" "}
        </Suspense>
        <Suspense
          fallback={
            <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
          }
        >
          {" "}
          <FaqSection />{" "}
        </Suspense>
        <Suspense
          fallback={
            <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
          }
        >
          {" "}
          <ContactSection />{" "}
        </Suspense>
        <Suspense
          fallback={
            <div className="min-h-[120px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
          }
        >
          {" "}
          <CtaSection />{" "}
        </Suspense>
        <Suspense
          fallback={
            <div className="min-h-[80px] w-full animate-pulse bg-muted/30 rounded-xl my-8" />
          }
        >
          {" "}
          <Footer />{" "}
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      <ScrollToTop />
    </main>
  );
}
