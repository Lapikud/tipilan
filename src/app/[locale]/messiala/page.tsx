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
        className={`${vipnagorgialla.className} font-bold italic text-[clamp(1.75rem,5vw,3rem)] text-[#EEE5E5] uppercase mb-4 text-center`}
      >
        {t("expo.title")}
      </h1>
      <p
        className={`${vipnagorgialla.className} font-bold italic text-[clamp(2rem,8vw,4.5rem)] text-[#EEE5E5] uppercase text-center`}
      >
        {t("expo.comingSoon")}
      </p>
    </div>
  );
}
