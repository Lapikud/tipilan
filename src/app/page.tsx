import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { MdEast, MdEmojiEvents, MdEventNote, MdWeekend } from "react-icons/md";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Title */}
      <div className="border-b-3 border-[#007CAB] dark:border-[#00A3E0] flex items-center justify-between pt-18">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-64 dark:hidden"/>
        <img src="/tipilan-dark.svg" alt="TipiLAN Logo" className="h-36 mx-12 my-14 not-dark:hidden"/>
        <div className="pr-12 hidden 2xl:block">
          <h3 className={`text-6xl ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F]`}>Auhinnafond</h3>
          <h2 className={`text-8xl ${vipnagorgialla.className} font-bold italic text-[#007CAB] dark:text-[#00A3E0]`}>10 000€</h2>
        </div>
      </div>
      {/* Grid of buttons */}
      <div className="grid grid-cols-1 xl:grid-cols-3 border-[#007CAB] dark:border-[#00A3E0] min-h-[33vh]">
        <div className="p-12 flex flex-col justify-between border-b-3 lg:border-r-3 group border-[#007CAB] dark:border-[#00A3E0] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition">
          <Link href="/timetable" prefetch={true}>
            <div className="cursor-pointer flex flex-row justify-between">
              <h2 className={`text-4xl md:text-5xl ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black dark:group-hover:text-[#2A2C3F]`}>
                Ajakava
              </h2>
              <MdEast size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 -translate-y-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition"/>
            </div>
          </Link>
          <div>
            <MdEventNote size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLAN on pungil põnevatest turniiridest, mini-võistlustest, loengutest ja paljust muust.
            </p>
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between border-b-3 lg:border-r-3 group border-[#007CAB] dark:border-[#00A3E0] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition">
          <Link href="/tourney" prefetch={true}>
            <div className="cursor-pointer flex flex-row justify-between">
              <h2 className={`text-4xl md:text-5xl ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}>
                Turniirid
              </h2>
              <MdEast size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 -translate-y-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition"/>
            </div>
          </Link>
          <div>
            <MdEmojiEvents size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLANil toimuvad suurejoonelised Counter-Strike 2 ja League of Legends turniirid, mille auhinnafond on 10 000€.
            </p>
          </div>
        </div>

        <div className="p-12 flex flex-col justify-between border-b-3 border-[#007CAB] dark:border-[#00A3E0] group hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition-all">
          <Link href="/expo" prefetch={true}>
            <div className="cursor-pointer flex flex-row justify-between">
              <h2 className={`text-4xl md:text-5xl ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}>
                Messiala
              </h2>
              <MdEast size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 -translate-y-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition"/>
            </div>
          </Link>
          <div>
            <MdWeekend size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] mb-4"/>
            <p className="text-xl dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLANi messialal paiknevad ettevõtted, lisategevused ja toimuvad loengud.
            </p>
          </div>
        </div>
      </div>
      {/* Date */}
      <div className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#007CAB] dark:border-[#00A3E0] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] group transition`}>
        <Link href="/tickets" prefetch={true}>
          <div className="cursor-pointer text-left flex flex-row justify-between xl:justify-start">
            <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] dark:group-hover:text-[#2A2C3F] text-[#2A2C3F] group-hover:text-black pb-8">
              Broneeri oma koht juba täna!
            </h3>
            <MdEast size={'4em'} className="text-[#007CAB] dark:text-[#00A3E0] hidden md:block ml-8 group-hover:translate-x-2 -translate-y-2 group-hover:text-[#EEE5E5] dark:group-hover:text-[#EEE5E5] transition"/>
          </div>
        </Link>
        <h2 className="text-6xl text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
          24.-26. okt.
        </h2>
      </div>
      {/* Sponsors */}
      <div className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#007CAB] dark:border-[#00A3E0]`}>
        <div className="text-left flex flex-col justify-between xl:justify-start">
          <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black pb-8">
            TipiLANi tõmbab käima...
          </h3>
          <div className="flex flex-row gap-12">
            <img src="/sponsors/taltech-color.png" alt="Taltech (Tallinna Tehnikaülikool)" className="h-48 w-48 object-contain"/>
            <img src="/sponsors/redbull.png" alt="Redbull" className="h-48 w-48 object-contain"/>
          </div>
        </div>
      </div>
    </div>
  );
}