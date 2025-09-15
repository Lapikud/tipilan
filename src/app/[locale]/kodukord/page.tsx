// app/kodukord/page.tsx (App Router)
import ReactMarkdown, { Components } from "react-markdown";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import SectionDivider from "@/components/SectionDivider";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadRulesBun } from "@/lib/loadRules";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const content = await loadRulesBun("kodukord", locale as "et" | "en");

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
        {/* Page title (separate from markdown headings) */}
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4 uppercase`}
        >
          {t("rules.houseRules")}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            components={
              {
                h1: (props) => (
                  <h1 className="text-3xl md:text-4xl font-bold my-4">
                    {props.children}
                  </h1>
                ),
                h2: (props) => (
                  <h2 className="text-2xl md:text-3xl font-semibold my-3">
                    {props.children}
                  </h2>
                ),
                ol: (props) => (
                  <ol className="list-decimal ml-6 md:text-xl">
                    {props.children}
                  </ol>
                ),
                ul: (props) => (
                  <ul className="list-disc ml-6 md:text-xl">
                    {props.children}
                  </ul>
                ),
                p: (props) => <p className="md:text-xl">{props.children}</p>,
              } as Components
            }
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}
