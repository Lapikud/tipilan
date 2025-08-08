// filepath: /home/renkar/Dokumendid/Projects/tipilan/src/app/reeglid/[slug]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

type Props = { params: { slug: string } };

export default async function RulePage({ params }: Props) {
  const filePath = path.join(process.cwd(), "src/data/rules", `${params.slug}.md`);
  let file;
  try {
    file = await fs.readFile(filePath, "utf8");
  } catch (e) {
    return <div className="text-red-500">Reegleid ei leitud.</div>;
  }
  const { content, data } = matter(file);

return (
  <div className="prose mx-auto my-16 ml-8">
    <h1>{data.title || params.slug.toUpperCase() + " REEGLID"}</h1>
    <ReactMarkdown
      components={{
        h1: ({node, ...props}) => <h1 className="font-bold" {...props} />,
        h2: ({node, ...props}) => <h2 className="font-bold" {...props} />,
        h3: ({node, ...props}) => <h3 className="font-bold" {...props} />,
        h4: ({node, ...props}) => <h4 className="font-bold" {...props} />,
        h5: ({node, ...props}) => <h5 className="font-bold" {...props} />,
        h6: ({node, ...props}) => <h6 className="font-bold" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);