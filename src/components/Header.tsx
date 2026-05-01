"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Icons
import {
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

interface NavItem {
  href:
    | "/"
    | "/ajakava"
    | "/haldus"
    | "/kodukord"
    | "/messiala"
    | "/piletid"
    | "/striim"
    | "/turniirid";
  label: string;
}

interface HeaderProps {
  themeLabels: {
    light: string;
    dark: string;
    system: string;
  };
  navItems: NavItem[];
}

const Header = ({ themeLabels, navItems }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  // Filter nav items for the horizontal bar (exclude kodukord)
  const mainNavItems = navItems.filter(
    (item) => item.href !== "/kodukord"
  );

  return (
    <header className="px-4 py-2 md:px-8 flex items-center bg-[#0E0F19] border-b-3 border-[#1F5673] justify-between">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/tipilan-icon-white.svg"
          alt="TipiLAN"
          width={49}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      {/* Right side - Navigation + controls */}
      <div className="flex items-center gap-3">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${vipnagorgialla.className} font-bold italic text-lg uppercase px-4 py-1.5 border-2 border-[#00A3E0] text-[#EEE5E5] hover:bg-[#00A3E0]/20 transition`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 cursor-pointer"
            >
              <MdSunny className="scale-135 text-[#EEE5E5] dark:hidden" />
              <MdModeNight className="scale-135 text-[#EEE5E5] not-dark:hidden" />
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

        {/* Mobile menu button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden size-10 cursor-pointer"
            >
              <MdMenu className="h-8 w-8 text-[#EEE5E5]" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 translate-y-4">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className={`${vipnagorgialla.className} font-bold italic uppercase text-lg`}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
