import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

const Footer = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center sm:justify-between px-6 py-8 md:px-12 md:py-16 gap-4 md:gap-8">
      <div className="flex md:items-center gap-8 md:gap-0 justify-between flex-col md:flex-row">
        <div className="flex flex-col items-start md:items-center">
          <Image
            src="/tipilan-white.svg"
            width={250}
            height={36}
            alt="TipiLAN Logo"
            className="h-9 dark:hidden"
          />
          <Image
            src="/tipilan-dark.svg"
            width={250}
            height={36}
            alt="TipiLAN Logo"
            className="h-9 not-dark:hidden"
          />
        </div>
        {/* Social media */}
        <div className="flex flex-row">
          <a
            href="https://discord.gg/tipilan"
            target="_blank"
            className="mx-4 ml-0 md:ml-4"
            rel="noopener noreferrer"
          >
            <SiDiscord
              title="Discord"
              size={"2em"}
              className="text-[#2A2C3F] dark:text-[#EEE5E5]  hover:text-[#007CAB] hover:dark:text-[#00A3E0] transition"
            />
          </a>
          <a
            href="https://instagram.com/tipilan.ee"
            target="_blank"
            className="mx-4"
            rel="noopener noreferrer"
          >
            <SiInstagram
              title="Instagram"
              size={"2em"}
              className="text-[#2A2C3F] dark:text-[#EEE5E5] hover:text-[#007CAB] hover:dark:text-[#00A3E0] transition"
            />
          </a>
          <a
            href="https://facebook.com/tipilan.ee"
            target="_blank"
            className="mx-4"
            rel="noopener noreferrer"
          >
            <SiFacebook
              title="Facebook"
              size={"2em"}
              className="text-[#2A2C3F] dark:text-[#EEE5E5] hover:text-[#007CAB] hover:dark:text-[#00A3E0] transition"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <h2
          className={`text-3xl sm:text-4xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
        >
          {t("footer.contact")}
        </h2>
        <div className="flex flex-row justify-between gap-4 items-center">
          <div>
            <h3 className="text-xl font-bold">{t("footer.studentUnion")}</h3>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row gap-2">
                <span className="material-symbols-outlined !font-bold text-[#007CAB] dark:text-[#00A3E0]">
                  mail
                </span>
                <a href="mailto:tipilan@ituk.ee" className="underline">
                  tipilan@ituk.ee
                </a>
              </div>
              <div className="flex flex-row gap-2">
                <span className="material-symbols-outlined !font-bold text-[#007CAB] dark:text-[#00A3E0]">
                  phone
                </span>
                <a href="tel:+37256931193" className="underline">
                  +372 5693 1193
                </a>
              </div>
            </div>
            <h3 className="text-xl font-bold pt-4">
              {t("footer.organization")}
            </h3>
            <div>
              <p>
                {t("footer.registrationCode")}:{" "}
                <span className="font-semibold text-[#007CAB] dark:text-[#00A3E0]">
                  80391807
                </span>
              </p>
              <p className="">ICO-210, Raja tn 4c, Tallinn, Harjumaa, 12616</p>
            </div>
          </div>
        </div>
        <div className="block align-middle text-center pt-16">
          {t("footer.madeBy")}{" "}
          <a
            target="_blank"
            href="https://lapikud.ee/"
            className="text-[#E3983E] font-bold"
          >
            MTÜ Lapikud
          </a>{" "}
          {t("footer.withHelpFrom")}{" "}
          <a
            target="_blank"
            href="https://ituk.ee/"
            className="bg-[#7B1642] font-bold not-dark:text-white"
          >
            MTÜ For Tsükkel/ITÜK
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
