"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getNextLocale = (): "et" | "en" => {
    const currentIndex = routing.locales.indexOf(locale as "et" | "en");
    const nextIndex = (currentIndex + 1) % routing.locales.length;
    return routing.locales[nextIndex] as "et" | "en";
  };

  const getNextLanguageFlag = () => {
    const nextLocale = getNextLocale();
    switch (nextLocale) {
      case "et":
        return { src: "/flags/est.svg", alt: "Estonian flag" };
      case "en":
        return { src: "/flags/eng.svg", alt: "English flag" };
      default:
        return { src: "/flags/est.svg", alt: nextLocale };
    }
  };

  const handleLanguageSwitch = () => {
    const nextLocale = getNextLocale();
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      onClick={handleLanguageSwitch}
      variant="ghost"
      size="icon"
      className="cursor-pointer hover:bg-[#007CAB]/10 dark:hover:bg-[#00A3E0]/10 transition-colors rounded-md"
    >
      <Image
        src={getNextLanguageFlag().src}
        alt={getNextLanguageFlag().alt}
        width={40}
        height={40}
        className="rounded-sm"
      />
    </Button>
  );
}
