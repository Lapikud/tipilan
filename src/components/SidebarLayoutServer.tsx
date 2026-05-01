import { getTranslations } from "next-intl/server";
import SidebarLayoutClient from "./SidebarLayoutClient";

export default async function SidebarLayoutServer() {
  const navT = await getTranslations("navigation");

  const navItems = [
    { href: "/" as const, label: navT("home") },
    { href: "/messiala" as const, label: navT("expo") },
    { href: "/piletid" as const, label: navT("tickets") },
    { href: "/ajakava" as const, label: navT("schedule") },
    { href: "/turniirid" as const, label: navT("tournaments") },
    { href: "/kodukord" as const, label: navT("houserules") },
  ];

  return <SidebarLayoutClient navItems={navItems} />;
}
