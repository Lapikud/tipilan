import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["et", "en"],

  // Used when no locale matches
  defaultLocale: "et",

  // The `pathnames` object holds pairs of internal and
  // external paths. The external paths are shown in the URL.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/ajakava": {
      et: "/ajakava",
      en: "/schedule",
    },
    "/haldus": {
      et: "/haldus",
      en: "/admin",
    },
    "/kodukord": {
      et: "/kodukord",
      en: "/houserules",
    },
    "/messiala": {
      et: "/messiala",
      en: "/expo",
    },
    "/piletid": {
      et: "/piletid",
      en: "/tickets",
    },
    "/reeglid": {
      et: "/reeglid",
      en: "/gamerules",
    },
    "/striim": {
      et: "/striim",
      en: "/stream",
    },
    "/turniirid": {
      et: "/turniirid",
      en: "/tournaments",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
