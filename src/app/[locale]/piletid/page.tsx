import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Tickets({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
        <h1
          className={`text-4xl wrap-break-word md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4`}
        >
          {t("tickets.title")}
        </h1>
        
        <div className="flex justify-center lg:items-center flex-col lg:flex-row gap-8 md:gap-12 flex-grow mb-16 md:mt-8 lg:mt-0">
          <div className="bg-[#007CAB] -skew-x-2 md:-skew-x-5 text-white px-8 md:px-12 py-16 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]">
            <h2
              className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}
            >
              {t("tickets.computerParticipant.latePrice")}
            </h2>
            <h3
              className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}
            >
              {t("tickets.computerParticipant.title")}
            </h3>
            <ul className="pl-4 mb-8 list-[square] marker:text-[#1F5673]">
              {t
                .raw("tickets.computerParticipant.features")
                .map((feature: string, index: number) => (
                  <li key={index} className="text-xl italic">
                    {feature}
                  </li>
                ))}
            </ul>
            <Link href="https://fienta.com/et/tipilan" target="_blank">
              <button
                className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
              >
                {t("tickets.buyTicket")}
              </button>
            </Link>
          </div>
          
          <div className="bg-[#1F5673] -skew-x-2 md:-skew-x-5 text-gray-400 px-8 md:px-12 py-16  w-full md:w-xl lg:w-[400px]">
            <h2
              className={`text-4xl ${vipnagorgialla.className} font-bold italic pb-2`}
            >
              <s>{t("tickets.competitor.price")}</s>
            </h2>
            <h3
              className={`text-2xl ${vipnagorgialla.className} font-bold italic pb-4`}
            >
              <s>{t("tickets.competitor.title")}</s>
            </h3>
            <ul className="pl-4 mb-8 list-[square] marker:text-[#007CAB]">
              {t
                .raw("tickets.competitor.features")
                .map((feature: string, index: number) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
            </ul>
            {/*<Link href="https://fienta.com/et/tipilan" target="_blank">*/}
              <button
                className={`px-4 py-2 bg-[#007CAB] text-white ${vipnagorgialla.className} font-bold text-xl italic uppercase`}
              >
                {t("tickets.soldOut")}!
              </button>
            {/*</Link>*/}
          </div>

          <div className="bg-[#007CAB] -skew-x-2 md:-skew-x-5 text-white px-8 md:px-12 py-16 hover:scale-103 transition-all duration-150 w-full md:w-xl lg:w-[400px]">
            <h2
              className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-2`}
            >
              {t("tickets.visitor.latePrice")}
            </h2>
            <h3
              className={`text-3xl ${vipnagorgialla.className} font-bold italic text-[#EEE5E5] pb-4`}
            >
              {t("tickets.visitor.title")}
            </h3>
            <ul className="pl-4 mb-8 list-[square] marker:text-[#1F5673]">
              {t
                .raw("tickets.visitor.features")
                .map((feature: string, index: number) => (
                  <li key={index} className="text-xl">
                    {feature}
                  </li>
                ))}
            </ul>
            <Link href="https://fienta.com/et/tipilan" target="_blank">
              <button
                className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
              >
                {t("tickets.buyTicket")}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}
