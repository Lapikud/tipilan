import { vipnagorgialla } from "@/components/Vipnagorgialla";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col min-h-[90vh] p-12 justify-center items-center">
      <h1
        className={`text-7xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
      >
        {t("title")}
      </h1>
      <p className="text-2xl text-[#2A2C3F] dark:text-[#EEE5E5] mb-8">
        {t("message")}
      </p>
    </div>
  );
}
