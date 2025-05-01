import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";

const Footer = () => (
    <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row h-60 px-12">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-16 dark:hidden"/>
        <img src="/tipilan-dark.svg" alt="TipiLAN Logo" className="h-9 ml-3 not-dark:hidden"/>
        {/* Social media */}
        <div className="flex flex-row">
            <a href="https://discord.gg/eB7sVqgJ9b" target="_blank" rel="noopener noreferrer">
                <SiDiscord title="Discord" size={'2em'} className="mx-4 text-[#2A2C3F] dark:text-[#EEE5E5]"/>
            </a>
            <a href="https://instagram.com/tipilan.ee" target="_blank" rel="noopener noreferrer">
                <SiInstagram title="Instagram" size={'2em'} className="mx-4 text-[#2A2C3F] dark:text-[#EEE5E5]"/>
            </a>
            <a href="https://facebook.com/tipilan.ee" target="_blank" rel="noopener noreferrer">
                <SiFacebook title="Facebook" size={'2em'} className="mx-4 text-[#2A2C3F] dark:text-[#EEE5E5]"/>
            </a>
        </div>
    </div>
);

export default Footer;