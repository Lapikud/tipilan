import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "material-symbols";

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
    <html suppressHydrationWarning data-scroll-behavior="smooth" className="scroll-smooth">
      <body
        className={`${workSans.className} antialiased bg-[#EEE5E5] dark:bg-[#0E0F19]`}
      >
        {children}
      </body>
    </html>
  );
}
