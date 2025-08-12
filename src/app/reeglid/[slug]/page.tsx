import { vipnagorgialla } from "@/components/Vipnagorgialla";
import path from "node:path";
import fs from "node:fs/promises";
import ReactMarkdown from "react-markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RulePage({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "src/data/rules", `${slug}.md`);
  let file: string;

  try {
    file = await fs.readFile(filePath, "utf8");
  } catch {
    file = `# ${slug.toUpperCase()} REEGLID\n\nSisu hetkel puudub.`;
  }

  const data = { title: undefined as string | undefined };

  return (
    <>
      <h1
        className={`not-prose ${vipnagorgialla.className} font-bold italic uppercase text-[64px] leading-[96px] tracking-[-0.02em] text-[#2A2C3F] dark:text-[#EEE5E5] mx-auto mt-16 mb-6 px-8`}
      >
        {data.title || `${slug.toUpperCase()} REEGLID`}
      </h1>

      <div
        className={`mx-auto px-8 font-worksans
          [&_ol]:ml-6
          [&_ol_ol]:ml-10
          [&_ol_ol_ol]:ml-14
          [&_h2]:font-bold
        `}
      >
        <ReactMarkdown>{file}</ReactMarkdown>
      </div>
      </>
  );
}
