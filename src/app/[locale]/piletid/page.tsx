import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface TicketCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
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
  className = "",
}: TicketCardProps) {
  return (
    <div
      className={`relative bg-[#0E0F19] border-[#1F5673] px-12 py-16 flex flex-col min-h-87.5 h-full ${className}`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: backgroundOpacity / 100 }}
        />
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
              <span className="w-1 h-full min-h-5 bg-[#00A3E0] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={buttonHref} target="_blank">
          <button
            className={`px-4 py-2 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] cursor-pointer ${vipnagorgialla.className} font-bold italic leading-none uppercase transition`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 auto-rows-fr pt-14 flex-1 min-h-0">
        {/* KÜLASTAJA PILET */}
        <TicketCard
          title={t("tickets.visitor.name")}
          subtitle={t("tickets.subtitle")}
          price={t("tickets.visitor.price")}
          features={t.raw("tickets.visitor.features")}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/visitor_tournament.jpg"
          backgroundOpacity={30}
          className="border-b-[3px] md:border-b-[3px] md:border-r-[3px]"
        />

        {/* TOETAJA PILET */}
        <TicketCard
          title={t("tickets.supporter.name")}
          subtitle={t("tickets.subtitle")}
          price={t("tickets.supporter.price")}
          features={t.raw("tickets.supporter.features")}
          buttonText={t("tickets.buyButton")}
          buttonHref="https://fienta.com/et/tipilan"
          backgroundImage="/images/landing/explore_teaser.png"
          backgroundOpacity={80}
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
          className="border-b-[3px] md:border-b-0 md:border-r-[3px]"
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
          className="border-b-0"
        />
      </div>
    </div>
  );
}
