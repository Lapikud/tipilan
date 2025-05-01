import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";
import Image from "next/image";

const Footer = () => (
    <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row px-12 py-16 gap-8">
        <div className="flex flex-col gap-4 items-center">
            <Image
                src="/tipilan-white.svg"
                width={300}
                height={50}
                alt="TipiLAN Logo"
                className="h-16 dark:hidden"
            />
            <Image
                src="/tipilan-dark.svg"
                width={300}
                height={50}
                alt="TipiLAN Logo"
                className="h-9 ml-3 not-dark:hidden"
            />
            <p>Kontakt: <a href="mailto:tipilan@ituk.ee" className="underline">tipilan@ituk.ee</a></p>
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
);

export default Footer;
