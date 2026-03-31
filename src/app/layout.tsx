import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TipiLAN 2026",
  description: "TipiLAN 2026 - Eesti suurim tudengite korraldatud LAN!",
  openGraph: {
    title: "TipiLAN 2026",
    description: "TipiLAN 2026 - Eesti suurim tudengite korraldatud LAN!",
    images: [
      {
        url: "/images/TipiLAN_og.png",
        width: 1200,
        height: 630,
        alt: "TipiLAN 2026",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TipiLAN 2026",
    description: "TipiLAN 2026 - Eesti suurim tudengite korraldatud LAN!",
    images: ["/images/TipiLAN_og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <body
        className={`${workSans.className} antialiased bg-bg-dark text-text-light`}
      >
        {children}
      </body>
    </html>
  );
}
