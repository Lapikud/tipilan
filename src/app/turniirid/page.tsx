import {vipnagorgialla} from "@/components/Vipnagorgialla";

export default function Tourney() {
    const headingStyle = `text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5]`;

    const SectionDivider = () => <div className="border-b-[3px] border-[#1F5673] w-full"/>;

    return (
        <div className="flex flex-col min-h-[90vh] mt-16">
            <div className={"md:m-16"}>
                <h1
                    className={`text-5xl sm:text-6xl ${vipnagorgialla.className} 
                        font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] `}
                >
                    Turniirid
                </h1>
                
                {/*<p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5]">*/}
                {/*  Kui tahate oma oskusi proovile panna, siis vaadake siia tagasi! Rohkem*/}
                {/*  infot lähiajal.*/}
                {/*</p>*/}
                
                <div className={"flex flex-row flex-wrap gap-8 md:gap-38"}>
                    <div className={"-skew-x-2 md:-skew-x-5 pl-4 md:pl-28 md:w-180"}>
                        <h2 className={`${headingStyle} mt-12`}>
                            CS2 turniir
                        </h2>
                        <p className={"text-xs mb-4 text-neutral-500"}>
                            Toimumisaeg veel selgumisel
                        </p>
                        <p>
                            TipiLANil toimub Eesti ühe suurima auhinnafondiga CS2 turniire juba sel sügisel. Haara kaasa
                            sõbrad ja
                            saa osa adrenaliinirohkest kogemusest!
                        </p>
                        <br/>
                        <p>
                            Auhinnafond on suuruses 5250€, mis jaotatakse TOP3 meeskonna vahel ära. Iga tiimiliige saab
                            vastavalt
                            saavutatud kohale auhinnaks kas 600€, 300€ või 150€.
                        </p>
                    </div>
                </div>
            </div>

            <SectionDivider/>

            <div className={"flex flex-row gap-8 md:gap-38 mt-8 mb-12"}>
                <div className={"pl-4 md:pl-40 md:w-180"}></div>
                {/* Image placeholder */}
                <div className={"-skew-x-2 md:-skew-x-5 flex-auto md:w-180 pr-4 md:pr-42 text-right"}>
                    <h2 className={`${headingStyle}`}>
                        LoL turniir
                    </h2>
                    <p className={"text-xs mb-4 text-neutral-500"}>
                        Toimumisaeg veel selgumisel
                    </p>
                    <p>
                        TipiLANil toimub Eesti ühe suurima auhinnafondiga LoL turniire juba sel sügisel.
                        Haara kaasa sõbrad ja saa osa adrenaliinirohkest kogemusest!
                    </p>
                    <br/>
                    <p>
                        Auhinnafond on suuruses 3500€, mis jaotatakse TOP3 meeskonna vahel ära. Iga tiimiliige saab
                        vastavalt saavutatud kohale auhinnaks kas 400€, 200€ või 100€.
                    </p>
                </div>
            </div>

            <SectionDivider/>

            <div className={"-skew-x-2 md:-skew-x-5 pl-4 md:pl-40 md:w-180 mt-8 mb-12"}>
                <h2 className={`${headingStyle}`}>
                    Miniturniirid
                </h2>
                <p className={"text-xs mb-4 text-neutral-500"}>
                    Toimumisaeg veel selgumisel
                </p>
                <p>
                    TipiLANil toimub mitmeid erinevaid lõbusaid ja võistlushimu tekitavaid miniturniire.
                    Miniturniirid toimuvad järgnevates mängudes: Tetris, SimRacing, Tekken. FIFA, Minecraft Bedwards,
                    Buckshot Roulette, LostGamer.
                </p>
                <br/>
                <p>
                    Auhinnafond on kõigi turniiride peale 1250€ ja reeglina saab rahalise auhinna miniturniiri võitja.
                </p>
            </div>

            <SectionDivider/>

        </div>
    );
}
