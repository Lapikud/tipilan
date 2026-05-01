"use client";

import { vipnagorgialla } from "@/components/Vipnagorgialla";

interface RuleSection {
  title: string;
  rules: (string | { main: string; sub: (string | { main: string; sub: string[] })[] })[];
}

interface CS2RulesProps {
  sections: RuleSection[];
}

function RuleItem({ rule, index }: { rule: string | { main: string; sub: (string | { main: string; sub: string[] })[] }; index: number }) {
  if (typeof rule === "string") {
    return (
      <li className="text-[#EEE5E5]/80 mb-2">
        <span className="text-[#00A3E0] mr-2">{index}.</span>
        {rule}
      </li>
    );
  }

  return (
    <li className="text-[#EEE5E5]/80 mb-3">
      <span className="text-[#00A3E0] mr-2">{index}.</span>
      {rule.main}
      {rule.sub && rule.sub.length > 0 && (
        <ol className="ml-6 mt-2">
          {rule.sub.map((subRule, subIndex) => {
            if (typeof subRule === "string") {
              return (
                <li key={subIndex} className="text-[#EEE5E5]/70 mb-1">
                  <span className="text-[#00A3E0]/70 mr-2">{index}.{subIndex + 1}.</span>
                  {subRule}
                </li>
              );
            }
            return (
              <li key={subIndex} className="text-[#EEE5E5]/70 mb-2">
                <span className="text-[#00A3E0]/70 mr-2">{index}.{subIndex + 1}.</span>
                {subRule.main}
                {subRule.sub && subRule.sub.length > 0 && (
                  <ol className="ml-6 mt-1">
                    {subRule.sub.map((subSubRule, subSubIndex) => (
                      <li key={subSubIndex} className="text-[#EEE5E5]/60 mb-1">
                        <span className="text-[#00A3E0]/50 mr-2">{index}.{subIndex + 1}.{subSubIndex + 1}.</span>
                        {subSubRule}
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

export default function CS2Rules({ sections }: CS2RulesProps) {
  let ruleCounter = 0;

  return (
    <div>
      {sections.map((section, sectionIndex) => {
        const startIndex = ruleCounter;
        ruleCounter += section.rules.length;

        return (
          <div key={sectionIndex} className="mb-8">
            <h3 className={`${vipnagorgialla.className} font-bold italic text-xl text-[#00A3E0] uppercase mb-4`}>
              {sectionIndex + 1}) {section.title}
            </h3>
            <ol className="list-none">
              {section.rules.map((rule, ruleIndex) => (
                <RuleItem key={ruleIndex} rule={rule} index={ruleIndex + 1} />
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
