import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";
import { useTranslations } from "next-intl";

// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

const Footer = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center sm:justify-between px-6 py-6 md:px-12 md:py-8 gap-4 border-t-3 border-[#1F5673]">
      <div className="flex flex-col">
        <h2
          className={`text-3xl sm:text-4xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mb-4 text-center sm:text-left`}
        >
          {t("footer.contact")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start w-full">
          <div className="text-center sm:text-left sm:justify-self-start">
            <h3 className="text-xl font-bold">MTÜ Lapikud</h3>
            <div className="flex flex-col gap-2 mt-2">
              <p>
                {t("footer.registrationCode")}:{" "}
                <span className="font-semibold text-[#007CAB] dark:text-[#00A3E0]">
                  80167145
                </span>
              </p>
              <p className="">Swedbank EE842200221094704780</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center text-center sm:justify-self-center">
            <div className="flex flex-row gap-2">
              <span className="material-symbols-outlined font-bold! text-[#007CAB] dark:text-[#00A3E0]">
                mail
              </span>
              <a href="mailto:tipilaninfogmail.com" className="underline">
                tipilaninfo@gmail.com
              </a>
            </div>
            <div className="flex flex-row gap-2">
              <span className="material-symbols-outlined font-bold! text-[#007CAB] dark:text-[#00A3E0]">
                phone
              </span>
              <a href="tel:+37256931193" className="underline">
                +372 5693 1193
              </a>
            </div>
          </div>
          {/* Social media */}
          <div className="flex flex-row gap-4 justify-center sm:justify-self-end sm:justify-end">
            <a
              href="https://discord.gg/pPhhatZAfA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiDiscord
                title="Discord"
                size={"2em"}
                className="text-[#2A2C3F] dark:text-[#EEE5E5] hover:text-[#007CAB] hover:dark:text-[#00A3E0] transition"
              />
            </a>
            <a
              href="https://instagram.com/tipilan.ee"
              target="_blank"
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
      </div>
    </div>
  );
};

export default Footer;
