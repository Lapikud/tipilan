import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SoldOutOverlay from "@/components/SoldOutOverlay";
import SwitchableTicketCard from "@/components/SwitchableTicketCard";

const ticketSoldOut = {
  visitor: false,
  supporter: false,
  lan: false,
  lol: true,
  cs2: true,
} as const;

interface TicketCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  blueTinge?: boolean;
  soldOut?: boolean;
  soldOutText?: string;
  className?: string;
}

function TicketCard({
  title,
  subtitle,
  price,
  features,
  buttonText,
  buttonHref,
  backgroundImage,
  backgroundOpacity = 40,
  blueTinge = false,
  soldOut = false,
  soldOutText = "",
  className = "",
}: TicketCardProps) {
  return (
    <div
      className={`relative bg-[#0E0F19] border-[#1F5673] px-12 py-16 flex flex-col min-h-87.5 h-full overflow-hidden ${className}`}
      aria-disabled={soldOut || undefined}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
          style={{ opacity: backgroundOpacity / 100 }}
        />
      )}
      {blueTinge && (
        <div className="absolute inset-0 bg-[#005A8C]/30" />
      )}
      <div className="relative z-10 flex flex-col h-full">
        <h2
          className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none text-[#00A3E0] uppercase`}
        >
          {title}
        </h2>
        <h3
          className={`${vipnagorgialla.className} font-bold italic text-2xl text-[#EEE5E5] uppercase mb-4`}
        >
          {subtitle}
        </h3>
        <p
          className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none mb-4`}
        >
          {Array.from(price).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={
                char === "€" || char === "+"
                  ? "text-[#00A3E0]"
                  : "text-[#EEE5E5]"
              }
            >
              {char}
            </span>
          ))}
        </p>
        <ul className="flex flex-col gap-2 mb-6 grow">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[#EEE5E5] text-base"
            >
              <span className="w-1 self-stretch min-h-5 bg-[#00A3E0] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {!soldOut && (
          <Link
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-fit px-4 py-2 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] cursor-pointer ${vipnagorgialla.className} font-bold italic leading-none uppercase transition`}
          >
            {buttonText}
          </Link>
        )}
      </div>

      {soldOut && <SoldOutOverlay text={soldOutText} />}
    </div>
  );
}

export default async function Tickets({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="bg-[#0E0F19] min-h-0 flex flex-col flex-1">
      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 auto-rows-fr pt-14 flex-1 min-h-0">

        {/* KÜLASTAJA / TOETAJA — switchable */}
        <SwitchableTicketCard
          optionA={{
            title: t("tickets.visitor.name"),
            subtitle: t("tickets.subtitle"),
            price: t("tickets.visitor.price"),
            features: t.raw("tickets.visitor.features"),
          }}
          optionB={{
            title: t("tickets.supporter.name"),
            subtitle: t("tickets.subtitle"),
            price: t("tickets.supporter.price"),
            features: t.raw("tickets.supporter.features"),
          }}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/visitor_tournament.jpg"
          backgroundImageB="/images/landing/main_supporter.jpg"
          backgroundOpacityA={30}
          backgroundOpacityB={40}
          soldOutA={ticketSoldOut.visitor}
          soldOutB={ticketSoldOut.supporter}
          soldOutText={t("tickets.soldOut")}
          className="border-b-[3px] lg:border-r-[3px]"
        />

        {/* LAN PILET */}
        <TicketCard
          title={t("tickets.lan.name")}
          subtitle={t("tickets.lan.subtitle")}
          price={t("tickets.lan.price")}
          features={t.raw("tickets.lan.features")}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/explore_teaser.png"
          backgroundOpacity={100}
          soldOut={ticketSoldOut.lan}
          soldOutText={t("tickets.soldOut")}
          className="border-b-[3px]"
        />

        {/* LOL TURNIIRI PILET */}
        <TicketCard
          title={t("tickets.lol.name")}
          subtitle={t("tickets.subtitle")}
          price={t("tickets.lol.price")}
          features={t.raw("tickets.lol.features")}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/league_ticket.jpg"
          soldOut={ticketSoldOut.lol}
          soldOutText={t("tickets.soldOut")}
          className="border-b-[3px] lg:border-b-0 lg:border-r-[3px]"
        />

        {/* CS2 TURNIIRI PILET */}
        <TicketCard
          title={t("tickets.cs2.name")}
          subtitle={t("tickets.subtitle")}
          price={t("tickets.cs2.price")}
          features={t.raw("tickets.cs2.features")}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/compete_teaser.jpg"
          backgroundOpacity={30}
          soldOut={ticketSoldOut.cs2}
          soldOutText={t("tickets.soldOut")}
          className="border-b-0"
        />
      </div>
    </div>
  );
}
