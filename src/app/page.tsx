import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Title */}
      <div className="border-b-3 border-[#1F5673] grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center justify-between mt-18 gap-12 py-8">
        <Image
          src="/tipilan-white.svg"
          width={850}
          height={120}
          alt="TipiLAN Logo"
          className="px-8 py-8 md:px-12 md:py-14 dark:hidden w-[max(300px,min(100%,850px))] h-auto"
        />
        <Image
          src="/tipilan-dark.svg"
          width={850}
          height={120}
          alt="TipiLAN Logo"
          className="px-8 py-8 md:px-12 md:py-14 not-dark:hidden w-[max(300px,min(100%,850px))] h-auto2"
        />
        <div className="pr-12 hidden md:block text-right">
          <h3
            className={`text-[clamp(1.25rem,0.75rem+2.5vw,3.75rem)] ${vipnagorgialla.className} leading-[90%] font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F]`}
          >
            Auhinnafond
          </h3>
          <h2
            className={`text-[clamp(2rem,1.2rem+4vw,6rem)] ${vipnagorgialla.className} leading-[90%] font-bold italic text-[#007CAB] dark:text-[#00A3E0]`}
          >
            10 000€
          </h2>
        </div>
      </div>
      {/* Grid of buttons */}
      <div className="grid grid-cols-1 xl:grid-cols-3 border-[#1F5673]">
        <Link
          href="/ajakava"
          className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 lg:border-r-3 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
        >
          <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black dark:group-hover:text-[#2A2C3F]`}
            >
              Ajakava
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              event_note
            </span>
            <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLAN on pungil põnevatest turniiridest, mini-võistlustest ja
              paljust muust.
            </p>
          </div>
        </Link>
        <Link
          href="/turniirid"
          className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 lg:border-r-3 group border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition"
        >
          <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}
            >
              Turniirid
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              trophy
            </span>
            <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLANil toimuvad suurejoonelised CS2 ja LoL turniirid, mille
              auhinnafond on 10 000€.
            </p>
          </div>
        </Link>
        <Link
          href="/messiala"
          className="px-8 md:px-12 py-8 flex flex-col gap-4 border-b-3 border-[#1F5673] group hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] transition-all"
        >
          <div className="cursor-pointer flex flex-row justify-between gap-4 items-center">
            <h2
              className={`text-[clamp(2rem,1.8rem+1vw,3rem)] ${vipnagorgialla.className} font-bold italic uppercase dark:text-[#EEE5E5] text-[#2A2C3F] dark:group-hover:text-[#2A2C3F] group-hover:text-black`}
            >
              Messiala
            </h2>
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] group-hover:translate-x-2 dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5] transition">
              arrow_right_alt
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
              weekend
            </span>
            <p className="text-[clamp(0.875rem,0.75rem+0.5vw,1.25rem)] tracking-[-0.045rem] dark:group-hover:text-[#2A2C3F] group-hover:text-black">
              TipiLANi messialal paiknevad ettevõtted, lisategevused ja toimuvad
              loengud.
            </p>
          </div>
        </Link>
      </div>
      {/* Date */}
      <Link
        href="/piletid"
        className={`p-8 md:p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#1F5673] hover:bg-[#007CAB] dark:hover:bg-[#00A3E0] group transition`}
      >
        <div className="cursor-pointer text-left flex flex-row justify-between xl:justify-start gap-8">
          <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] dark:group-hover:text-[#2A2C3F] text-[#2A2C3F] group-hover:text-black">
            Bro&shy;neeri oma koht juba täna!
          </h3>
          <span className="material-symbols-outlined !text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] !font-bold text-[#007CAB] dark:text-[#00A3E0] hidden md:block group-hover:translate-x-2 group-hover:text-[#EEE5E5] dark:group-hover:text-[#EEE5E5] transition">
            arrow_right_alt
          </span>
        </div>
        <h2 className="text-[clamp(2.5rem,2.25rem+1.25vw,3.75rem)] text-[#007CAB] dark:text-[#00A3E0] dark:group-hover:text-[#EEE5E5] group-hover:text-[#EEE5E5]">
          24.-26. okt.
        </h2>
      </Link>
      {/* Sponsors */}
      <div
        className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#1F5673]`}
      >
        <div className="text-left flex flex-col justify-between xl:justify-start">
          <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black pb-8">
            TipiLANi tõmbab käima...
          </h3>
          <div className="flex flex-row flex-wrap gap-8 md:gap-18 items-center">
            <Link href="https://taltech.ee" target="_blank">
              <Image
                src="/sponsors/taltech-color.png"
                alt="Taltech (Tallinna Tehnikaülikool)"
                width={192}
                height={192}
                className="object-contain"
              />
            </Link>
            <Link href="https://www.redbull.com/ee-et/" target="_blank">
              <Image
                src="/sponsors/redbull.png"
                alt="Redbull"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            <Link href="https://www.alecoq.ee" target="_blank">
              <Image
                src="/sponsors/alecoq.svg"
                alt="Alecoq"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <Link href="https://www.simracing.ee/" target="_blank">
              <Image
                src="/sponsors/EVAL.png"
                alt="EVAL"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <Link href="https://balsnack.ee" target="_blank">
              <Image
                src="/sponsors/balsnack.svg"
                alt="Balsnack"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <Link
              href="https://www.rara.ee/sundmused/interaktiivne-videomangude-muuseum-lvlup/"
              target="_blank"
            >
              <Image
                src="/sponsors/lvlup_logo_export.svg"
                alt="LVLup!"
                width={192}
                height={192}
                className="object-contain"
              />
            </Link>
            <Link href="https://www.facebook.com/bfglOfficial" target="_blank">
              <Image
                src="/sponsors/BFGL.png"
                alt="BFGL"
                width={192}
                height={192}
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
