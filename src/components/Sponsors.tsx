"use client";

import { useState, useEffect, useCallback } from "react";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";

interface Sponsor {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const sponsors: Sponsor[] = [
  {
    href: "https://taltech.ee",
    src: "/sponsors/taltech-color.png",
    alt: "Taltech (Tallinna Tehnikaülikool)",
    width: 192,
    height: 192,
  },
  {
    href: "https://www.redbull.com/ee-et/",
    src: "/sponsors/redbull.png",
    alt: "Redbull",
    width: 80,
    height: 80,
  },
  {
    href: "https://www.simracing.ee/",
    src: "/sponsors/EVAL.png",
    alt: "EVAL",
    width: 200,
    height: 200,
  },
  {
    href: "https://www.facebook.com/bfglOfficial",
    src: "/sponsors/BFGL.png",
    alt: "BFGL",
    width: 192,
    height: 192,
  },
  {
    href: "https://www.tomorrow.ee/",
    src: "/sponsors/nt.png",
    alt: "Network Tomorrow",
    width: 300,
    height: 200,
  },
  {
    href: "https://k-space.ee/",
    src: "/sponsors/k-space_ee-white.png",
    alt: "K-Space",
    width: 200,
    height: 200,
    className: "not-dark:invert",
  },
  {
    href: "https://globalproductions.ee/",
    src: "/sponsors/Global-productions.png",
    alt: "Global Productions",
    width: 200,
    height: 200,
  },
  {
    href: "https://www.linkedin.com/company/gamedev-guild/",
    src: "/sponsors/estonian_gamedev_guild.png",
    alt: "Estonian Gamedev Guild",
    width: 200,
    height: 200,
    className: "not-dark:invert",
  },
  {
    href: "https://alzgamer.ee/",
    src: "/sponsors/alzgamer.png",
    alt: "AlzGamer",
    width: 200,
    height: 200,
  },
];

// Split sponsors into slides (6 per slide)
const SPONSORS_PER_SLIDE = 6;
const slides: Sponsor[][] = [];
for (let i = 0; i < sponsors.length; i += SPONSORS_PER_SLIDE) {
  slides.push(sponsors.slice(i, i + SPONSORS_PER_SLIDE));
}

interface SponsorsProps {
  showTitle?: boolean;
  className?: string;
}

export default function Sponsors({
  showTitle = true,
  className = "",
}: SponsorsProps) {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div
      className={`flex flex-col max-w-[1920px] xl:h-[414px] mx-auto ${vipnagorgialla.className} font-bold italic border-[#1F5673] ${className}`}
    >
      {showTitle && (
        <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] text-[#2A2C3F] px-12 pt-8 pb-4">
          {t("home.sections.poweredBy")}
        </h3>
      )}

      {/* Carousel container */}
      <div className="relative xl:flex-1 overflow-x-hidden overflow-y-visible">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slideSponsors, slideIndex) => (
            <div
              key={slideIndex}
              className="flex-none w-full xl:h-full grid grid-cols-2 sm:grid-cols-3 place-items-center gap-6 px-6 py-6 xl:flex xl:items-center xl:justify-center xl:gap-12 xl:px-12 xl:py-0"
            >
              {slideSponsors.map((sponsor, i) => (
                <NextLink
                  key={i}
                  href={sponsor.href}
                  target="_blank"
                  className="flex items-center justify-center w-full"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={sponsor.width}
                    height={sponsor.height}
                    className={`object-contain max-h-[80px] max-w-[120px] sm:max-h-[110px] sm:max-w-[150px] md:max-h-[130px] md:max-w-[180px] lg:max-h-[140px] lg:max-w-[200px] xl:max-h-[180px] xl:max-w-[240px] ${sponsor.className || ""}`}
                  />
                </NextLink>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 py-4">
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
  );
}
