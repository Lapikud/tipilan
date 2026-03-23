"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import Image from "next/image";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getNextLocale = (): "et" | "en" => {
    const currentIndex = routing.locales.indexOf(locale as "et" | "en");
    const nextIndex = (currentIndex + 1) % routing.locales.length;
    return routing.locales[nextIndex] as "et" | "en";
  };

  const handleLanguageSwitch = () => {
    const nextLocale = getNextLocale();
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="relative size-[40px] cursor-pointer overflow-hidden"
      aria-label="Switch language"
    >
      <Image
        src={`/images/flags/flag-${locale === "et" ? "en" : "et"}.svg`}
        alt={locale === "et" ? "Switch to English" : "Vaheta eesti keelele"}
        width={40}
        height={30}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </button>
  );
}
