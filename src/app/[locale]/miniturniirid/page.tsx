import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { miniTournaments } from "@/data/miniturniirid";

/** Horizontal padding used by the page (64px at the design width). */
const GUTTER = "px-4 sm:px-8 lg:px-16";

// TODO: replace with the real mini-tournaments rules URL once it exists.
// Placeholder points at the TipiLAN ruleset repo root.
const RULES_URL =
  "https://git.edunaut.ee/slunk/TipiLAN_reeglistik_ruleset";

/**
 * One mini-tournament tile: a cyan-bordered cover image above a bold caption
 * "Title – Prize". Games without artwork yet fall back to a text tile.
 */
function MiniCard({ title, prize, image }: (typeof miniTournaments)[number]) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video border-[3px] border-[#00A3E0] overflow-hidden bg-[#0E0F19]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span
            className={`${vipnagorgialla.className} absolute inset-0 flex items-center justify-center p-4 text-center font-bold italic uppercase text-white/85 leading-tight text-[clamp(1rem,0.8rem+1vw,1.5rem)]`}
          >
            {title}
          </span>
        )}
      </div>
      <span className="font-bold text-white leading-tight text-[clamp(1rem,0.85rem+0.8vw,1.5rem)]">
        {title} – {prize}
      </span>
    </div>
  );
}

export default async function MiniTournaments({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="bg-[#0E0F19] min-h-screen pt-16 md:pt-20">
      <div className="mx-auto w-full max-w-[1920px]">
        {/* Header */}
        <div className={`${GUTTER} pt-12 md:pt-16`}>
          <h1
            className={`${vipnagorgialla.className} font-bold italic uppercase text-[#EEE5E5] leading-none text-[clamp(1.75rem,1.4rem+3vw,3.5rem)]`}
          >
            {t("minipage.title")}
          </h1>
          <p className="mt-4 text-[#00A3E0] italic text-lg md:text-xl">
            {t("minipage.date")}
          </p>
          <p className="mt-4 text-[#EEE5E5] max-w-2xl text-base md:text-lg">
            {t("minipage.description")}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={RULES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-3 border-4 border-[#00A3E0] bg-transparent text-[#00A3E0] hover:bg-[#00A3E0] hover:text-[#0A121F] transition`}
            >
              {t("minipage.readRules")}
            </Link>
            <Link
              href="/piletid"
              className={`${vipnagorgialla.className} font-bold italic leading-none text-lg uppercase px-4 py-3 border-4 border-transparent bg-[#00A3E0] hover:bg-[#E5E5EE] text-[#0A121F] transition`}
            >
              {t("minipage.buyTicket")}
            </Link>
          </div>
        </div>

        {/* Game grid */}
        <div className={`${GUTTER} py-12 md:py-16`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {miniTournaments.map((game) => (
              <MiniCard key={game.title} {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
