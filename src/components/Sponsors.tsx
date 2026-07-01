"use client";

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
    href: "https://www.instagram.com/baltic_fighting_game_league/",
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

interface SponsorsProps {
  showTitle?: boolean;
  className?: string;
}

const tickerSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

export default function Sponsors({
  showTitle = true,
  className = "",
}: SponsorsProps) {
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col w-full xl:h-[414px] mx-auto ${vipnagorgialla.className} font-bold italic border-[#1F5673] ${className}`}
    >
      {showTitle && (
        <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] text-[#2A2C3F] uppercase text-center px-12 pt-8 pb-4">
          {t("home.sections.poweredBy")}
        </h3>
      )}

      <div className="relative xl:flex-1 overflow-hidden py-8 sm:py-10 xl:py-4 2xl:py-6">
        <div className="ticker-track flex items-center w-max gap-8 sm:gap-10 md:gap-12 xl:gap-16 2xl:gap-20 px-8 sm:px-10 xl:px-14 2xl:px-20">
          {tickerSponsors.map((sponsor, index) => (
            <NextLink
              key={`${sponsor.alt}-${index}`}
              href={sponsor.href}
              target="_blank"
              className="flex items-center justify-center shrink-0"
              aria-hidden={index >= sponsors.length}
              tabIndex={index >= sponsors.length ? -1 : undefined}
            >
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                width={sponsor.width}
                height={sponsor.height}
                className={`object-contain max-h-[80px] max-w-[120px] sm:max-h-[110px] sm:max-w-[150px] md:max-h-[130px] md:max-w-[180px] lg:max-h-[140px] lg:max-w-[200px] xl:max-h-[180px] xl:max-w-[240px] 2xl:max-h-[210px] 2xl:max-w-[280px] ${sponsor.className || ""}`}
              />
            </NextLink>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: sponsors-ticker 36s linear infinite;
          will-change: transform;
        }

        @keyframes sponsors-ticker {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  );
}
