"use client";

// Icons
import {
  MdClose,
  MdMenu,
  MdSunny,
  MdModeNight,
  MdComputer,
} from "react-icons/md";

// Theme Provider
import { useTheme } from "next-themes";

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Fonts
// import { vipnagorgialla } from "@/components/Vipnagorgialla";

const Header = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="px-8 py-2 md:px-12 flex items-center bg-[#EEE5E5] dark:bg-[#0E0F19] border-b-3 border-[#1F5673] justify-between text-[#2A2C3F] dark:text-[#EEE5E5]">
      <button onClick={toggleSidebar}>
        {isOpen ? (
          <MdClose className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5] cursor-pointer" />
        ) : (
          <MdMenu className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5] cursor-pointer" />
        )}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MdSunny className="scale-150 text-[#2A2C3F] dark:hidden" />
            <MdModeNight className="scale-150 dark:text-[#EEE5E5] not-dark:hidden" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 translate-y-4">
          <DropdownMenuItem
            className={`text-lg ${theme === "light" ? "bg-accent/50 font-medium" : ""}`}
            onClick={() => setTheme("light")}
            disabled={theme === "light"}
          >
            <MdSunny className={theme === "light" ? "text-amber-500" : ""} />
            <span>Hele</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`text-lg ${theme === "dark" ? "bg-accent/50 font-medium" : ""}`}
            onClick={() => setTheme("dark")}
            disabled={theme === "dark"}
          >
            <MdModeNight className={theme === "dark" ? "text-blue-500" : ""} />
            <span>Tume</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`text-lg ${theme === "system" ? "bg-accent/50 font-medium" : ""}`}
            onClick={() => setTheme("system")}
            disabled={theme === "system"}
          >
            <MdComputer
              className={theme === "system" ? "text-green-500" : ""}
            />
            <span>Süsteemipõhine</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
