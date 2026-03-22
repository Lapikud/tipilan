"use client";

import { useRef } from "react";
import HeroSection from "@/components/teaser/HeroSection";
import CarouselSection from "@/components/teaser/CarouselSection";
import EndSection from "@/components/teaser/EndSection";
import Footer from "@/components/teaser/Footer";

export default function TeaserPage() {
  const carouselRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-bg-dark w-full">
      {/* Main wrapper with bottom border (desktop) */}
      <div className="lg:border-b-4 lg:border-primary-50">
        <HeroSection onScrollDown={handleScrollDown} />
        <CarouselSection sectionRef={carouselRef} />
        <EndSection />
      </div>
      <Footer />
    </div>
  );
}
