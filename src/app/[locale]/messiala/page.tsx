import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Expo({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="bg-[#0E0F19] min-h-screen flex flex-col items-center justify-center">
      <h1
        className={`${vipnagorgialla.className} font-bold italic text-4xl md:text-5xl text-[#EEE5E5] uppercase mb-4`}
      >
        {t("expo.title")}
      </h1>
      <p
        className={`${vipnagorgialla.className} font-bold italic text-5xl md:text-7xl text-[#EEE5E5] uppercase`}
      >
        {t("expo.comingSoon")}
      </p>
    </div>
  );
}
