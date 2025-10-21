import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";

interface SponsorsProps {
  showTitle?: boolean;
  className?: string;
}

export default function Sponsors({ showTitle = true, className = "" }: SponsorsProps) {
  const t = useTranslations();

  return (
    <div
      className={`p-12 flex flex-col ${vipnagorgialla.className} font-bold italic border-b-3 border-[#1F5673] ${className}`}
    >
      <div className="text-left flex flex-col justify-between xl:justify-start">
        {showTitle && (
          <h3 className="text-4xl md:text-5xl dark:text-[#EEE5E5] text-[#2A2C3F] group-hover:text-black pb-8">
            {t("home.sections.poweredBy")}
          </h3>
        )}
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-18 items-center justify-center xl:justify-start">
          <NextLink href="https://taltech.ee" target="_blank">
            <Image
              src="/sponsors/taltech-color.png"
              alt="Taltech (Tallinna Tehnikaülikool)"
              width={192}
              height={192}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.redbull.com/ee-et/" target="_blank">
            <Image
              src="/sponsors/redbull.png"
              alt="Redbull"
              width={80}
              height={80}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.alecoq.ee" target="_blank">
            <Image
              src="/sponsors/alecoq.svg"
              alt="Alecoq"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.simracing.ee/" target="_blank">
            <Image
              src="/sponsors/EVAL.png"
              alt="EVAL"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://balsnack.ee" target="_blank">
            <Image
              src="/sponsors/balsnack.svg"
              alt="Balsnack"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink
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
          </NextLink>
          <NextLink
            href="https://www.facebook.com/bfglOfficial"
            target="_blank"
          >
            <Image
              src="/sponsors/BFGL.png"
              alt="BFGL"
              width={192}
              height={192}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.tallinn.ee/et/haridus" target="_blank">
            <Image
              src="/sponsors/Tallinna_Haridusamet_logo_RGB.svg"
              alt="Tallinna Haridusamet"
              width={292}
              height={292}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.militaarseiklus.ee/" target="_blank">
            <Image
              src="/sponsors/militaarseiklus.png"
              alt="Militaarseiklus"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.linkedin.com/company/gamedev-guild/" target="_blank">
            <Image
              src="/sponsors/estonian_gamedev_guild.png"
              alt="Estonian Gamedev Guild"
              width={200}
              height={200}
              className="object-contain not-dark:invert"
            />
          </NextLink>
          <NextLink href="https://thotell.ee/" target="_blank">
            <Image
              src="/sponsors/thotell.png"
              alt="Tahentorni Hotell (Tähentorni Hotel)"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.dominos.ee/" target="_blank">
            <Image
              src="/sponsors/dominos.png"
              alt="Domino's Pizza"
              width={250}
              height={250}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://www.tomorrow.ee/" target="_blank">
            <Image
              src="/sponsors/nt.png"
              alt="Network Tomorrow"
              width={300}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://driftikeskus.ee/" target="_blank">
            <Image
              src="/sponsors/driftikeskus.png"
              alt="Driftikeskus"
              width={300}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://ingame.ee/" target="_blank">
            <Image
              src="/sponsors/ingame.png"
              alt="Ingame"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://alzgamer.ee/" target="_blank">
            <Image
              src="/sponsors/alzgamer.png"
              alt="AlzGamer"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://k-space.ee/" target="_blank">
            <Image
              src="/sponsors/k-space_ee-white.png"
              alt="K-Space"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          <NextLink href="https://globalproductions.ee/" target="_blank">
            <Image
              src="/sponsors/Global-productions.png"
              alt="Global Productions"
              width={200}
              height={200}
              className="object-contain"
            />
          </NextLink>
          
        </div>
      </div>
    </div>
  );
}
