import { vipnagorgialla } from "@/components/Vipnagorgialla";
import CS2Sidebar from "@/components/CS2Sidebar";
import CS2Rules from "@/components/CS2Rules";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

const sectionKeys = [
  { id: "intro", labelKey: "cs2page.nav.intro" },
  { id: "info", labelKey: "cs2page.nav.info" },
  { id: "prizes", labelKey: "cs2page.nav.prizes" },
  { id: "format", labelKey: "cs2page.nav.format" },
  { id: "vrs", labelKey: "cs2page.nav.vrs" },
  { id: "faq", labelKey: "cs2page.nav.faq" },
  { id: "rules", labelKey: "cs2page.nav.rules" },
];

export default async function CS2Tournament({
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
              {t("cs2page.title")}
            </h1>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="https://fienta.com/et/tipilan"
                target="_blank"
                className={`${vipnagorgialla.className} font-bold italic px-4 py-2 bg-[#007CAB] hover:bg-[#00A3E0] text-[#EEE5E5] uppercase transition`}
              >
                {t("cs2page.buyTicket")}
              </Link>
              <Link
                href="https://git.edunaut.ee/slunk/TipiLAN_reeglistik_ruleset/src/branch/main/CS2%20tournament"
                target="_blank"
                className={`${vipnagorgialla.className} font-bold italic px-4 py-2 bg-[#1F5673] hover:bg-[#007CAB] text-[#EEE5E5] uppercase transition`}
              >
                {t("cs2page.viewGithub")}
              </Link>
            </div>

            {/* SISSEJUHATUS */}
            <section id="intro" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.intro.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-6">
                {t("cs2page.intro.description")}
              </p>

              <h3
                className={`${vipnagorgialla.className} font-bold italic text-xl text-[#EEE5E5] uppercase mb-2`}
              >
                {t("cs2page.intro.previousWinners")}
              </h3>
              <p className="text-[#EEE5E5]/80 font-bold">2025</p>
              <ol className="text-[#EEE5E5]/80 list-decimal list-inside mb-4">
                <li>RAID (Eesti)</li>
                <li>hypewrld (Läti)</li>
                <li>CSDIILIT (Soome/Eesti)</li>
              </ol>
            </section>

            {/* ÜLDINE INFO */}
            <section id="info" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.info.title")}
              </h2>
              <p className="text-[#EEE5E5]/80">
                {t("cs2page.info.description")}
              </p>
            </section>

            {/* AUHINNAFOND */}
            <section id="prizes" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.prizes.title")}
              </h2>

              <h3
                className={`${vipnagorgialla.className} font-bold italic text-xl text-[#00A3E0] uppercase mb-2`}
              >
                {t("cs2page.prizes.mainTitle")}
              </h3>
              <ul className="text-[#EEE5E5]/80 mb-2">
                <li>1. koht - 3000€, 600€ inimese kohta, 50% ehk 1/2 auhinnafondist.</li>
                <li>2. koht - 2000€, 400€ inimese kohta, 33.3...(3)% ehk 1/3 auhinnafondist.</li>
                <li>3. koht - 1000€, 200€ inimese kohta, 16.6...(6)% ehk 1/6 auhinnafondist.</li>
              </ul>
              <p className="text-[#EEE5E5]/60 text-sm mb-6">
                {t("cs2page.prizes.mainNote")}
              </p>

              <h3
                className={`${vipnagorgialla.className} font-bold italic text-xl text-[#00A3E0] uppercase mb-2`}
              >
                {t("cs2page.prizes.secondTitle")}
              </h3>
              <ul className="text-[#EEE5E5]/80 mb-2">
                <li>1. koht - 500€, 100€ inimese kohta, 66.6...(6)% ehk 2/3 auhinnafondist.</li>
                <li>2. koht - 250€, 50€ inimese kohta, 33.3...(3)% ehk 1/3 auhinnafondist.</li>
              </ul>
              <p className="text-[#EEE5E5]/60 text-sm">
                {t("cs2page.prizes.secondNote")}
              </p>
            </section>

            {/* TURNIIRI FORMAAT */}
            <section id="format" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.format.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-4">
                {t("cs2page.format.description")}
              </p>
              <p className="text-[#EEE5E5]/80">
                {t("cs2page.format.day1")}
              </p>
              <p className="text-[#EEE5E5]/80">
                {t("cs2page.format.day23")}
              </p>
            </section>

            {/* VRS INFO */}
            <section id="vrs" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.vrs.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-4">
                {t("cs2page.vrs.description1")}
              </p>
              <p className="text-[#EEE5E5]/80">
                {t("cs2page.vrs.description2")}
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.faq.title")}
              </h2>
              <h3
                className={`${vipnagorgialla.className} font-bold italic text-lg text-[#EEE5E5] uppercase mb-2`}
              >
                {t("cs2page.faq.q1")}
              </h3>
              <p className="text-[#EEE5E5]/80 mb-4">
                {t("cs2page.faq.a1")}
              </p>
            </section>

            {/* REEGLID */}
            <section id="rules" className="mb-12">
              <h2
                className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-[#EEE5E5] uppercase mb-4`}
              >
                {t("cs2page.rules.title")}
              </h2>
              <p className="text-[#EEE5E5]/80 mb-6">
                {t("cs2page.rules.description")}
              </p>

              <CS2Rules sections={t.raw("cs2page.rules.sections")} />

              <div className="mt-8">
                <p className="text-[#EEE5E5]/80 mb-2">{t("cs2page.rules.contact")}</p>
                <p className="text-[#00A3E0] font-bold">{t("cs2page.rules.contactName")}</p>
                <p className="text-[#EEE5E5]/70">{t("cs2page.rules.contactRole")}</p>
                <p className="text-[#EEE5E5]/70">
                  Discord:{" "}
                  <a
                    href="https://discord.com/users/292372329747710013"
                    target="_blank"
                    className="text-[#00A3E0] hover:text-[#EEE5E5] transition"
                  >
                    hrkruger
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
