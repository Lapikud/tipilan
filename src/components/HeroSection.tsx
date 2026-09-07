import Image from "next/image";
import { Link } from "@/i18n/routing";
import AnimatedTipilanLogo from "@/components/AnimatedTipilanLogo";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative h-190 md:h-auto md:min-h-142.25 lg:h-142.25 overflow-hidden border-b-3 border-[#1F5673]">
      {/* Background image */}
      <Image
        src="/images/landing/main_teaser.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0E0F19]/75" />

      {/* Content */}
      <div className="relative h-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-8 px-6 sm:px-8 md:px-12 pt-12 pb-8 md:py-10">
        {/* Left: logo + info + CTA */}
        <div className="flex flex-col gap-5 items-center text-center md:items-start md:text-left">
          <AnimatedTipilanLogo />
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
            className={`self-center md:self-start px-6 py-3 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] ${vipnagorgialla.className} font-bold italic leading-none text-[clamp(1rem,0.8rem+0.8vw,1.5rem)] uppercase transition`}
          >
            {t("hero.buyTicket")}
          </Link>
        </div>

        {/* Right: prize pool + award */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right pb-6 md:pb-0">
          <div
            className={`${vipnagorgialla.className} font-bold italic text-center md:text-right`}
          >
            <p className="text-[clamp(2rem,1.5rem+2.5vw,4rem)] leading-none tracking-normal uppercase text-[#EEE5E5]">
              {t("hero.prizePool")}
            </p>
            <h2 className="text-[clamp(3rem,2rem+4vw,6rem)] leading-none text-[#00A3E0]">
              10 000€
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-0 mt-2">
            <Image
              src="/images/landing/student_award.webp"
              width={512}
              height={439}
              alt="TalTech student award"
              className="h-auto w-45 shrink-0 object-contain"
            />
            <p
              className={`text-[clamp(1.25rem,1rem+1.5vw,2rem)] leading-none tracking-normal uppercase text-center md:text-right align-middle text-[#EEE5E5] ${vipnagorgialla.className} font-bold italic px-2 sm:px-0`}
            >
              {t("hero.awardPrefix")}{" "}
              <span className="text-[#00A3E0]">{t("hero.awardHighlight")}</span>{" "}
              {t("hero.awardSuffix")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
