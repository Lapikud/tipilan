import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["et", "en"],
  defaultLocale: "et",
  pathnames: {
    "/": "/",
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
