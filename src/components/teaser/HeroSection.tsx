"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useCountdown } from "@/hooks/useCountdown";
import { EVENT_DATE } from "./constants";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const t = useTranslations();
  const countdown = useCountdown(EVENT_DATE);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero_teaser.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
        sizes="100vw"
        priority
      />

      {/* Language switcher — top right */}
      <div className="absolute top-6 right-6 lg:top-[40px] lg:right-[40px] z-10">
        <LanguageSwitcher />
      </div>

      {/* Center content */}
      <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-8 lg:gap-16 px-6">
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
        <div className="grid grid-cols-[1fr_auto_1fr] sm:flex gap-x-1.5 gap-y-3 sm:gap-4 text-center items-start">
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[104px]">
            <span className="text-countdown text-text-light">{countdown.days}</span>
            <span className="text-countdown-label text-primary whitespace-nowrap">{t("teaser.countdown.days")}</span>
          </div>
          <span className="text-countdown text-primary sm:block">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[86px]">
            <span className="text-countdown text-text-light">{pad(countdown.hours)}</span>
            <span className="text-countdown-label text-primary whitespace-nowrap">{t("teaser.countdown.hours")}</span>
          </div>
          <span className="text-countdown text-primary hidden sm:block">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[86px]">
            <span className="text-countdown text-text-light">{pad(countdown.minutes)}</span>
            <span className="text-countdown-label text-primary whitespace-nowrap">{t("teaser.countdown.minutes")}</span>
          </div>
          <span className="text-countdown text-primary sm:block">:</span>
          <div className="flex flex-col items-center gap-2 lg:gap-4 min-w-0 lg:w-[103px]">
            <span className="text-countdown text-text-light">{pad(countdown.seconds)}</span>
            <span className="text-countdown-label text-primary whitespace-nowrap">{t("teaser.countdown.seconds")}</span>
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
            className="btn-primary-lg text-btn-lg hover:opacity-80 text-center"
          >
            {t("teaser.tickets.buyButton")}
          </a>
          <a
            href="mailto:tipilan@ituk.ee"
            className="btn-primary-lg text-btn-lg hover:opacity-80 text-center"
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
