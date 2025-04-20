// Icons
import { Menu } from "lucide-react";

// Fonts
import { vipnagorgialla } from "@/app/layout";

const Header = () => (
    <header className="h-16 flex items-center border-b-3 border-[#007CAB] justify-between px-12 text-[#2A2C3F]">
        <button>
            <Menu className="h-12 w-12 text-[#2A2C3F]" />
        </button>
        <p className={`text-3xl ${vipnagorgialla.className} font-bold italic`}>ENG</p>
    </header>
);

export default Header;
