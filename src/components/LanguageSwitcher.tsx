"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getNextLocale = (): "et" | "en" => {
    const currentIndex = routing.locales.indexOf(locale as "et" | "en");
    const nextIndex = (currentIndex + 1) % routing.locales.length;
    return routing.locales[nextIndex] as "et" | "en";
  };

  const getNextLanguageName = () => {
    const nextLocale = getNextLocale();
    switch (nextLocale) {
      case "et":
        return "EST";
      case "en":
        return "ENG";
      default:
        return nextLocale;
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
      size="lg"
      className={`${vipnagorgialla.className} text-3xl font-bold italic uppercase cursor-pointer hover:bg-[#007CAB]/10 dark:hover:bg-[#00A3E0]/10 text-[#007CAB] dark:text-[#00A3E0] hover:text-[#2A2C3F] dark:hover:text-[#EEE5E5] transition-colors`}
    >
      {getNextLanguageName()}
    </Button>
  );
}
