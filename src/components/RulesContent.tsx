"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";

interface RuleSection {
  title: string;
  rules: (
    | string
    | { main: string; sub: (string | { main: string; sub: string[] })[] }
  )[];
}

interface RulesContentProps {
  sections: RuleSection[];
}

function RuleItem({
                    rule,
                    index,
                  }: {
  rule:
      | string
      | { main: string; sub: (string | { main: string; sub: string[] })[] };
  index: number;
}) {
  if (typeof rule === "string") {
    return (
        <li className="flex items-start text-white mb-2">
          {/* Fixed min-width prevents numbers from shifting text as digits grow (e.g., 9. vs 10.) */}
          <span className="text-white font-mono min-w-[2rem] shrink-0 select-none">{index}.</span>
          <div>{rule}</div>
        </li>
    );
  }

  return (
      <li className="text-white mb-4">
        {/* Main rule row */}
        <div className="flex items-start">
          <span className="text-white font-mono min-w-[2rem] shrink-0 select-none">{index}.</span>
          <div>{rule.main}</div>
        </div>

        {rule.sub && rule.sub.length > 0 && (
            <ol className="ml-8 mt-2 space-y-2">
              {rule.sub.map((subRule, subIndex) => {
                if (typeof subRule === "string") {
                  return (
                      <li key={subIndex} className="flex items-start text-white">
                  <span className="text-white font-mono min-w-[3rem] shrink-0 select-none">
                    {index}.{subIndex + 1}.
                  </span>
                        <div>{subRule}</div>
                      </li>
                  );
                }
                return (
                    <li key={subIndex} className="text-white">
                      <div className="flex items-start">
                  <span className="text-white font-mono min-w-[3rem] shrink-0 select-none">
                    {index}.{subIndex + 1}.
                  </span>
                        <div>{subRule.main}</div>
                      </div>

                      {subRule.sub && subRule.sub.length > 0 && (
                          <ol className="ml-12 mt-2 space-y-2">
                            {subRule.sub.map((subSubRule, subSubIndex) => (
                                <li key={subSubIndex} className="flex items-start text-white/80">
                        <span className="text-white/80 font-mono min-w-[4rem] shrink-0 select-none">
                          {index}.{subIndex + 1}.{subSubIndex + 1}.
                        </span>
                                  <div>{subSubRule}</div>
                                </li>
                            ))}
                          </ol>
                      )}
                    </li>
                );
              })}
            </ol>
        )}
      </li>
  );
}

export default function RulesContent({ sections }: RulesContentProps) {
  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h3
            className={`${vipnagorgialla.className} font-bold italic text-xl text-white uppercase mb-4`}
          >
            {sectionIndex + 1}) {section.title}
          </h3>
          <ol>
            {section.rules.map((rule, ruleIndex) => (
              <RuleItem key={ruleIndex} rule={rule} index={ruleIndex + 1} />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
