import { notFound } from "next/navigation";
import ReactMarkdown, { Components } from "react-markdown";
import { vipnagorgialla } from "@/components/Vipnagorgialla";
import SectionDivider from "@/components/SectionDivider";

// Map of valid slugs to their corresponding file paths and titles
const rulesMap = {
  lol: {
    filePath: "src/data/rules/lol.md",
    title: "LOL Reeglid",
  },
  cs2: {
    filePath: "src/data/rules/cs2.md",
    title: "CS2 Reeglid",
  },
} as const;

type RuleSlug = keyof typeof rulesMap;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getRuleContent(slug: string) {
  if (!Object.keys(rulesMap).includes(slug)) {
    return null;
  }

  const ruleConfig = rulesMap[slug as RuleSlug];

  try {
    const file = Bun.file(ruleConfig.filePath);
    const content = await file.text();
    return {
      content,
      title: ruleConfig.title,
    };
  } catch (error) {
    console.error(`Error reading rule file for slug ${slug}:`, error);
    return null;
  }
}

export default async function RulePage({ params }: PageProps) {
  const { slug } = await params;
  const ruleData = await getRuleContent(slug);

  if (!ruleData) {
    notFound();
  }

  const headingStyle = `text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold uppercase italic text-[#2A2C3F] dark:text-[#EEE5E5]`;

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
        <h1 className={`${headingStyle} mt-8 md:mt-16 mb-4`}>
          {ruleData.title}
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
