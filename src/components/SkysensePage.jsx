"use client";
import HeroSection from "@/components/detailedSections/HeroSection";
import GallerySection from "@/components/GallerySection";
import ProblemSection from "@/components/ProblemSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SpecsSection from "@/components/SpecsSection";
import TelemetrySection from "@/components/TelemetrySection";
import FlowSection from "@/components/FlowSection";
import CommsSection from "@/components/CommsSection";
import RotationSection from "@/components/RotationSection";
import SoftwareSection from "@/components/SoftwareSection";
import TestingSection from "@/components/TestingSection";
import FooterSection from "@/components/FooterSection";

export default function SkysensePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --font-bebas-neue: 'Bebas Neue', sans-serif;
          --font-dm-mono: 'DM Mono', monospace;
          --font-space-grotesk: 'Space Grotesk', sans-serif;
        }
        html { scroll-behavior: smooth; }
        body { background: #06060a; color: #fff; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
      <HeroSection />
      <GallerySection />
      <ProblemSection />
      <ArchitectureSection />
      <SpecsSection />
      
      <FlowSection />
      <CommsSection />
      <RotationSection />
      <SoftwareSection />
      <TestingSection />
      <FooterSection />
    </>
  );
}
