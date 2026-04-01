"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useCountdown } from "@/hooks/useCountdown";
import { EVENT_DATE } from "./constants";
import { BLUR_PLACEHOLDERS } from "@/lib/blurPlaceholders";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const t = useTranslations();
  const countdown = useCountdown(EVENT_DATE);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative min-h-dvh content-center max-h-min w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/backgrounds/hero_teaser.webp"
        alt=""
        fill
        unoptimized
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDERS["backgrounds/hero_teaser"]}
        className="object-cover pointer-events-none"
        sizes="100vw"
        priority
      />

      {/* Language switcher — top right */}
      <div className="absolute top-6 right-6 lg:top-[40px] lg:right-[40px] z-10">
        <LanguageSwitcher />
      </div>

      {/* Center content */}
      <div className="relative z-1 flex flex-col items-center justify-center h-full gap-8 lg:gap-16 px-6 pt-24 pb-12 lg:pt-0 lg:pb-0">
        {/* Logo */}
        <Image
          src="/tipilan-logo.svg"
          alt="TipiLAN"
          width={524}
          height={129}
          className="w-[min(524px,80vw)] h-auto"
          priority
        />

        {/* Countdown */}
        <div className="flex gap-1.5 sm:gap-4 text-center items-start justify-center flex-wrap">
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[104px]">
            <span className="text-countdown lg:text-countdown-lg text-text-light">{countdown.days}</span>
            <span className="text-countdown-label lg:text-countdown-label-lg text-primary whitespace-nowrap">
              <span className="lg:hidden">{t("teaser.countdown.daysShort")}</span>
              <span className="hidden lg:inline">{t("teaser.countdown.days")}</span>
            </span>
          </div>
          <span className="text-countdown lg:text-countdown-lg text-primary">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[86px]">
            <span className="text-countdown lg:text-countdown-lg text-text-light">{pad(countdown.hours)}</span>
            <span className="text-countdown-label lg:text-countdown-label-lg text-primary whitespace-nowrap">
              <span className="lg:hidden">{t("teaser.countdown.hoursShort")}</span>
              <span className="hidden lg:inline">{t("teaser.countdown.hours")}</span>
            </span>
          </div>
          <span className="text-countdown lg:text-countdown-lg text-primary">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[86px]">
            <span className="text-countdown lg:text-countdown-lg text-text-light">{pad(countdown.minutes)}</span>
            <span className="text-countdown-label lg:text-countdown-label-lg text-primary whitespace-nowrap">
              <span className="lg:hidden">{t("teaser.countdown.minutesShort")}</span>
              <span className="hidden lg:inline">{t("teaser.countdown.minutes")}</span>
            </span>
          </div>
          <span className="text-countdown lg:text-countdown-lg text-primary">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[103px]">
            <span className="text-countdown lg:text-countdown-lg text-text-light">{pad(countdown.seconds)}</span>
            <span className="text-countdown-label lg:text-countdown-label-lg text-primary whitespace-nowrap">
              <span className="lg:hidden">{t("teaser.countdown.secondsShort")}</span>
              <span className="hidden lg:inline">{t("teaser.countdown.seconds")}</span>
            </span>
          </div>
        </div>

        {/* YouTube embed — 16:9, constrained to logo width */}
        <div className="w-[min(524px,80vw)] aspect-video">
          <iframe
            src="https://www.youtube.com/embed/p_xwlExVtIk"
            title="TipiLAN 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-sm"
          />
        </div>

        {/* Mobile CTA buttons — only visible on small screens */}
        <div className="flex flex-col gap-4 w-full max-w-sm lg:hidden mt-4">
          <a
            href="https://fienta.com/tipilan-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary lg:btn-primary-lg text-btn lg:text-btn-lg hover:opacity-80 text-center"
          >
            {t("teaser.tickets.buyButton")}
          </a>
          <a
            href="mailto:tipilaninfo@gmail.com"
            className="btn-secondary-lg lg:btn-secondary-lg text-btn lg:text-btn-lg text-center"
          >
            {t("teaser.sponsors.contactButton")}
          </a>
        </div>
      </div>

      {/* Scroll button — bottom center, hidden on mobile */}
      <div className="absolute bottom-[68px] left-1/2 -translate-x-1/2 z-10 hidden lg:flex">
        <button
          onClick={onScrollDown}
          className="bg-primary rounded-full size-[48px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Scroll down"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="#0A121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
