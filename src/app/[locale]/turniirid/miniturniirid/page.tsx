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
function MiniCard({
  title,
  prizePool,
  format,
  includesGiftBags,
  organizer,
  organizerUrl,
  image,
  organizedBy,
  giftBagsLabel,
}: (typeof miniTournaments)[number] & {
  organizedBy: string;
  giftBagsLabel: string;
}) {
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
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-bold text-white leading-tight text-[clamp(1rem,0.85rem+0.8vw,1.5rem)]">
          {title}{format ? `, ${format}` : ""}
        </span>
        <span className="text-xl font-bold leading-none text-white md:text-2xl">-</span>
        {prizePool === "giftBags" ? (
          <span
            className="inline-flex items-center gap-1 text-[#EEE5E5]"
            title={giftBagsLabel}
          >
            <span
              className="material-symbols-outlined text-2xl! leading-none! md:text-3xl!"
              aria-hidden="true"
            >
              redeem
            </span>
            <span className="text-xl font-bold leading-tight md:text-2xl">
              {giftBagsLabel}
            </span>
          </span>
        ) : (
          <span className="text-xl font-bold leading-tight text-[#EEE5E5] md:text-2xl">
            {prizePool}
          </span>
        )}
        {includesGiftBags && prizePool !== "giftBags" && (
          <>
            <span className="text-xl font-bold leading-none text-white md:text-2xl">+</span>
            <span
              className="inline-flex items-center gap-1 text-[#EEE5E5]"
              title={giftBagsLabel}
            >
              <span
                className="material-symbols-outlined text-2xl! leading-none! md:text-3xl!"
                aria-hidden="true"
              >
                redeem
              </span>
              <span className="text-xl font-bold leading-tight md:text-2xl">
                {giftBagsLabel}
              </span>
            </span>
          </>
        )}
      </div>
      {organizer && (
        <span className="text-sm italic text-[#EEE5E5]/60">
          {organizedBy}: {organizerUrl ? (
            <Link
              href={organizerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00A3E0] hover:text-[#EEE5EE] transition-colors"
            >
              {organizer}
            </Link>
          ) : (
            <span className="text-[#00A3E0]">{organizer}</span>
          )}
        </span>
      )}
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
          <p className="mt-4 text-[#EEE5E5]/70 italic text-lg md:text-xl">
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

        {/* Tournament groups */}
        <div className={`${GUTTER} py-12 md:py-16`}>
          {["simRacing", "fightingGames", "other"].map((category) => {
            const games = miniTournaments.filter((game) => game.category === category);

            return (
              <section key={category} className="mb-14 last:mb-0">
                <h2
                  className={`${vipnagorgialla.className} mb-6 text-3xl font-bold italic uppercase text-[#00A3E0] md:text-4xl`}
                >
                  {t(`minipage.categories.${category}`)}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {games.map((game) => (
                    <MiniCard
                      key={game.title}
                      {...game}
                      organizedBy={t("minipage.organizedBy")}
                      giftBagsLabel={t("minipage.giftBags")}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
