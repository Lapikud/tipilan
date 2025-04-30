import { SiDiscord, SiInstagram, SiFacebook } from "react-icons/si";

const Footer = () => (
    <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row h-60 px-12">
        <img src="/tipilan-white.svg" alt="TipiLAN Logo" className="h-16"/>
        {/* Social media */}
        <div className="flex flex-row">
            <a href="#" target="_blank" rel="noopener noreferrer">
                <SiDiscord title="Discord" size={'2em'} className="mx-4 text-[#2A2C3F]"/>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <SiInstagram title="Instagram" size={'2em'} className="mx-4 text-[#2A2C3F]"/>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <SiFacebook title="Facebook" size={'2em'} className="mx-4 text-[#2A2C3F]"/>
            </a>
        </div>
    </div>
);

export default Footer;