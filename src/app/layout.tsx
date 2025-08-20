import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import "material-symbols";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TipiLAN 2025",
  description: "TipiLAN 2025 – Eesti suurim tudengite korraldatud LAN!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${workSans.className} antialiased bg-[#EEE5E5] dark:bg-[#0E0F19]`}
      >
        {children}
      </body>
    </html>
  );
}
