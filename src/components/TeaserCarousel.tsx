"use client";

import { useState } from "react";
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
};

const slides: Slide[] = [
  { key: "compete", image: "/images/landing/compete_teaser.jpg", imageAlt: "Võistle", hero: "/images/landing/compete_hero.png", href: "/turniirid" },
  { key: "play",    image: "/images/landing/play_teaser.png",    imageAlt: "Mängi",   hero: "/images/landing/play_hero.png",    href: "/piletid"   },
  { key: "explore", image: "/images/landing/explore_teaser.png", imageAlt: "Avasta",  hero: "/images/landing/explore_hero.png", href: "/messiala"  },
];

export default function TeaserCarousel() {
  const t = useTranslations("home.teaser");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="border-b-3 border-[#1F5673]">
      {/* Sliding track */}
      <div className="relative h-[729px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => {
            const title       = t(`${slide.key}.title`);
            const description = t(`${slide.key}.description`);
            const prize       = t.raw(`${slide.key}.prize`) as string | null;

            return (
              <div key={slide.key} className="relative flex-none w-full h-full">
                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover object-center"
                />
                {/* Gradient: dark on left, fades out on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E0F19]/90 via-[#0E0F19]/60 to-[#0E0F19]/20" />

                {/* Content */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="flex flex-col justify-between gap-4 px-8 py-8 md:px-12 md:py-10">
                    <div className="flex flex-col gap-3">
                      <h2 className={`${vipnagorgialla.className} font-bold italic text-[clamp(1.1rem,0.9rem+1vw,1.75rem)] text-[#EEE5E5]`}>
                        {t("heading")}
                      </h2>
                      <Link href={slide.href}>
                        <h3 className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2.5vw,5rem)] leading-none text-[#EEE5E5] hover:text-[#00A3E0] transition`}>
                          {title}
                        </h3>
                      </Link>
                      <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.1rem)] text-[#EEE5E5] max-w-prose">
                        {description}
                      </p>
                    </div>
                    {prize && (
                      <p className={`${vipnagorgialla.className} font-bold italic text-[clamp(1.5rem,1.2rem+1.5vw,2.75rem)] text-[#00A3E0]`}>
                        {prize}
                      </p>
                    )}
                  </div>
                  {/* Right side: hero image */}
                  <div className="hidden md:flex items-end justify-center relative">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0E0F19]/50 hover:bg-[#007CAB] text-[#EEE5E5] transition"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 py-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-[#007CAB]" : "bg-[#1F5673] hover:bg-[#007CAB]/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
