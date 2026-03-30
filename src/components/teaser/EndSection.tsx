"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";
import { BLUR_PLACEHOLDERS } from "@/lib/blurPlaceholders";

function formatK(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  if (k % 1 === 0) return `${k}k`;
  return `${k.toFixed(1)}k`;
}

function CountUpStat({
  end,
  suffix,
  label,
  format,
  minWidth,
}: {
  end: number;
  suffix: string;
  label: string;
  format?: (n: number) => string;
  minWidth?: string;
}) {
  const { ref, count } = useCountUp({ end, duration: 2000 });
  const display = format ? format(count) : String(count);

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-8">
      <p
        className="text-title tabular-nums"
        ref={ref as React.RefObject<HTMLParagraphElement>}
        style={{ minWidth: minWidth ?? "auto" }}
      >
        {display}<span className="text-primary">{suffix}</span>
      </p>
      <p className="text-p-lg whitespace-pre-line">{label}</p>
    </div>
  );
}

export default function EndSection() {
  const t = useTranslations();

  return (
    <section className="relative w-full border-t-4 border-primary-50 block">
      <div className="flex flex-col lg:flex-row lg:min-h-dvh">
        {/* Tickets side */}
        <div className="relative w-full lg:w-1/2 overflow-hidden min-h-[60svh] lg:min-h-dvh">
          <Image
            src="/images/backgrounds/tickets_teaser.webp"
            alt=""
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS["backgrounds/tickets_teaser"]}
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 z-1 flex flex-col items-center justify-between py-[15%] px-6 lg:px-12 xl:px-16">
            {/* Ticket stats */}
            <div className="flex flex-row items-start gap-6 xl:gap-12 text-center text-text-light">
              <CountUpStat end={8} suffix="€" label={t("teaser.tickets.earlyVisitor")} />
              <CountUpStat end={25} suffix="€" label={t("teaser.tickets.supporter")} />
            </div>
            {/* CTA */}
            <div className="flex flex-col items-center gap-3 xl:gap-6 w-full">
              <h2 className="text-h1 text-text-light text-center text-shadow-teaser">
                {t("teaser.tickets.tba")}
              </h2>
              <a href="https://fienta.com/tipilan-2026" target="_blank" rel="noopener noreferrer" className="btn-primary lg:btn-primary-lg text-btn lg:text-btn-lg hover:opacity-80 text-center">
                {t("teaser.tickets.buyButton")}
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative h-[4px] w-full bg-primary-50 shrink-0 lg:h-auto lg:w-[4px]" />

        {/* Sponsors side */}
        <div className="relative w-full lg:w-1/2 overflow-hidden min-h-[60svh] lg:min-h-dvh">
          <Image
            src="/images/backgrounds/sponsors_teaser.webp"
            alt=""
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS["backgrounds/sponsors_teaser"]}
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 z-1 flex flex-col items-center justify-between py-[15%] px-6 lg:px-12 xl:px-16">
            {/* Sponsor stats */}
            <div className="flex flex-row items-start gap-6 xl:gap-12 text-center text-text-light">
              <CountUpStat end={900} suffix="+" label={t("teaser.sponsors.visitors")} />
              <CountUpStat end={10000} suffix="+" label={t("teaser.sponsors.streamViewers")} format={formatK} />
            </div>
            {/* CTA */}
            <div className="flex flex-col items-center gap-3 xl:gap-6 w-full">
              <h2 className="text-h1 text-text-light text-center text-shadow-teaser">
                {t("teaser.sponsors.cta")}
              </h2>
              <a href="mailto:tipilaninfo@gmail.com" className="btn-secondary-lg lg:btn-secondary-lg text-btn lg:text-btn-lg text-center">
                {t("teaser.sponsors.contactButton")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
