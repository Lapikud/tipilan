import { vipnagorgialla } from "./layout";
import { MdEast, MdEmojiEvents, MdEventNote, MdWeekend } from "react-icons/md";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Title */}
      <div className="border-b-3 border-[#007CAB] flex items-center justify-between">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-64"/>
        <div className="pr-12 hidden 2xl:block">
          <h3 className={`text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F]`}>Auhinnafond</h3>
          <h2 className={`text-8xl ${vipnagorgialla.className} font-bold italic text-[#007CAB]`}>10 000€</h2>
        </div>
      </div>
      {/* Grid of buttons */}
      <div className="grid grid-cols-1 xl:grid-cols-3 border-[#007CAB] min-h-[33vh]">
        <div className="p-12 flex flex-col justify-between border-b-3 lg:border-r-3 group border-[#007CAB] hover:bg-[#007CAB] transition-all">
          <Link href="/timetable" prefetch={true}>
            <div className="cursor-pointer flex flex-row justify-between">
              <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] group-hover:text-black`}>
                Ajakava
              </h2>
              <MdEast size={'4em'} className="text-[#007CAB] group-hover:translate-x-2 -translate-y-2 group-hover:text-[#EEE5E5] transition-all"/>
            </div>
          </Link>
          <div>
            <MdEventNote size={'4em'} className="text-[#007CAB] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl group-hover:text-black">
              TipiLAN on pungil põnevatest turniiridest, mini-võistlustest, loengutest ja paljust muust.
            </p>
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between border-b-3 lg:border-r-3 group border-[#007CAB] hover:bg-[#007CAB] transition-all">
          <div className="cursor-pointer flex flex-row justify-between">
            <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] group-hover:text-black`}>
              Turniirid
            </h2>
            <MdEast size={'4em'} className="text-[#007CAB] group-hover:translate-x-2 -translate-y-2 group-hover:text-[#EEE5E5] transition-all"/>
          </div>
          <div>
            <MdEmojiEvents size={'4em'} className="text-[#007CAB] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl group-hover:text-black">
              TipiLANil toimuvad suurejoonelised Counter-Strike 2 ja League of Legends turniirid, mille auhinnafondid on 5000 €
            </p>
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between border-b-3 border-[#007CAB] group hover:bg-[#007CAB] transition-all">
          <div className="cursor-pointer flex flex-row justify-between">
            <h2 className={`text-5xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] group-hover:text-black`}>
              Messiala
            </h2>
            <MdEast size={'4em'} className="text-[#007CAB] group-hover:translate-x-2 -translate-y-2 group-hover:text-[#EEE5E5] transition-all"/>
          </div>
          <div>
            <MdWeekend size={'4em'} className="text-[#007CAB] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl group-hover:text-black">
              TipiLANi messialal paiknevad ettevõtted, lisategevused ja toimuvad loengud.
            </p>
          </div>
        </div>
      </div>
      {/* Date */}
      <div className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#007CAB] hover:bg-[#007CAB] group transition-all`}>
        <Link href="/tickets" prefetch={true}>
          <div className="cursor-pointer text-left flex flex-row justify-between xl:justify-start">
            <h3 className="text-5xl text-[#2A2C3F] group-hover:text-black pb-8">
              Broneeri oma koht juba täna!
            </h3>
            <MdEast size={'4em'} className="text-[#007CAB] ml-8 group-hover:translate-x-2 -translate-y-2 group-hover:text-[#EEE5E5] transition-all"/>
          </div>
        </Link>
        <h2 className="text-6xl text-[#007CAB] group-hover:text-[#EEE5E5]">
          24.-26. okt.
        </h2>
      </div>
      {/* Footer */}

    </div>
  );
}