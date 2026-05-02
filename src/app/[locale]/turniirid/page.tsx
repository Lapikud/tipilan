import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

interface TournamentCardProps {
  title: string;
  buttonHref: string;
  backgroundImage: string;
  objectPosition?: string;
  className?: string;
}

function TournamentCard({
  title,
  buttonHref,
  backgroundImage,
  objectPosition = "center",
  className = "",
}: TournamentCardProps) {
  return (
    <Link
      href={buttonHref}
      aria-label={title}
      className={`group relative bg-[#0E0F19] border-[#1F5673] flex flex-col items-center justify-center h-full min-h-87.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A3E0]/40 ${className}`}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover opacity-50 transition-opacity duration-200 group-hover:opacity-40 group-focus-visible:opacity-40"
        style={{ objectPosition }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2
          className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,1.5rem+3vw,4rem)] leading-none text-[#EEE5E5] uppercase transition-colors duration-200 group-hover:text-[#00A3E0] group-focus-visible:text-[#00A3E0]`}
        >
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default async function Tourney({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="bg-[#0E0F19] min-h-0 flex flex-col flex-1">
      {/* 1x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr pt-14 flex-1 min-h-0">
        {/* CS2 */}
        <TournamentCard
          title="COUNTER-STRIKE 2"
          buttonHref="/turniirid/cs2"
          backgroundImage="/images/landing/cs2_tournament.jpg"
          className="border-b-[3px] md:border-b-0 md:border-r-3"
        />

        {/* LoL */}
        <TournamentCard
          title="LEAGUE OF LEGENDS"
          buttonHref="/turniirid/lol"
          backgroundImage="/images/landing/lol_tournament.png"
          objectPosition="bottom left"
          className="border-b-0"
        />
      </div>
    </div>
  );
}
