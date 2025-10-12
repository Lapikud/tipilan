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
  const headingStyle = `text-3xl md:text-5xl lg:text-5xl ${vipnagorgialla.className} font-bold uppercase text-[#2A2C3F] dark:text-[#EEE5E5] -skew-x-2 md:-skew-x-5 break-normal`;

  const miniTournaments: {
    name: string;
    prize: string;
    image: string;
    objectPosition?: string;
    bgClass?: string;
  }[] = [
    {
      name: "Tekken 8",
      prize: "200€",
      image: "/images/miniturniirid/tekken8.jpg",
      objectPosition: "object-center",
    },
    {
      name: "WRC",
      prize: "350€",
      image: "/images/miniturniirid/wrc.jpg",
      objectPosition: "object-center",
    },
    {
      name: "Street Fighter 6",
      prize: "150€",
      image: "/images/miniturniirid/street_fighter.jpg",
      objectPosition: "object-center",
    },
    {
      name: "Gran Turismo",
      prize: "200€",
      image: "/images/miniturniirid/gran_turismo.jpg",
      objectPosition: "object-center",
    },
    {
      name: "FC 26",
      prize: "100€",
      image: "/images/miniturniirid/fc26.jpg",
      objectPosition: "object-center",
    },
    {
      name: "Dwarf Escape",
      prize: "50€",
      image: "/images/miniturniirid/dwarf_escape.png",
      objectPosition: "object-center",
      bgClass: "bg-black",
    },
    {
      name: "Buckshot Roulette",
      prize: "Merch",
      image: "/images/miniturniirid/buckshot_tournament.png",
      objectPosition: "object-center",
      bgClass: "bg-black",
    },
    {
      name: "2XKO",
      prize: "100€",
      image: "/images/miniturniirid/2xko.png",
      objectPosition: "object-top",
    },
    {
      name: "Super Smash Bros. Ultimate",
      prize: "100€",
      image: "/images/miniturniirid/super_smash_bros.jpg",
      objectPosition: "object-top",
    },
  ];

  return (
    <div className="flex flex-col min-h-[90vh] mt-16">
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic uppercase
                text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-8 m-6 md:m-16`}
      >
        {t("tournaments.title")}
      </h1>

      <div className="flex flex-col">

        {/* Mini-turniirid */}
        <div className="hover:bg-[#007CAB] py-8 md:py-16 border-b-[3px] border-[#1F5673] transition group">
          <div className="mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="-skew-x-2 md:-skew-x-5 mb-8">
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
                    className={`px-4 py-2 bg-[#00A3E0] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.mini.buyTicket")}
                  </button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {miniTournaments.map((tournament) => (
                <div key={tournament.name} className="text-center">
                    <Image
                      src={tournament.image}
                      alt={tournament.name}
                      width={400}
                      height={300}
                      className={`border-10 border-[#00A3E0] bg-black object-cover w-full aspect-video -skew-x-2 md:-skew-x-5 ${
                        tournament.objectPosition || "object-center"
                      }`}
                    />
                  <div className="-skew-x-2 md:-skew-x-5">
                    <p className="mt-2 font-semibold">{tournament.name} - {tournament.prize}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                    className={`px-4 py-2 bg-[#00A3E0] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
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
        <div className="hover:bg-[#007CAB] py-8 md:py-16 border-t-[3px] border-b-[3px] border-[#1F5673] transition group">
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
                    className={`px-4 py-2 bg-[#00A3E0] group-hover:bg-black cursor-pointer ${vipnagorgialla.className} font-bold italic text-[#ECE5E5]`}
                  >
                    {t("tournaments.lol.buyTicket")}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}