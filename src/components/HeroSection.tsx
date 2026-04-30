import Image from "next/image";
import { Link } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden border-b-3 border-[#1F5673]">
      {/* Background image */}
      <Image
        src="/images/landing/main_teaser.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0E0F19]/75" />

      {/* Content */}
      <div className="relative grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-8 px-8 py-10 md:px-12 md:py-14">
        {/* Left: logo + info + CTA */}
        <div className="flex flex-col gap-5">
          <Image
            src="/tipilan-dark.svg"
            width={750}
            height={106}
            alt="TipiLAN Logo"
            className="w-[max(260px,min(100%,750px))] h-auto"
          />
          <div className={`${vipnagorgialla.className} font-bold italic`}>
            <p className="text-[clamp(1.1rem,0.9rem+1vw,1.75rem)] text-[#00A3E0] uppercase tracking-wide">
              {t("hero.date")}
            </p>
            <p className="text-[clamp(0.9rem,0.75rem+0.75vw,1.25rem)] text-[#EEE5E5] uppercase tracking-wide">
              {t("hero.location")}
            </p>
          </div>
          <Link
            href="/piletid"
            className={`self-start px-6 py-3 bg-[#007CAB] hover:bg-[#00A3E0] text-[#EEE5E5] ${vipnagorgialla.className} font-bold italic text-[clamp(1rem,0.8rem+0.8vw,1.5rem)] uppercase transition`}
          >
            {t("hero.buyTicket")}
          </Link>
        </div>

        {/* Right: prize pool + award */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className={`${vipnagorgialla.className} font-bold italic text-right`}>
            <p className="text-[clamp(1rem,0.8rem+1vw,1.5rem)] text-[#EEE5E5] uppercase">
              {t("hero.prizePool")}
            </p>
            <h2 className="text-[clamp(3rem,2rem+4vw,6rem)] leading-none text-[#00A3E0]">
              10 000€
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 mt-2">
            <Image
              src="/images/landing/student_award.png"
              width={180}
              height={180}
              alt="TalTech student award"
              className="object-contain"
            />
            <p className={`text-[0.75rem] text-[#EEE5E5] ${vipnagorgialla.className} font-bold italic uppercase text-right`}>
              {t("hero.award")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
