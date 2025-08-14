import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";

export default function Tourney() {
    const headingStyle = `text-3xl md:text-5xl lg:text-5xl ${vipnagorgialla.className} font-bold uppercase text-[#2A2C3F] dark:text-[#EEE5E5] -skew-x-2 md:-skew-x-5`;

    const SectionDivider = () => <hr className="border-t-[3px] border-[#1F5673]" />;

    return (
        <div className="flex flex-col min-h-[90vh] mt-16">
            <h1
                className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4 m-6 md:m-16`}
            >
                Turniirid
            </h1>

            {/*<p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">*/}
            {/*  Kui tahate oma oskusi proovile panna, siis vaadake siia tagasi! Rohkem*/}
            {/*  infot lähiajal.*/}
            {/*</p>*/}
            
            <div className="flex flex-col gap-8 md:gap-16">
                {/* CS2 turniir */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                    <div className="-skew-x-2 md:-skew-x-5">
                        <h2 className={`${headingStyle}`}>
                            CS2 turniir
                        </h2>
                        <p className={"text-2xl mb-4 text-neutral-500"}>
                            Toimumisaeg veel selgumisel
                        </p>
                        <p className="text-balance">
                            TipiLANil toimub Eesti ühe suurima auhinnafondiga CS2 turniire juba sel sügisel. Haara kaasa
                            sõbrad ja
                            saa osa adrenaliinirohkest kogemusest!
                        </p>
                        <br />
                        <p className="text-balance">
                            Auhinnafond on suuruses 5250€, mis jaotatakse TOP3 meeskonna vahel ära. Iga tiimiliige saab
                            vastavalt
                            saavutatud kohale auhinnaks kas 600€, 300€ või 150€.
                        </p>
                        <br />

                        <div className={"flex flex-row flex-wrap gap-8"}>
                            <Link href="/reeglid/cs2" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    LOE REEGLEID
                                </button>
                            </Link>
                            <a href="https://fienta.com/et/tipilan" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#007CAB] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    OSTA PILET
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

                <SectionDivider />


                {/* LoL turniir */}
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
                            LoL turniir
                        </h2>
                        <p className={"text-2xl mb-4 text-neutral-500"}>
                            Toimumisaeg veel selgumisel
                        </p>
                        <p className="text-balance">
                            TipiLANil toimub Eesti ühe suurima auhinnafondiga LoL turniire juba sel sügisel.
                            Haara kaasa sõbrad ja saa osa adrenaliinirohkest kogemusest!
                        </p>
                        <br />
                        <p className="text-balance">
                            Auhinnafond on suuruses 3500€, mis jaotatakse TOP3 meeskonna vahel ära. Iga tiimiliige saab
                            vastavalt saavutatud kohale auhinnaks kas 400€, 200€ või 100€.
                        </p>
                        <br />
                        <div className="flex flex-row flex-wrap gap-4 md:gap-8 justify-end">
                            <Link href="/kodukord" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    LOE REEGLEID
                                </button>
                            </Link>
                            <a href="https://fienta.com/et/tipilan" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#007CAB] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    OSTA PILET
                                </button>
                            </a>
                        </div>

           
                    </div>
                </div>

                <SectionDivider />

                {/* Mini-turniirid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mx-8 md:mx-16 lg:mx-32 xl:mx-48">
                    <div className="-skew-x-2 md:-skew-x-5">
                        <h2 className={`${headingStyle}`}>
                            Mini&shy;turniirid
                        </h2>
                        <p className={"text-2xl mb-4 text-neutral-500"}>
                            Toimumisaeg veel selgumisel
                        </p>
                        <p className="text-balance">
                            TipiLANil toimub mitmeid erinevaid lõbusaid ja võistlushimu tekitavaid miniturniire.
                            Miniturniirid toimuvad järgnevates mängudes: SimRacing, Tekken, FIFA, Minecraft Bedwars,
                            Buckshot Roulette, LostGamer ja palju muud.
                        </p>
                        <br />
                        <p className="text-balance">
                            Auhinnafond on kõigi turniiride peale 1250€ ja reeglina saab rahalise auhinna miniturniiri võitja.
                        </p>
                        <br />
                        <div className="flex flex-row flex-wrap gap-4 md:gap-8">
                            <Link href="/kodukord" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#1F5673] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    LOE REEGLEID
                                </button>
                            </Link>
                            <a href="https://fienta.com/et/tipilan" target="_blank">
                                <button
                                    className={`px-4 py-2 bg-[#007CAB] cursor-pointer ${vipnagorgialla.className} font-bold italic`}
                                >
                                    OSTA PILET
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

                <SectionDivider />
            </div>
        </div>
    );
}