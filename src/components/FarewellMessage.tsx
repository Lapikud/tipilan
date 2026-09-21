import { getTranslations } from "next-intl/server";
import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default async function FarewellMessage() {
  const t = await getTranslations("home.farewell");

  return (
    <section
      className={`mx-auto flex w-full flex-col items-center border-b-4 border-[#00A3E0]/50 px-4 py-11 sm:px-8 sm:py-14 lg:px-12 lg:py-[68px] ${vipnagorgialla.className} font-bold italic`}
    >
      <h2 className="max-w-[1100px] text-center text-2xl leading-[0.95] text-white uppercase sm:text-3xl lg:text-4xl">
        {t("message")}
      </h2>
    </section>
  );
}
