"use client";

import { useEffect, useState } from "react";

interface CS2SidebarProps {
  sections: { id: string; label: string }[];
}

export default function CS2Sidebar({ sections }: CS2SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 border-l border-[#1F5673] pl-6">
        <ul className="flex flex-col gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`transition ${
                  activeSection === section.id
                    ? "text-[#EEE5E5] font-bold"
                    : "text-[#00A3E0] hover:text-[#EEE5E5]"
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
