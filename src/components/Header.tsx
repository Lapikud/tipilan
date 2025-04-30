// Icons
import { MdClose, MdMenu } from "react-icons/md";

// Fonts
import { vipnagorgialla } from "@/app/layout";

const Header = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => (
    <header className="h-16 flex items-center bg-[#EEE5E5] border-b-3 border-[#007CAB] justify-between px-12 text-[#2A2C3F]">
        <button onClick={toggleSidebar}>
            {isOpen ? (
                <MdClose className="h-12 w-12 text-[#2A2C3F]" />
            ) : (
                <MdMenu className="h-12 w-12 text-[#2A2C3F]" />
            )}
        </button>
        <p className={`text-3xl ${vipnagorgialla.className} font-bold italic hidden`}>ENG</p>
    </header>
);

export default Header;
