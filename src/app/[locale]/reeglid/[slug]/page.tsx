import { notFound } from "next/navigation";
import ReactMarkdown, { Components } from "react-markdown";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import SectionDivider from "@/components/SectionDivider";
import { getTranslations, setRequestLocale } from "next-intl/server";

// Map of valid slugs to their translation keys
const rulesMap = {
  lol: {
    titleKey: "rules.lolRules",
  },
  cs2: {
    titleKey: "rules.cs2Rules",
  },
} as const;

type RuleSlug = keyof typeof rulesMap;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

async function getRuleContent(slug: string, locale: string) {
  if (!Object.keys(rulesMap).includes(slug)) {
    return null;
  }

  const ruleConfig = rulesMap[slug as RuleSlug];

  try {
    // Try to load the file for the current locale first
    let filePath = `src/data/rules/${locale}/${slug}.md`;
    let file = Bun.file(filePath);

    // Check if file exists, if not fallback to Estonian
    if (!(await file.exists()) && locale !== "et") {
      console.warn(
        `Rules file not found for ${slug} in ${locale}, falling back to Estonian`,
      );
      filePath = `src/data/rules/et/${slug}.md`;
      file = Bun.file(filePath);
    }

    const content = await file.text();
    return {
      content,
      titleKey: ruleConfig.titleKey,
    };
  } catch (error) {
    console.error(
      `Error reading rule file for slug ${slug} in locale ${locale}:`,
      error,
    );
    return null;
  }
}

export default async function RulePage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const ruleData = await getRuleContent(slug, locale);

  if (!ruleData) {
    notFound();
  }

  const headingStyle = `text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold uppercase italic text-[#2A2C3F] dark:text-[#EEE5E5]`;

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
        <h1 className={`${headingStyle} mt-8 md:mt-16 mb-4`}>
          {t(ruleData.titleKey)}
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
                  <ol className="list-none ml-6 md:text-xl">
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
            {ruleData.content}
          </ReactMarkdown>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(rulesMap).map((slug) => ({
    slug,
  }));
}
