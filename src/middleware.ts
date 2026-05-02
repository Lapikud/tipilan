import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const location = response.headers.get("location");

  if (location) {
    const url = new URL(location);

    // Keep localhost development redirects intact. If not then DO NOT!
    const isLocalhost =
      url.hostname === "localhost" || url.hostname === "127.0.0.1";

    if (!isLocalhost && url.port === "3000") {
      url.port = "";
      response.headers.set("location", url.toString());
    }
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(et|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
