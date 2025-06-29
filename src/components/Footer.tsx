import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";
import Image from "next/image";

// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

const Footer = () => (
  <div className="flex flex-col justify-center sm:justify-between px-12 py-16 gap-8">
    <div className="flex items-center justify-center sm:justify-between">
      <div className="flex flex-col gap-4 items-center">
        <Image
          src="/tipilan-white.svg"
          width={300}
          height={50}
          alt="TipiLAN Logo"
          className="h-9 ml-3 dark:hidden"
        />
        <Image
          src="/tipilan-dark.svg"
          width={300}
          height={50}
          alt="TipiLAN Logo"
          className="h-9 ml-3 not-dark:hidden"
        />
      </div>
      {/* Social media */}
      <div className="flex flex-row">
        <a
          href="https://discord.gg/eB7sVqgJ9b"
          target="_blank"
          className="mx-4"
          rel="noopener noreferrer"
        >
          <SiDiscord
            title="Discord"
            size={"2em"}
            className="text-[#2A2C3F] dark:text-[#EEE5E5]"
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
            className="text-[#2A2C3F] dark:text-[#EEE5E5]"
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
            className="text-[#2A2C3F] dark:text-[#EEE5E5]"
          />
        </a>
      </div>
    </div>
    <div className="flex flex-col gap-4 ml-9">
      <h2
        className={`text-3xl sm:text-4xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
      >
        Kontakt
      </h2>
      <div className="flex flex-row justify-between gap-4 items-center">
        <div>
          <h3 className="text-xl font-bold">IT-teaduskonna üliõpilaskogu</h3>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row gap-2">
              <span className="material-symbols-outlined !font-bold text-[#007CAB] dark:text-[#00A3E0]">
                mail
              </span>
              <a href="mailto:kontakt@ituk.ee" className="underline">
                kontakt@ituk.ee
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
          <h3 className="text-xl font-bold pt-4">MTÜ For Tsükkel</h3>
          <div>
            <p className="text-[#aaa]">
              Registrikood:{" "}
              <span className="font-semibold text-[#007CAB] dark:text-[#00A3E0]">
                80391807
              </span>
            </p>
            <p className="text-[#aaa]">
              ICO-210, Raja tn 4c, Tallinn, Harjumaa, 12616
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
