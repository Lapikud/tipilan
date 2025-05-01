'use client';

// Icons
import { MdClose, MdMenu, MdSunny, MdModeNight } from "react-icons/md";

// Theme Provider
import { useTheme } from "next-themes"

// Shadcn UI
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Fonts
// import { vipnagorgialla } from "@/components/Vipnagorgialla";

const Header = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
    const { setTheme } = useTheme();

    return (
        <header className="px-8 py-2 md:px-12 flex items-center bg-[#EEE5E5] dark:bg-[#0E0F19] border-b-3 border-[#007CAB] dark:border-[#00A3E0] justify-between text-[#2A2C3F] dark:text-[#EEE5E5]">
            <button onClick={toggleSidebar}>
                {isOpen ? (
                    <MdClose className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5]" />
                ) : (
                    <MdMenu className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5]" />
                )}
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MdSunny className="scale-150 text-[#2A2C3F] dark:hidden"/>
                        <MdModeNight className="scale-150 dark:text-[#EEE5E5] not-dark:hidden"/>
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 translate-y-4">
                    <DropdownMenuItem className="text-xl" onClick={() => setTheme('light')}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xl" onClick={() => setTheme('dark')}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xl" onClick={() => setTheme('system')}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;
