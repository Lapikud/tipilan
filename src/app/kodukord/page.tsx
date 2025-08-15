// app/kodukord/page.tsx (App Router)
import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {vipnagorgialla} from "@/components/Vipnagorgialla";
import SectionDivider from "@/components/SectionDivider";

export const runtime = "nodejs";      // ensure fs is available (not Edge)
export const dynamic = "force-static"; // read at build time

export default function Page() {
    const filePath = path.join(process.cwd(), "src/data", "kodukord.md");
    const content = fs.readFileSync(filePath, "utf8");

    return (
        <div>
            <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
                {/* Page title (separate from markdown headings) */}
                <h1
                    className={`text-4xl md:text-5xl lg:text-6xl ${vipnagorgialla.className} font-bold italic text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 md:mt-16 mb-4 uppercase`}
                >
                    Kodukord
                </h1>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({node, ...props}) => (
                                <h1 className="text-3xl md:text-4xl font-bold my-4" {...props} />
                            ),
                            h2: ({node, ...props}) => (
                                <h2 className="text-2xl md:text-3xl font-semibold my-3" {...props} />
                            ),
                            ol: ({node, ...props}) => (
                                <ol className="list-decimal ml-6 md:text-xl" {...props} />
                            ),
                            ul: ({node, ...props}) => (
                                <ul className="list-disc ml-6 md:text-xl" {...props} />
                            ),
                            p: ({node, ...props}) => (
                                <p className="md:text-xl" {...props} />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            
            <SectionDivider/>
        </div>
    );
}
