"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import Header from "./Header";

interface NavItem {
  href:
    | "/"
    | "/ajakava"
    | "/haldus"
    | "/kodukord"
    | "/messiala"
    | "/piletid"
    | "/reeglid"
    | "/striim"
    | "/turniirid";
  label: string;
}

interface SidebarLayoutClientProps {
  themeLabels: {
    light: string;
    dark: string;
    system: string;
  };
  navItems: NavItem[];
}

export default function SidebarLayoutClient({
  themeLabels,
  navItems,
}: SidebarLayoutClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <Header
        isOpen={isOpen}
        onToggle={toggleSidebar}
        themeLabels={themeLabels}
      />

      {/* Sidebar */}
      <>
        <div
          className="fixed inset-0 backdrop-blur mt-16 z-20"
          style={{ display: isOpen ? "block" : "none" }}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          className={`text-3xl md:text-4xl ${vipnagorgialla.className} font-bold break-all italic uppercase fixed flex items-start xs:pl-25 pl-20 sm:pl-20 md:pl-24 flex-col gap-8 pt-16 top-0 left-0 h-[99vh] mt-16 -skew-x-5 border-r-3 border-[#1F5673] w-screen sm:w-96 md:w-128 bg-[#EEE5E5] dark:bg-[#0E0F19] text-[#2A2C3F] dark:text-[#EEE5E5] transition-transform transform z-20`}
          style={{
            transform: isOpen
              ? "translateX(-13%) skewX(calc(5deg * -1)"
              : "translateX(-150%) skewX(calc(5deg * -1)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#00A3E0] md:hover:translate-x-2 transition duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </>
    </>
  );
}
