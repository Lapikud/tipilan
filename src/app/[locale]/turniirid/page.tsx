import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface TournamentCardProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage: string;
}

function TournamentCard({
  title,
  buttonText,
  buttonHref,
  backgroundImage,
}: TournamentCardProps) {
  return (
    <div className="relative bg-[#0E0F19] border-r border-[#1F5673] flex flex-col items-center justify-center h-[818px]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center opacity-50"
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2
          className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+3vw,4rem)] leading-none text-[#EEE5E5] uppercase mb-4`}
        >
          {title}
        </h2>
        <Link
          href={buttonHref}
          className={`${vipnagorgialla.className} font-bold italic text-xl text-[#00A3E0] hover:text-[#EEE5E5] uppercase transition`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default async function Tourney({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="bg-[#0E0F19]">
      {/* 1x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 pt-16 md:pt-20">
        {/* CS2 */}
        <TournamentCard
          title="COUNTER-STRIKE 2"
          buttonText={t("tournaments.clickButton")}
          buttonHref="/turniirid/cs2"
          backgroundImage="/images/landing/compete_teaser.jpg"
        />

        {/* LoL */}
        <TournamentCard
          title="LEAGUE OF LEGENDS"
          buttonText={t("tournaments.clickButton")}
          buttonHref="/turniirid/lol"
          backgroundImage="/images/landing/league_ticket.jpg"
        />
      </div>
    </div>
  );
}
