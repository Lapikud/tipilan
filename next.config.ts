import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://tipilan.ee https://player.twitch.tv https://embed.twitch.tv; frame-ancestors 'self' https://tipilan.ee;",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/et",
        destination: "/striim",
        permanent: false,
      },
      {
        source: "/en",
        destination: "/stream",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
