import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Tourney({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const headingStyle = `text-3xl md:text-5xl lg:text-5xl ${vipnagorgialla.className} font-bold uppercase text-[#2A2C3F] dark:text-[#EEE5E5] -skew-x-2 md:-skew-x-5`;

  return (
    <div className="flex flex-col min-h-[90vh] mt-16">
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic uppercase
                text-[#2A2C3F] dark:text-[#EEE5E5] md:m-16`}
      >
        {t("tournaments.title")}
      </h1>

      <div className="flex flex-col">
        {/* CS2 turniir */}
        <div className="hover:bg-[#007CAB] py-8 md:py-16 transition group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="-skew-x-2 md:-skew-x-5">
              <h2 className={`${headingStyle}`}>
                {t("tournaments.cs2.title")}
              </h2>
              <p
                className={
                  "text-2xl mb-4 text-neutral-500 group-hover:text-black"
                }
              >
                {t("tournaments.cs2.timing")}
              </p>
              <p className="text-balance">
                {t("tournaments.cs2.description1")}
              </p>
              <br />
              <p className="text-balance">
                {t("tournaments.cs2.description2")}
              </p>
              <p className="text-balance">
                {t("tournaments.cs2.description3")}
              </p>
              <br />

              <div className={"flex flex-row flex-wrap gap-8"}>
                <Link href="/reeglid/cs2" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.cs2.readRules")}
                  </button>
                </Link>
                <a href="https://fienta.com/et/tipilan" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#007CAB] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.cs2.buyTicket")}
                  </button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                {/* Outside div needs to remain so that overflow won't occur*/}
                <Image
                  src="/images/cs2_tournament_logo.png"
                  alt="CS2 tournament"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LoL turniir */}
        <div className="hover:bg-[#007CAB] py-8 md:py-16 border-t-[3px] border-[#1F5673] transition group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="hidden md:block">
              <div>
                {/* Outside div needs to remain so that overflow won't occur*/}
                <Image
                  src="/images/lol_tournament_logo.png"
                  alt="LoL tournament"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="flex-auto text-right -skew-x-2 md:-skew-x-5">
              <h2 className={`${headingStyle}`}>
                {t("tournaments.lol.title")}
              </h2>
              <p
                className={
                  "text-2xl mb-4 text-neutral-500 group-hover:text-black"
                }
              >
                {t("tournaments.lol.timing")}
              </p>
              <p className="text-balance">
                {t("tournaments.lol.description1")}
              </p>
              <br />
              <p className="text-balance">
                {t("tournaments.lol.description2")}
              </p>
              <br />
              <div className="flex flex-row flex-wrap gap-4 md:gap-8 justify-end">
                <Link href="/reeglid/lol" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.lol.readRules")}
                  </button>
                </Link>
                <a href="https://fienta.com/et/tipilan" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#007CAB] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.lol.buyTicket")}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mini-turniirid */}
        <div className="hover:bg-[#007CAB] py-8 md:py-16 border-t-[3px] border-b-[3px] border-[#1F5673] transition group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="-skew-x-2 md:-skew-x-5">
              <h2 className={`${headingStyle}`}>
                {t("tournaments.mini.title")}
              </h2>
              <p
                className={
                  "text-2xl mb-4 text-neutral-500 group-hover:text-black"
                }
              >
                {t("tournaments.mini.timing")}
              </p>
              <p className="text-balance">
                {t("tournaments.mini.description1")}
              </p>
              <br />
              <p className="text-balance">
                {t("tournaments.mini.description2")}
              </p>
              <br />
              <div className="flex flex-row flex-wrap gap-4 md:gap-8">
                <Link href="/kodukord" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.mini.readRules")}
                  </button>
                </Link>
                <a href="https://fienta.com/et/tipilan" target="_blank">
                  <button
                    className={`px-4 py-2 bg-[#007CAB] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.mini.buyTicket")}
                  </button>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                {/* Outside div needs to remain so that overflow won't occur*/}
                <Image
                  src="/images/minitournament_logo.png"
                  alt="mini tournaments"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
