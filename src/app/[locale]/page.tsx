import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Sponsors from "@/components/Sponsors";
import HeroSection from "@/components/HeroSection";
import TeaserCarousel from "@/components/TeaserCarousel";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div>
      {/* Hero */}
      <div className="mt-18">
        <HeroSection />
      </div>

      {/* Nav cards: Piletid + Turniirid */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-[260px] border-b-3 border-[#1F5673]">
        <Link
          href="/piletid"
          className="px-8 md:px-12 py-8 flex flex-col justify-center gap-4 border-b-3 md:border-b-0 md:border-r-3 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
        >
          <div className="flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black dark:group-hover:text-[#2A2C3F]`}
            >
              {t("navigation.tickets")}
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              confirmation_number
            </span>
          </div>
        </Link>

        <Link
          href="/turniirid"
          className="px-8 md:px-12 py-8 flex flex-col justify-center gap-4 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
        >
          <div className="flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}
            >
              {t("navigation.tournaments")}
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              trophy
            </span>
          </div>
        </Link>
      </div>

      {/* Teaser carousel */}
      <TeaserCarousel />

      {/* Sponsors */}
      <Sponsors />

    </div>
  );
}
