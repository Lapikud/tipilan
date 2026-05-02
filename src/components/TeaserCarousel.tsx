"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const restartAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    restartAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [restartAutoplay]);

  const headingOnRight = Boolean(slides[current]?.flip);

  return (
    <div className="border-b-3 border-[#1F5673]">
      {/* Slides (fade transition + hero lift effect) */}
      <div className="relative h-[729px] overflow-hidden">
        {slides.map((slide, i) => {
          const title = t(`${slide.key}.title`);
          const description = t(`${slide.key}.description`);
          const isActive = i === current;

          return (
            <div
              key={slide.key}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
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
                  className={`flex flex-col justify-end px-8 py-8 md:px-12 md:py-10 ${slide.flip ? "md:[direction:ltr]" : ""}`}
                >
                  {/* Title + description at bottom */}
                  <div
                    className={`flex flex-col gap-3 pb-16 ${slide.flip ? "md:items-end md:text-right md:ml-auto" : ""}`}
                  >
                    <Link href={slide.href}>
                      <h3
                        className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2.5vw,5rem)] leading-none text-[#EEE5E5] hover:text-[#00A3E0] transition`}
                      >
                        {title}
                      </h3>
                    </Link>
                    <p
                      className={`text-[1.1rem] leading-relaxed md:text-[clamp(0.875rem,0.75rem+0.5vw,1.1rem)] text-[#EEE5E5] max-w-prose ${slide.flip ? "md:text-right" : ""}`}
                    >
                      {description}
                    </p>
                  </div>
                </div>

                {/* Hero image */}
                <div
                  className={`hidden md:block relative overflow-hidden ${slide.flip ? "md:[direction:ltr]" : ""}`}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out"
                    style={{
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(110%)",
                    }}
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
            </div>
          );
        })}

        {/* Floating heading (mobile) */}
        <div className="absolute top-5 inset-x-0 px-8 z-20 md:hidden pointer-events-none">
          <h2
            className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+4.6vw,3rem)] leading-[0.95] tracking-normal uppercase text-[#EEE5E5] whitespace-normal break-words text-left max-w-[12ch]`}
          >
            {highlightLAN(t("heading"))}
          </h2>
        </div>

        {/* Floating heading (desktop/tablet) */}
        <div className="absolute top-8 inset-x-0 px-4 sm:px-6 md:px-12 z-20 hidden md:flex pointer-events-none">
          <div
            className="transition-[flex-grow] duration-700 ease-out"
            style={{ flexGrow: headingOnRight ? 1 : 0 }}
          />
          <h2
            className={`${vipnagorgialla.className} font-bold italic text-[64px] leading-none tracking-normal uppercase text-[#EEE5E5] whitespace-normal [overflow-wrap:anywhere] text-center shrink`}
          >
            {highlightLAN(t("heading"))}
          </h2>
          <div
            className="transition-[flex-grow] duration-700 ease-out"
            style={{ flexGrow: headingOnRight ? 0 : 1 }}
          />
        </div>

        {/* Arrow buttons */}
        <button
          onClick={() => {
            prev();
            restartAutoplay();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition z-20"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={() => {
            next();
            restartAutoplay();
          }}
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
              onClick={() => {
                setCurrent(i);
                restartAutoplay();
              }}
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
