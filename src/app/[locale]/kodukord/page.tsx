// app/kodukord/page.tsx (App Router)
import ReactMarkdown, { Components } from "react-markdown";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import RulesLastChanged from "@/components/RulesLastChanged";
import RuleNav from "@/components/RuleNav";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadRules } from "@/lib/loadRules";

const sectionKeys = [
  { id: "reminder", labelKey: "rules.reminder" },
  { id: "code", labelKey: "rules.code" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const content = await loadRules("kodukord", locale as "et" | "en");

  const sections = sectionKeys.map((section) => ({
    id: section.id,
    label: t(section.labelKey),
  }));

  // Track heading count for ID assignment
  let headingCount = 0;

  return (
    <div className="bg-[#0E0F19] min-h-screen pt-16 md:pt-20">
      <div className="max-w-480 mx-auto px-4 sm:px-6 md:px-12 lg:px-64 py-10 md:py-20">
        <div className="tournament-page-scope grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-16">
          {/* Main content */}
          <div>
            {/* Page title */}
            <h1
              className={`${vipnagorgialla.className} font-bold italic text-[clamp(2.5rem,2rem+3vw,4rem)] leading-tight text-[#00A3E0] uppercase mb-8`}
            >
              {t("rules.houseRules")}
            </h1>
            <RulesLastChanged
              locale={locale as "et" | "en"}
              ruleType="kodukord"
            />

            <div className="rules-markdown text-justify">
              <ReactMarkdown
                components={
                  {
                    h1: (props) => {
                      const id =
                        sections[headingCount]?.id || `section-${headingCount}`;
                      headingCount++;
                      return (
                        <h1
                          id={id}
                          className={`${vipnagorgialla.className} font-bold italic text-2xl md:text-3xl text-white 
                            uppercase mb-4 mt-12 first:mt-0 scroll-mt-24 md:scroll-mt-28`}
                        >
                          {props.children}
                        </h1>
                      );
                    },
                    h2: (props) => (
                      <h2
                        className={`${vipnagorgialla.className} font-bold italic text-white uppercase`}
                      >
                        {props.children}
                      </h2>
                    ),
                    ol: (props) => (
                      <ol className="text-white mb-6">
                        {props.children}
                      </ol>
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside text-white">
                        {props.children}
                      </ul>
                    ),
                    p: (props) => (
                      <p className="text-white lg:text-xl sm:text-sm">
                        {props.children}
                      </p>
                    ),
                    li: (props) => (
                      <li className="text-white lg:text-xl sm:text-sm mb-3">
                        {props.children}
                      </li>
                    ),
                  } as Components
                }
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Sidebar navigation */}
          <RuleNav sections={sections} />
        </div>
      </div>
    </div>
  );
}
