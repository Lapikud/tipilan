"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Icons
import { MdClose, MdMenu } from "react-icons/md";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Header navigation should include all options except homepage and hidden items
  const hiddenNavHrefs: NavItem["href"][] = ["/messiala"];
  const mainNavItems = navItems.filter(
    (item) => item.href !== "/" && !hiddenNavHrefs.includes(item.href),
  );
  const dropdownNavItems = mainNavItems;

  const navIconByHref: Partial<Record<NavItem["href"], string>> = {
    "/messiala": "weekend",
    "/ajakava": "event_note",
    "/piletid": "local_activity",
    "/turniirid": "rewarded_ads",
    "/kodukord": "gavel",
  };

  useEffect(() => {
    const largeScreenQuery = window.matchMedia("(min-width: 1280px)");

    const handleScaleOrViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    if (largeScreenQuery.matches) {
      setIsMobileMenuOpen(false);
    }

    largeScreenQuery.addEventListener("change", handleScaleOrViewportChange);

    return () => {
      largeScreenQuery.removeEventListener(
        "change",
        handleScaleOrViewportChange,
      );
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="px-4 sm:px-8 md:px-12 lg:px-16 py-3 flex items-center bg-[#0E0F19] border-b-3 border-[#1F5673] justify-between">
      {/* Logo */}
      <Link href="/" className="shrink-0">
        <Image
          src="/tipilan-icon-white.svg"
          alt="TipiLAN"
          width={40}
          height={40}
          className="h-auto w-10"
        />
      </Link>

      {/* Right side - Navigation + controls */}
      <div className="flex items-center gap-12">
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={isActive ? true : undefined}
                tabIndex={isActive ? -1 : undefined}
                className={`${vipnagorgialla.className} group font-bold italic leading-none text-lg uppercase px-4 py-2 border-4 border-[#00A3E0] transition ${
                  isActive
                    ? "bg-[#00A3E0] text-black cursor-default pointer-events-none"
                    : "bg-[#1F5673] text-[#EEE5E5] hover:bg-[#00A3E0] hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <LanguageSwitcher />

        {/* Mobile menu button */}
        <DropdownMenu
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden size-10 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <MdClose className="size-10 text-[#EEE5E5]" />
              ) : (
                <MdMenu className="size-10 text-[#EEE5E5]" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={0}
            className="xl:hidden w-screen sm:w-72 translate-x-0 sm:translate-x-4 translate-y-3 rounded-none border-3 border-[#1F5673] bg-[#0E0F19] p-0"
          >
            {dropdownNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              const hasBottomBorder = index !== dropdownNavItems.length - 1;

              return (
                <DropdownMenuItem
                  key={item.href}
                  style={{ animationDelay: `${index * 55}ms` }}
                  className="p-0 opacity-0 animate-[dropdown-item-in_220ms_cubic-bezier(0.16,1,0.3,1)_forwards] focus:bg-transparent data-highlighted:bg-transparent"
                >
                  {isActive ? (
                    <span
                      className={`${vipnagorgialla.className} block w-full cursor-default bg-[#00A3E0] px-5 py-2.5 text-xl font-bold italic leading-none uppercase text-black ${
                        hasBottomBorder ? "border-b-3 border-[#1F5673]" : ""
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{item.label}</span>
                        {navIconByHref[item.href] ? (
                          <span
                            className="material-symbols-outlined text-[2rem]! leading-none"
                            style={
                              item.href === "/piletid"
                                ? {
                                    fontVariationSettings:
                                      '"FILL" 0, "wght" 700, "GRAD" 0, "opsz" 24',
                                  }
                                : undefined
                            }
                          >
                            {navIconByHref[item.href]}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${vipnagorgialla.className} group block w-full bg-[#0E0F19] px-5 py-2.5 text-xl font-bold italic leading-none uppercase text-[#EEE5E5] transition hover:bg-[#00A3E0] hover:text-black ${
                        hasBottomBorder ? "border-b-3 border-[#1F5673]" : ""
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{item.label}</span>
                        {navIconByHref[item.href] ? (
                          <span
                            className="material-symbols-outlined text-[2rem]! leading-none text-[#00A3E0] group-hover:text-black"
                            style={
                              item.href === "/piletid"
                                ? {
                                    fontVariationSettings:
                                      '"FILL" 0, "wght" 700, "GRAD" 0, "opsz" 24',
                                  }
                                : undefined
                            }
                          >
                            {navIconByHref[item.href]}
                          </span>
                        ) : null}
                      </span>
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
