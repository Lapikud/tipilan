import { vipnagorgialla } from "@/components/Vipnagorgialla";
import SectionDivider from "@/components/SectionDivider";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NextLink from "next/link";

export default async function RulesMenu({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const headingStyle = `text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] uppercase`;

  const boxStyle = `-skew-x-2 md:-skew-x-5 text-white md:px-12 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]`;

  const boxTextStyle = `text-3xl ${vipnagorgialla.className} font-bold uppercase text-[#EEE5E5] pb-2`;

  // const SectionDivider = () => <div className="border-b-[3px] border-[#1F5673] w-full"/>;

  return (
    <div>
      <div className="flex flex-col md:m-16">
        <h1 className={`${headingStyle} ml-3 mt-24 md:ml-0 md:mt-16 mb-4 px-4`}>
          {t("rules.title")}
        </h1>

        <div className="flex flex-wrap flex-row lg:mt-16 justify-center lg:items-start gap-12 flex-grow mb-8">
          <NextLink href="/kodukord">
            <div className={`${boxStyle} bg-[#007CAB] py-20 px-8`}>
              <h2 className={`${boxTextStyle}`}>{t("rules.houseRules")}</h2>
            </div>
          </NextLink>

          <NextLink href="/reeglid/cs2">
            <div className={`${boxStyle} bg-[#1F5673] py-20 px-8`}>
              <h2 className={`${boxTextStyle}`}>{t("rules.cs2Rules")}</h2>
            </div>
          </NextLink>

          <NextLink href="reeglid/lol">
            <div className={`${boxStyle} bg-[#007CAB] py-20 px-8`}>
              <h2 className={`${boxTextStyle}`}>{t("rules.lolRules")}</h2>
            </div>
          </NextLink>

          {/* Minitourn. link coming soon*/}
          {/*<Link href="">*/}
          <div className={`${boxStyle} bg-[#1F5673] py-16 px-8`}>
            <h2 className={`${boxTextStyle}`}>
              {t("tournaments.mini.titleSingular")} {t("rules.title")}
            </h2>
          </div>
          {/*</Link>*/}
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}
