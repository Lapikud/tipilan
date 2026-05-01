"use client";

import Header from "./Header";

interface NavItem {
  href:
    | "/"
    | "/ajakava"
    | "/haldus"
    | "/kodukord"
    | "/messiala"
    | "/piletid"
    | "/striim"
    | "/turniirid";
  label: string;
}

interface SidebarLayoutClientProps {
  themeLabels: {
    light: string;
    dark: string;
    system: string;
  };
  navItems: NavItem[];
}

export default function SidebarLayoutClient({
  themeLabels,
  navItems,
}: SidebarLayoutClientProps) {
  return (
    <Header themeLabels={themeLabels} navItems={navItems} />
  );
}
