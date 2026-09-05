"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useRef } from "react";

interface Sponsor {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const highlightedSponsors: Sponsor[] = [
  {
    href: "https://taltech.ee",
    src: "/sponsors/taltech-color.png",
    alt: "Taltech (Tallinna Tehnikaülikool)",
    width: 192,
    height: 192,
  },
  {
    href: "https://www.redbull.com/ee-et/",
    src: "/sponsors/redbull-wordmark-trimmed.png",
    alt: "Red Bull",
    width: 3509,
    height: 2480,
  },
  {
    href: "https://www.stillframe.ee/",
    src: "/sponsors/still-frame-trimmed.png",
    alt: "Still Frame",
    width: 1335,
    height: 1617,
  },
  {
    href: "https://globalproductions.ee/",
    src: "/sponsors/Global-productions.svg",
    alt: "Global Productions",
    width: 244,
    height: 244,
  },
  {
    href: "https://www.tomorrow.ee/",
    src: "/sponsors/nt.png",
    alt: "Network Tomorrow",
    width: 300,
    height: 200,
  },
  {
    href: "https://arvutitark.ee/",
    src: "/sponsors/arvutitark.svg",
    alt: "Arvutitark",
    width: 344,
    height: 344,
  },
  {
    href: "https://www.alecoq.ee/",
    src: "/sponsors/alecoq.svg",
    alt: "A. Le Coq",
    width: 842,
    height: 595,
  },
  {
    href: "https://www.tallinn.ee/et/haridusamet",
    src: "/sponsors/Tallinna_Haridusamet_logo_RGB.svg",
    alt: "Tallinna Haridusamet",
    width: 244,
    height: 244,
  },
  {
    href: "https://balsnack.ee/",
    src: "/sponsors/balsnack.svg",
    alt: "Balsnack",
    width: 123,
    height: 48,
  },
  {
    href: "https://www.teamspeak.com/",
    src: "/sponsors/TS_InLine_BlueLight.svg",
    alt: "TeamSpeak",
    width: 344,
    height: 344,
  },
];

const sponsors: Sponsor[] = [
  // Gaming and technology
  {
    href: "https://k-space.ee/",
    src: "/sponsors/k-space_ee-white.png",
    alt: "K-Space",
    width: 244,
    height: 244,
    className: "not-dark:invert",
  },
  {
    href: "https://www.instagram.com/baltic_fighting_game_league/",
    src: "/sponsors/BFGL.png",
    alt: "BFGL",
    width: 192,
    height: 192,
  },
  {
    href: "https://www.simracing.ee/",
    src: "/sponsors/EVAL.png",
    alt: "EVAL",
    width: 200,
    height: 200,
  },
  {
    href: "https://www.linkedin.com/company/gamedev-guild/",
    src: "/sponsors/estonian-gamedev-guild-trimmed.png",
    alt: "Estonian Gamedev Guild",
    width: 244,
    height: 244,
    className: "not-dark:invert",
  },
  {
    href: "https://www.egda.ee/",
    src: "/sponsors/EGDA.png",
    alt: "Estonian Game Developers Association",
    width: 344,
    height: 344,
  },
  {
    href: "https://www.rara.ee/en/events/interactive-video-game-museum-lvlup/",
    src: "/sponsors/lvlup_logo_export.svg",
    alt: "LVLup! video games museum",
    width: 148,
    height: 90,
  },
  {
    href: "https://alzgamer.ee/",
    src: "/sponsors/alzgamer.png",
    alt: "AlzGamer",
    width: 200,
    height: 200,
  },
  {
    href: "https://ingame.ee/",
    src: "/sponsors/ingame.png",
    alt: "iNGAME",
    width: 164,
    height: 164,
  },
  {
    href: "https://2fast.ee/",
    src: "/sponsors/2fast-trimmed.png",
    alt: "2FAST",
    width: 244,
    height: 244,
  },

  // Activities and culture
  {
    href: "https://www.elamusgolf.eu/",
    src: "/sponsors/elamusgolf.png",
    alt: "Elamusgolf",
    width: 164,
    height: 164,
  },
  {
    href: "https://parkminigolf.ee/",
    src: "/sponsors/park_minigolf.png",
    alt: "Park Minigolf",
    width: 200,
    height: 200,
  },
  {
    href: "https://www.lemongym.ee/",
    src: "/sponsors/lemongym.png",
    alt: "Lemongym",
    width: 144,
    height: 144,
  },
  {
    href: "https://www.kino.ee/",
    src: "/sponsors/Artis_logo_white_text.png",
    alt: "Artis Kino",
    width: 344,
    height: 344,
  },
  {
    href: "https://www.tallinn.ee/et/mank",
    src: "/sponsors/mank-trimmed.png",
    alt: "Mustamäe Avatud Noortekeskus",
    width: 200,
    height: 244,
  },

  // Accommodation
  {
    href: "https://www.academichostel.com/en/",
    src: "/sponsors/academic-hostel.png",
    alt: "Academic Hostel",
    width: 524,
    height: 338,
  },

  // Food and drink
  {
    href: "https://retroburger.ee/",
    src: "/sponsors/retro-burger.png",
    alt: "Retro Burger",
    width: 1024,
    height: 1024,
  },
  {
    href: "https://pokebowl.ee/",
    src: "/sponsors/poke-bowl.png",
    alt: "Poké Bowl",
    width: 685,
    height: 432,
  },
  {
    href: "",
    src: "/sponsors/istar.jpg",
    alt: "iStar Kebab",
    width: 244,
    height: 244,
  },
];

interface SponsorsProps {
  showTitle?: boolean;
  className?: string;
}

const tickerSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
const tickerEaseDuration = 100;

interface FeaturedSponsorProps {
  sponsor: Sponsor;
}

function FeaturedSponsor({ sponsor }: FeaturedSponsorProps) {
  return (
    <NextLink
      href={sponsor.href}
      target="_blank"
      className="relative flex h-[80px] w-[120px] shrink-0 items-center justify-center sm:h-[110px] sm:w-[150px] md:h-[130px] md:w-[180px] lg:aspect-square lg:h-auto lg:w-full lg:max-w-48"
    >
      <Image
        src={sponsor.src}
        alt={sponsor.alt}
        fill
        sizes="(min-width: 1280px) 192px, (min-width: 1024px) 160px, (min-width: 768px) 180px, (min-width: 640px) 150px, 120px"
        className={`object-contain ${sponsor.className || ""}`}
      />
    </NextLink>
  );
}

export default function Sponsors({
  showTitle = true,
  className = "",
}: SponsorsProps) {
  const t = useTranslations();
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const tickerEaseFrameRef = useRef<number | null>(null);

  const easeTickerTo = (targetPlaybackRate: number) => {
    if (tickerEaseFrameRef.current !== null) {
      cancelAnimationFrame(tickerEaseFrameRef.current);
    }

    const animation = tickerTrackRef.current?.getAnimations()[0];
    if (!animation) return;

    const initialPlaybackRate = animation.playbackRate;
    const startTime = performance.now();

    const updatePlaybackRate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / tickerEaseDuration,
        1,
      );
      const easedProgress = (1 - Math.cos(Math.PI * progress)) / 2;
      const playbackRate =
        initialPlaybackRate +
        (targetPlaybackRate - initialPlaybackRate) * easedProgress;

      animation.updatePlaybackRate(playbackRate);

      if (progress < 1) {
        tickerEaseFrameRef.current = requestAnimationFrame(updatePlaybackRate);
      } else {
        tickerEaseFrameRef.current = null;
      }
    };

    tickerEaseFrameRef.current = requestAnimationFrame(updatePlaybackRate);
  };

  const handleTickerMouseEnter = () => easeTickerTo(0);
  const handleTickerMouseLeave = () => easeTickerTo(1);

  useEffect(() => {
    return () => {
      if (tickerEaseFrameRef.current !== null) {
        cancelAnimationFrame(tickerEaseFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`mx-auto flex w-full flex-col items-center gap-10 border-t-4 border-[#00A3E0]/50 px-4 pb-10 pt-11 sm:gap-12 sm:px-8 sm:pb-12 sm:pt-14 lg:gap-16 lg:px-12 lg:pb-16 lg:pt-[68px] ${vipnagorgialla.className} font-bold italic ${className}`}
    >
      {showTitle && (
        <h2 className="text-center text-2xl leading-none text-white uppercase sm:text-3xl lg:text-[40px]">
          {t("home.sections.poweredBy")}
        </h2>
      )}

      <div className="grid w-full max-w-[1216px] grid-cols-2 place-items-center gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-5 lg:gap-12 xl:gap-16">
        {highlightedSponsors.map((sponsor) => (
          <FeaturedSponsor key={sponsor.alt} sponsor={sponsor} />
        ))}
      </div>

      {showTitle && (
        <h2 className="text-center text-2xl leading-none text-white uppercase sm:text-3xl lg:text-[40px]">
          {t("home.sections.ourSponsors")}
        </h2>
      )}

      <div
        className="ticker-container relative mx-auto w-full max-w-[1824px] overflow-hidden py-8 sm:py-10 xl:flex-1 xl:py-4 2xl:py-6"
        onMouseEnter={handleTickerMouseEnter}
        onMouseLeave={handleTickerMouseLeave}
      >
        <div
          ref={tickerTrackRef}
          className="ticker-track flex w-max items-center gap-8 px-8 sm:gap-10 sm:px-10 md:gap-12 xl:gap-16 xl:px-14 2xl:gap-20 2xl:px-20"
        >
          {tickerSponsors.map((sponsor, index) => (
            <NextLink
              key={`${sponsor.alt}-${index}`}
              href={sponsor.href}
              target="_blank"
              className="relative flex size-[120px] shrink-0 items-center justify-center sm:size-[150px] md:size-[180px] lg:size-48"
              aria-hidden={index >= sponsors.length}
              tabIndex={index >= sponsors.length ? -1 : undefined}
            >
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                fill
                sizes="(min-width: 768px) 192px, (min-width: 640px) 150px, 120px"
                className={`object-contain ${sponsor.className || ""}`}
              />
            </NextLink>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-container {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .ticker-track {
          animation: sponsors-ticker 31s linear infinite;
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
    </section>
  );
}
