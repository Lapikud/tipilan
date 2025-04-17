import React from "react";

const HomeComponent = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Logo/title section */}
        <div className="mb-12">
            <h1 className="text-5xl font-bold text-center">
                TIPI
                <span className="text-blue-500">
                    LAN
                </span>
            </h1>
        </div>

        {/* Three middle sections */}
        <div className="flex flex-col md:flex-row overflow-hidden border-1 shadow-md">
            <div className="flex-1 p-6 border-r border-indigo-100 w-full md:w-[33.33%]">
                <h1 className="text-2xl font-bold mb-4 flex items-center ">
                    Ajakava →
                </h1>
                <p className="">
                    TipiLAN on pungil põnevatest turniiridest, mini-võistlustest, loengutest ja paljust muust.
                </p>
            </div>

            <div className="flex-1 bg-white-50 p-6 border-r border-indigo-100 w-full md:w-[33.33%]">
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    Turniirid →
                </h1>
                <p className="">
                    TipiLANil toimuvad suurejoonelised CS2 ja Lol turniirid, mille auhinnafondid on 5000 €
                </p>
            </div>

            <div className="flex-1 bg-white-50 p-6 w-full md:w-[33.33%]">
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    Messiala →
                </h1>
                <p className="">
                    TipiLANi messialal paiknevad ettevõtted, lisategevused ja toimuvad loengud.
                </p>
            </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row overflow-hidden shadow-md">
            <div className="flex-1 bg-white-100 p-8 border-r border-indigo-100 w-full md:w-[66.66%]">
                <h1 className="text-3xl font-bold mb-6">Suurem kui eales varem.</h1>
                <p className="text-lg">
                    TalTechi üliõpilasorganisatsioonid korraldavad esimest korda <u>koos</u> LANi ning see tuleb enneolematu.
                    Tänu organisatsioonideülesele koostööle sünnib üks Eesti suurimatest võrgupidududest. Kutsu oma sõbrad ja olge valmis!
                </p>
            </div>
            <div className="flex items-center justify-center p-8 w-full md:w-[33.33%]">
                <div className="text-4xl font-bold text-center text-blue-500">24.-26. okt.</div>
            </div>
        </div>
    </div>
);

export default HomeComponent;
