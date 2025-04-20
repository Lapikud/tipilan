import { vipnagorgialla } from "./layout";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="border-b-3 border-[#007CAB] flex">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-64"/>
      </div>
      {/* Grid of buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border-[#007CAB]">
        <div className="p-12 border-b-3 lg:border-r-3 border-[#007CAB] hover:bg-[#007CAB] transition-colors">
          <button className="cursor-pointer">
            <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic mb-16 text-[#2A2C3F] flex items-center`}>
              Ajakava →
            </h2>
          </button>
          <p className="text-xl">
            TipiLAN on pungil põnevatest turniiridest, mini-võistlustest, loengutest ja paljust muust.
          </p>
        </div>

        <div className="p-12 border-b-3 lg:border-r-3 border-[#007CAB] hover:bg-[#007CAB] transition-colors">
          <button className="cursor-pointer">
            <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] mb-16 flex items-center`}>
              Turniirid →
            </h2>
          </button>
          <p className="text-xl">
            TipiLANil toimuvad suurejoonelised CS2 ja Lol turniirid, mille auhinnafondid on 5000 €
          </p>
        </div>

        <div className="p-12 border-b-3 border-[#007CAB] hover:bg-[#007CAB] transition-colors">
          <button className="cursor-pointer">
            <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic mb-16 text-[#2A2C3F] flex items-center`}>
              Messiala →
            </h2>
          </button>
          <p className="text-xl">
            TipiLANi messialal paiknevad ettevõtted, lisategevused ja toimuvad loengud.
          </p>
        </div>
      </div>
      {/* Date */}
      <div className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#007CAB] hover:bg-[#007CAB] group transition-colors`}>
        <button className="cursor-pointer text-left">
          <h3 className="text-5xl text-[#2A2C3F] pb-8">
            Broneeri oma koht juba täna. →
          </h3>
        </button>
        <h2 className="text-6xl text-[#007CAB] group-hover:text-[#EEE5E5] transition-colors">
          24.-26. okt.
        </h2>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between h-60 px-12">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-16"/>
        {/* Social media */}
        <div className="flex flex-row">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/discord.svg" alt="Twitch" className="h-8 mx-4"/>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" className="h-8 mx-4"/>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.svg" alt="Facebook" className="h-8 mx-4"/>
          </a>
        </div>
      </div>
    </div>
  );
}