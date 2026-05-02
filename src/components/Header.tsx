"use client";

import { useEffect, useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter nav items for the horizontal bar (exclude kodukord)
  const mainNavItems = navItems.filter((item) => item.href !== "/kodukord");
  const disabledNavHrefs = new Set<NavItem["href"]>(["/messiala", "/ajakava"]);

  const navIconByHref: Partial<Record<NavItem["href"], string>> = {
    "/messiala": "weekend",
    "/ajakava": "event_note",
    "/piletid": "confirmation_number",
    "/turniirid": "trophy",
  };

  useEffect(() => {
    const largeScreenQuery = window.matchMedia("(min-width: 1024px)");

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
                className={`${vipnagorgialla.className} group font-bold italic text-lg uppercase px-4 py-1.5 border-2 border-[#00A3E0] text-[#EEE5E5] transition ${
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
        <DropdownMenu
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-10 cursor-pointer"
            >
              <MdMenu className="size-10 text-[#EEE5E5]" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="lg:hidden w-64 translate-y-4 rounded-none border-3 border-[#1F5673] bg-[#0E0F19] p-0"
          >
            {mainNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isDisabled = disabledNavHrefs.has(item.href);
              const hasBottomBorder = index !== mainNavItems.length - 1;

              return (
                <DropdownMenuItem
                  key={item.href}
                  className="p-0 focus:bg-transparent data-highlighted:bg-transparent"
                >
                  {isActive ? (
                    <span
                      className={`${vipnagorgialla.className} block w-full cursor-default bg-[#00A3E0] px-5 py-3 text-xl font-bold italic uppercase text-black ${
                        hasBottomBorder ? "border-b-3 border-[#1F5673]" : ""
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{item.label}</span>
                        {navIconByHref[item.href] ? (
                          <span className="material-symbols-outlined text-[2rem]! leading-none">
                            {navIconByHref[item.href]}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  ) : isDisabled ? (
                    <span
                      className={`${vipnagorgialla.className} block w-full cursor-not-allowed px-5 py-3 text-xl font-bold italic uppercase text-[#EEE5E5] opacity-50 ${
                        hasBottomBorder ? "border-b-3 border-[#1F5673]" : ""
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{item.label}</span>
                        {navIconByHref[item.href] ? (
                          <span className="material-symbols-outlined text-[2rem]! leading-none text-[#00A3E0]">
                            {navIconByHref[item.href]}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${vipnagorgialla.className} group block w-full px-5 py-3 text-xl font-bold italic uppercase text-[#EEE5E5] transition hover:bg-[#00A3E0] hover:text-black ${
                        hasBottomBorder ? "border-b-3 border-[#1F5673]" : ""
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span>{item.label}</span>
                        {navIconByHref[item.href] ? (
                          <span className="material-symbols-outlined text-[2rem]! leading-none text-[#00A3E0] group-hover:text-black">
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
