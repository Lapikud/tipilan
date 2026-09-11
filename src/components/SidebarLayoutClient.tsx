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
  navItems: NavItem[];
}

export default function SidebarLayoutClient({
  navItems,
}: SidebarLayoutClientProps) {
  return <Header navItems={navItems} />;
}
