import { vipnagorgialla } from "@/components/Vipnagorgialla";
import CS2Sidebar from "@/components/CS2Sidebar";
import CS2Rules from "@/components/CS2Rules";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

const sectionKeys = [
  { id: "intro", labelKey: "lolpage.nav.intro" },
  { id: "info", labelKey: "lolpage.nav.info" },
  { id: "prizes", labelKey: "lolpage.nav.prizes" },
  { id: "format", labelKey: "lolpage.nav.format" },
  // { id: "faq", labelKey: "lolpage.nav.faq" },
  { id: "rules", labelKey: "lolpage.nav.rules" },
];

export default async function LoLTournament({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const sections = sectionKeys.map((section) => ({
    id: section.id,
    label: t(section.labelKey),
  }));

  return (
    <div className="bg-[#0E0F19] min-h-screen pt-16 md:pt-20">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-16">
          {/* Main content */}
          <div>
            {/* Header */}
            <h1
              className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+3vw,4rem)] leading-tight text-[#00A3E0] uppercase mb-4`}
            >
              {t("lolpage.title")}
            </h1>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="https://fienta.com/et/tipilan"
                target="_blank"
                className={`${vipnagorgialla.className} font-bold italic px-4 py-2 bg-[#007CAB] hover:bg-[#00A3E0] text-[#EEE5E5] uppercase transition`}
              >
                {t("lolpage.buyTicket")}
              </Link>
            </div>

            {/* SISSEJUHATUS */}
            <section id="intro" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.intro.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-6">
                {t("lolpage.intro.description")}
              </p>

              <h3
                className={`${vipnagorgialla.className} font-bold italic text-xl text-[#EEE5E5] uppercase mb-2`}
              >
                {t("lolpage.intro.previousWinners")}
              </h3>
              <p className="text-[#EEE5E5]/80 font-bold">2025</p>
              <ol className="text-[#EEE5E5]/80 list-decimal list-inside mb-4">
                <li>Ükssilm (Eesti)</li>
                <li>Eesti Rästikud (Eesti)</li>
                <li>LOMiks (Läti)</li>
              </ol>
            </section>

            {/* ÜLDINE INFO */}
            <section id="info" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.info.title")}
              </h2>
              <p className="text-[#EEE5E5]/80">
                {t("lolpage.info.description")}
              </p>
            </section>

            {/* AUHINNAFOND */}
            <section id="prizes" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.prizes.title")}
              </h2>

              <h3
                className={`${vipnagorgialla.className} font-bold italic text-xl text-[#00A3E0] uppercase mb-2`}
              >
                {t("lolpage.prizes.mainTitle")}
              </h3>
              <ul className="text-[#EEE5E5]/80 mb-2">
                <li>{t("lolpage.prizes.place1")}</li>
                <li>{t("lolpage.prizes.place2")}</li>
                <li>{t("lolpage.prizes.place3")}</li>
              </ul>
              <p className="text-[#EEE5E5]/60 text-sm">
                {t("lolpage.prizes.note")}
              </p>
            </section>

            {/* TURNIIRI FORMAAT */}
            <section id="format" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.format.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-4">
                {t("lolpage.format.description")}
              </p>
              <p className="text-[#EEE5E5]/80">
                {t("lolpage.format.day1")}
              </p>
              <p className="text-[#EEE5E5]/80">
                {t("lolpage.format.day2")}
              </p>
            </section>

            {/* FAQ - commented out until content is ready
            <section id="faq" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.faq.title")}
              </h2>
              <h3
                className={`${vipnagorgialla.className} font-bold italic text-lg text-[#EEE5E5] uppercase mb-2`}
              >
                {t("lolpage.faq.q1")}
              </h3>
              <p className="text-[#EEE5E5]/80 mb-4">
                {t("lolpage.faq.a1")}
              </p>
            </section>
            */}

            {/* REEGLID */}
            <section id="rules" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("lolpage.rules.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-6">
                {t("lolpage.rules.description")}
              </p>

              <CS2Rules sections={t.raw("lolpage.rules.sections")} />

              <div className="mt-8">
                <p className="text-[#EEE5E5]/80 mb-2">{t("lolpage.rules.contact")}</p>
                <p className="text-[#00A3E0] font-bold">{t("lolpage.rules.contactName")}</p>
                <p className="text-[#EEE5E5]/70">{t("lolpage.rules.contactRole")}</p>
                <p className="text-[#EEE5E5]/70">
                  Discord:{" "}
                  <a
                    href="https://discord.com/users/125585160761638912"
                    target="_blank"
                    className="text-[#00A3E0] hover:text-[#EEE5E5] transition"
                  >
                    Kukkel
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar navigation */}
          <CS2Sidebar sections={sections} />
        </div>
      </div>
    </div>
  );
}
