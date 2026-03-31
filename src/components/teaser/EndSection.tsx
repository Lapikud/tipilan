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
    <div className="flex flex-col items-center gap-4 lg:gap-8" ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Desktop version */}
      <p
        className="text-title tabular-nums hidden sm:block"
        style={{ minWidth: minWidth ?? "auto", fontSize: "clamp(3rem, 2.5rem + 3vw, 6rem)" }}
      >
        {display}<span className="text-primary">{suffix}</span>
      </p>
      {/* Mobile version */}
      <p
        className="text-title tabular-nums sm:hidden"
        style={{ minWidth: minWidth ?? "auto", fontSize: "clamp(2rem, 1.2rem + 4vw, 6rem)" }}
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
      <div className="flex flex-row min-h-dvh">
        {/* Tickets side */}
        <div className="relative w-1/2 overflow-hidden min-h-[300px]">
          <Image
            src="/images/backgrounds/tickets_teaser.webp"
            alt=""
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS["backgrounds/tickets_teaser"]}
            sizes="50vw"
            className="object-cover pointer-events-none"
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-12 md:gap-32 py-[15%] px-6 lg:px-12 xl:px-16 h-full">
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
              <a href="https://fienta.com/et/tipilan?utm_source=homepage&utm_medium=button" target="_blank" rel="noopener noreferrer" className="btn-primary lg:btn-primary-lg text-btn lg:text-btn-lg hover:opacity-80 text-center text-pretty">
                {t("teaser.tickets.buyButton")}
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative h-auto w-[4px] bg-primary-50 shrink-0" />

        {/* Sponsors side */}
        <div className="relative w-1/2 overflow-hidden min-h-[300px]">
          <Image
            src="/images/backgrounds/sponsors_teaser.webp"
            alt=""
            fill
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS["backgrounds/sponsors_teaser"]}
            sizes="50vw"
            className="object-cover pointer-events-none"
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-12 md:gap-32 py-[15%] px-6 lg:px-12 xl:px-16 h-full">
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
              <a href="mailto:tipilaninfo@gmail.com" className="btn-secondary-lg lg:btn-secondary-lg text-btn lg:text-btn-lg text-center text-pretty">
                {t("teaser.sponsors.contactButton")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
