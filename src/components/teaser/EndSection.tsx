"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";

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
    <section className="relative w-full border-t-4 border-primary-50 hidden lg:block">
      <div className="flex flex-col md:flex-row min-h-dvh">
        {/* Tickets side */}
        <div className="relative flex-1 overflow-hidden min-h-[50dvh] md:min-h-0">
          <Image
            src="/images/tickets_teaser.png"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover pointer-events-none"
          />
          <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-12 xl:gap-32 p-8 lg:p-16">
            {/* Ticket stats */}
            <div className="flex gap-8 xl:gap-16 text-center text-text-light">
              <CountUpStat end={0} suffix="€" label={t("teaser.tickets.earlyVisitor")} />
              <CountUpStat end={0} suffix="€" label={t("teaser.tickets.supporter")} />
            </div>
            {/* CTA */}
            <div className="flex flex-col items-center gap-4 xl:gap-8 w-full">
              <h2 className="text-h1 text-text-light text-center text-shadow-teaser">
                {t("teaser.tickets.cta")}
              </h2>
              <a href="https://fienta.com/tipilan-2026" target="_blank" rel="noopener noreferrer" className="btn-primary-lg text-btn-lg hover:opacity-80">
                {t("teaser.tickets.buyButton")}
              </a>
            </div>
          </div>
        </div>

        {/* Separator — vertical on desktop, horizontal on stacked */}
        <div className="hidden md:block relative w-[4px] bg-primary-50 shrink-0" />
        <div className="block md:hidden relative h-[4px] bg-primary-50 shrink-0" />

        {/* Sponsors side */}
        <div className="relative flex-1 overflow-hidden min-h-[50dvh] md:min-h-0">
          <Image
            src="/images/sponsors_teaser.png"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover pointer-events-none"
          />
          <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-12 xl:gap-32 p-8 lg:p-16">
            {/* Sponsor stats */}
            <div className="flex gap-8 xl:gap-16 text-center text-text-light">
              <CountUpStat end={900} suffix="+" label={t("teaser.sponsors.visitors")} minWidth="5ch" />
              <CountUpStat end={10000} suffix="+" label={t("teaser.sponsors.streamViewers")} format={formatK} minWidth="5ch" />
            </div>
            {/* CTA */}
            <div className="flex flex-col items-center gap-4 xl:gap-8 w-full">
              <h2 className="text-h1 text-text-light text-center text-shadow-teaser">
                {t("teaser.sponsors.cta")}
              </h2>
              <a href="mailto:tipilan@ituk.ee" className="btn-primary-lg text-btn-lg hover:opacity-80">
                {t("teaser.sponsors.contactButton")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
