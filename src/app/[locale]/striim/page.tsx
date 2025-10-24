import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Sponsors from "@/components/Sponsors";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

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
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Title */}
        <div className="grid grid-cols-1 items-center justify-between mt-18 gap-12 pt-8">
          <Image
            src="/tipilan-white.svg"
            width={850}
            height={120}
            alt="TipiLAN Logo"
            className="px-8 py-8 md:px-12 md:py-14 dark:hidden w-[max(300px,min(100%,850px))] h-auto"
          />
          <Image
            src="/tipilan-dark.svg"
            width={850}
            height={120}
            alt="TipiLAN Logo"
            className="px-8 py-8 md:px-12 md:py-14 not-dark:hidden w-[max(300px,min(100%,850px))] h-auto2"
          />
          <Link
            href="/ajakava"
            className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 border-t-3 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
          >
            <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
              <h2
                className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black dark:group-hover:text-[#2A2C3F]`}
              >
                {t("navigation.schedule")}
              </h2>
              <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
                arrow_right_alt
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
                event_note
              </span>
              <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
                {t("home.sections.schedule.description")}
              </p>
            </div>
          </Link>
        </div>
        {/* Stream iframe from Twitch */}
        <div className="border-[#1F5673] -ml-0.75 border-l-0 md:border-l-3 border-b-3 h-full pt-0 md:pt-16">
          <iframe
            src="https://player.twitch.tv/?channel=tipilan_ee&parent=localhost&parent=tipilan.ee"
            height="100%"
            width="100%"
            className="w-full h-full min-h-[400px]"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      </div>
      {/* Grid of buttons */}
      <div className="grid grid-cols-1 xl:grid-cols-2 border-[#1F5673]">
        <Link
          href="/turniirid"
          className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 lg:border-r-3 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
        >
          <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic break-normal uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}
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
            <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              {t("home.sections.tournaments.description")}
            </p>
          </div>
        </Link>
        <Link
          href="/messiala"
          className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 border-[#1F5673] group hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition-all"
        >
          <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}
            >
              {t("navigation.expo")}
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              weekend
            </span>
            <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              {t("home.sections.expo.description")}
            </p>
          </div>
        </Link>
      </div>
      {/* Date */}
      <Link
        href="/piletid"
        className={`p-8 md:p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] group transition`}
      >
        <div className="cursor-pointer text-left flex flex-row justify-between xl:justify-start gap-8">
          <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] dark:group-hover:text-[#2A2C3F] text-[#2A2C3F] group-hover:text-black">
            {t("home.sections.reserveSpot")}
          </h3>
          <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] hidden md:block group-hover:translate-x-2 group-hover:text-[#EEE5E5] dark:group-hover:text-[#EEE5E5] transition">
            arrow_right_alt
          </span>
        </div>
        <h2 className="text-[clamp(2.5rem,2.25rem+1.25vw,3.75rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
          {t("home.sections.dateAndLocation")}
        </h2>
      </Link>
      {/* Sponsors */}
      <Sponsors />
    </div>
  );
}
