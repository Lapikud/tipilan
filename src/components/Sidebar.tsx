"use client";

// Fonts
import { vipnagorgialla } from "@/components/Vipnagorgialla";

// Use effect to handle route changes and close the sidebar if it's open
// usePathName to listen to route changes in Next.js
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      toggleSidebar();
    }
  }, [pathname]);

  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur mt-16 z-20"
        style={{ display: isOpen ? "block" : "none" }}
        onClick={toggleSidebar} // Close sidebar when clicking outside
      ></div>
      <div
        className={`text-3xl md:text-5xl ${vipnagorgialla.className} font-bold italic uppercase fixed flex items-start xs:pl-25 pl-20 sm:pl-20 md:pl-24 flex-col gap-8 pt-16 top-0 left-0 h-[99vh] mt-16 -skew-x-5 border-r-3 border-[#1F5673]  w-screen sm:w-96 md:w-128 bg-[#EEE5E5] dark:bg-[#0E0F19] text-[#2A2C3F] dark:text-[#EEE5E5] transition-transform transform z-20`}
        style={{
          transform: isOpen
            ? "translateX(-13%) skewX(calc(5deg * -1)"
            : "translateX(-150%) skewX(calc(5deg * -1)",
        }}
      >
        <Link href="/" className="hover:text-[#00A3E0] transition duration-150">
          Avaleht
        </Link>
        <Link
          href="/messiala"
          className="hover:text-[#00A3E0] transition duration-150"
        >
          Messiala
        </Link>
        <Link
          href="/piletid"
          className="hover:text-[#00A3E0] transition duration-150"
        >
          Piletid
        </Link>
        <Link
          href="/ajakava"
          className="hover:text-[#00A3E0] transition duration-150"
        >
          Ajakava
        </Link>
        <Link
          href="/turniirid"
          className="hover:text-[#00A3E0] transition duration-150"
        >
          Turniirid
        </Link>
        <Link
          href="/kodukord"
          className="hover:text-[#00A3E0] transition duration-150"
        >
          Kodukord
        </Link>
        <Link 
            href="/reeglid"
            className="hover:text-[#00A3E0] transition duration-150"
        >
          Reeglid
        </Link>
              
              
      </div>
    </>
  );
};

export default Sidebar;
