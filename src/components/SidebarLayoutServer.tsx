import { getTranslations } from "next-intl/server";
import SidebarLayoutClient from "./SidebarLayoutClient";

export default async function SidebarLayoutServer() {
  const t = await getTranslations("common");

  const themeLabels = {
    light: t("theme.light"),
    dark: t("theme.dark"),
    system: t("theme.system"),
  };

  const navT = await getTranslations("navigation");

  const navItems = [
    { href: "/" as const, label: navT("home") },
    { href: "/messiala" as const, label: navT("expo") },
    { href: "/piletid" as const, label: navT("tickets") },
    { href: "/ajakava" as const, label: navT("schedule") },
    { href: "/turniirid" as const, label: navT("tournaments") },
    { href: "/kodukord" as const, label: navT("houserules") },
    { href: "/reeglid" as const, label: navT("rules") },
  ];

  return <SidebarLayoutClient themeLabels={themeLabels} navItems={navItems} />;
}
