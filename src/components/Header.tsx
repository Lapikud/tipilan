"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Icons
import { MdMenu } from "react-icons/md";

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
  navItems: NavItem[];
}

const Header = ({ navItems }: HeaderProps) => {
  const pathname = usePathname();

  // Filter nav items for the horizontal bar (exclude kodukord)
  const mainNavItems = navItems.filter((item) => item.href !== "/kodukord");
  const disabledNavHrefs = new Set<NavItem["href"]>(["/messiala", "/ajakava"]);

  return (
    <header className="px-4 py-2 md:px-8 flex items-center bg-[#0E0F19] border-b-3 border-[#1F5673] justify-between">
      {/* Logo */}
      <Link href="/" className="shrink-0">
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
        <nav className="hidden lg:flex items-center gap-3">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const isDisabled = disabledNavHrefs.has(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={isActive || isDisabled ? true : undefined}
                tabIndex={isActive || isDisabled ? -1 : undefined}
                className={`${vipnagorgialla.className} font-bold italic text-lg uppercase px-4 py-1.5 border-2 border-[#00A3E0] text-[#EEE5E5] transition ${
                  isActive
                    ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                    : isDisabled
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : "hover:bg-[#00A3E0]/20"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <LanguageSwitcher />

        {/* Mobile menu button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-10 cursor-pointer"
            >
              <MdMenu className="h-8 w-8 text-[#EEE5E5]" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 translate-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isDisabled = disabledNavHrefs.has(item.href);

              return (
                <DropdownMenuItem
                  key={item.href}
                  disabled={isActive || isDisabled}
                  asChild={!isActive && !isDisabled}
                >
                  {isActive ? (
                    <span
                      className={`${vipnagorgialla.className} font-bold italic uppercase text-lg text-[#00A3E0] cursor-default`}
                    >
                      {item.label}
                    </span>
                  ) : isDisabled ? (
                    <span
                      className={`${vipnagorgialla.className} font-bold italic uppercase text-lg opacity-50 cursor-not-allowed`}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${vipnagorgialla.className} font-bold italic uppercase text-lg`}
                    >
                      {item.label}
                    </Link>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
