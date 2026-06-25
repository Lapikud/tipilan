"use client";

import { useEffect, useState } from "react";

interface RuleNavProps {
  sections: { id: string; label: string }[];
}

export default function RuleNav({ sections }: RuleNavProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "",
  );

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const getScrollOffset = () => {
      const firstSection = document.getElementById(sections[0].id);
      if (!firstSection) {
        return 0;
      }
      const scrollMarginTop =
        window.getComputedStyle(firstSection).scrollMarginTop;
      const parsed = Number.parseFloat(scrollMarginTop);
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    const updateActiveSection = () => {
      const offset = getScrollOffset();
      const scrollPosition = window.scrollY + offset + 1;
      let currentId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) {
          continue;
        }
        if (element.offsetTop <= scrollPosition) {
          currentId = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24">
        <ul className="flex flex-col text-center">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`border-l-2 pl-4 py-1 transition ${
                activeSection === section.id
                  ? "border-[#00A3E0]"
                  : "border-white hover:border-[#00A3E0]"
              }`}
            >
              <a
                href={`#${section.id}`}
                className={`transition ${
                  activeSection === section.id
                    ? "text-[#00A3E0] font-bold"
                    : "text-white hover:text-[#00A3E0]"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
