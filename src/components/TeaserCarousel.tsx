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
  href: "/turniirid" | "/piletid" | "/messiala";
};

const slides: Slide[] = [
  { key: "compete", image: "/images/landing/compete_teaser.jpg", imageAlt: "Võistle", href: "/turniirid" },
  { key: "play", image: "/images/landing/play_teaser.png", imageAlt: "Mängi", href: "/piletid" },
  { key: "explore", image: "/images/landing/explore_teaser.png", imageAlt: "Avasta", href: "/messiala" },
];

export default function TeaserCarousel() {
  const t = useTranslations("home.teaser");
  const [current, setCurrent] = useState(0);

  const slide = slides[current];
  const title = t(`${slide.key}.title`);
  const description = t(`${slide.key}.description`);
  const prize = t.raw(`${slide.key}.prize`) as string | null;

  return (
    <div className="border-b-3 border-[#1F5673]">
      {/* Card */}
      <div className="relative h-[729px] overflow-hidden">
        {/* Background image */}
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0E0F19]/70" />

        {/* Content grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] h-full">
          {/* Left: text */}
          <div className="flex flex-col justify-between gap-4 px-8 py-8 md:px-12 md:py-10">
            <div className="flex flex-col gap-3">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-[clamp(1.1rem,0.9rem+1vw,1.75rem)] text-[#EEE5E5]`}
              >
                {t("heading")}
              </h2>
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
            {prize && (
              <p
                className={`${vipnagorgialla.className} font-bold italic text-[clamp(1.5rem,1.2rem+1.5vw,2.75rem)] text-[#00A3E0]`}
              >
                {prize}
              </p>
            )}
          </div>

          {/* Right: spacer (image shows through the overlay) */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 py-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current
                ? "bg-[#007CAB]"
                : "bg-[#1F5673] hover:bg-[#007CAB]/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
