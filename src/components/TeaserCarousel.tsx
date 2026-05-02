"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";

type Slide = {
  key: "compete" | "play" | "explore";
  image: string;
  imageAlt: string;
  hero: string;
  href: "/turniirid" | "/piletid" | "/messiala";
  flip?: boolean;
  fullBrightness?: boolean;
};

// Helper to highlight "LAN" in "TIPILAN" with blue color
function highlightLAN(text: string) {
  const parts = text.split(/(TIPILAN\w*)/gi);
  return parts.map((part, i) => {
    const upper = part.toUpperCase();
    if (upper.startsWith("TIPILAN")) {
      const suffix = part.slice(7); // Everything after "TIPILAN"
      return (
        <span key={i}>
          TIPI<span className="text-[#00A3E0]">LAN</span>
          {suffix.toUpperCase()}
        </span>
      );
    }
    return part;
  });
}

const slides: Slide[] = [
  {
    key: "compete",
    image: "/images/landing/compete_teaser.jpg",
    imageAlt: "Võistle",
    hero: "/images/landing/compete_hero.png",
    href: "/turniirid",
  },
  {
    key: "play",
    image: "/images/landing/play_teaser.png",
    imageAlt: "Mängi",
    hero: "/images/landing/play_hero.png",
    href: "/piletid",
    flip: true,
    fullBrightness: true,
  },
  {
    key: "explore",
    image: "/images/landing/explore_teaser.png",
    imageAlt: "Avasta",
    hero: "/images/landing/explore_hero.png",
    href: "/messiala",
    fullBrightness: true,
  },
];

export default function TeaserCarousel() {
  const t = useTranslations("home.teaser");
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="border-b-3 border-[#1F5673]">
      {/* Sliding track */}
      <div className="relative h-[729px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => {
            const title = t(`${slide.key}.title`);
            const description = t(`${slide.key}.description`);
            return (
              <div key={slide.key} className="relative flex-none w-full h-full">
                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover object-center"
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 ${slide.fullBrightness ? "" : "bg-gradient-to-r from-[#0E0F19]/90 via-[#0E0F19]/60 to-[#0E0F19]/20"}`}
                />

                {/* Content */}
                <div
                  className={`relative grid grid-cols-1 md:grid-cols-2 h-full ${slide.flip ? "md:[direction:rtl]" : ""}`}
                >
                  <div
                    className={`flex flex-col justify-between px-8 py-8 md:px-12 md:py-10 ${slide.flip ? "md:[direction:ltr]" : ""}`}
                  >
                    {/* Heading at top */}
                    <h2
                      className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,1.5rem+4.5vw,4rem)] md:text-[64px] leading-none tracking-normal uppercase text-[#EEE5E5]`}
                    >
                      {highlightLAN(t("heading"))}
                    </h2>
                    {/* Title + description at bottom */}
                    <div className="flex flex-col gap-3 pb-16">
                      <Link href={slide.href}>
                        <h3
                          className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2.5vw,5rem)] leading-none text-[#EEE5E5] hover:text-[#00A3E0] transition`}
                        >
                          {title}
                        </h3>
                      </Link>
                      <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.1rem)] text-[#EEE5E5] max-w-prose">
                        {description}
                      </p>
                    </div>
                  </div>
                  {/* Hero image */}
                  <div
                    className={`hidden md:block relative ${slide.flip ? "md:[direction:ltr]" : ""}`}
                  >
                    <Image
                      src={slide.hero}
                      alt={slide.imageAlt}
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition z-20"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition z-20"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-20 px-3 py-2 bg-[#0E0F19]/50 backdrop-blur-md">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current
                  ? "bg-[#00A3E0]"
                  : "bg-[#1F5673] hover:bg-[#007CAB]/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
