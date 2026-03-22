import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col min-h-dvh p-12 justify-center items-center bg-bg-dark text-text-light">
      <h1 className="text-title">
        {t("title")}
      </h1>
      <p className="text-p-lg mt-4">
        {t("message")}
      </p>
    </div>
  );
}
