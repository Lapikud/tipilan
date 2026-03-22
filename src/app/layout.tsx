import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TipiLAN 2026",
  description: "TipiLAN 2026 – Eesti suurim tudengite korraldatud LAN!",
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
