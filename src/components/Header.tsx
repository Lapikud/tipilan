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

import LanguageSwitcher from "./LanguageSwitcher";

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

interface HeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  themeLabels: {
    light: string;
    dark: string;
    system: string;
  };
}

const Header = ({ isOpen, onToggle, themeLabels }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="px-8 py-2 md:px-12 flex items-center bg-[#EEE5E5] dark:bg-[#0E0F19] border-b-3 border-[#1F5673] justify-between text-[#2A2C3F] dark:text-[#EEE5E5]">
      <button onClick={onToggle}>
        {isOpen ? (
          <MdClose className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5] cursor-pointer" />
        ) : (
          <MdMenu className="h-12 w-12 text-[#2A2C3F] dark:text-[#EEE5E5] cursor-pointer" />
        )}
      </button>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 cursor-pointer"
            >
              <MdSunny className="scale-135 text-[#2A2C3F] dark:hidden" />
              <MdModeNight className="scale-135 dark:text-[#EEE5E5] not-dark:hidden" />
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
              <span>{themeLabels.light}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-lg ${theme === "dark" ? "bg-accent/50 font-medium" : ""}`}
              onClick={() => setTheme("dark")}
              disabled={theme === "dark"}
            >
              <MdModeNight
                className={theme === "dark" ? "text-blue-500" : ""}
              />
              <span>{themeLabels.dark}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-lg ${theme === "system" ? "bg-accent/50 font-medium" : ""}`}
              onClick={() => setTheme("system")}
              disabled={theme === "system"}
            >
              <MdComputer
                className={theme === "system" ? "text-green-500" : ""}
              />
              <span>{themeLabels.system}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
