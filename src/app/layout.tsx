// Head metadata
import type { Metadata } from "next";
import Head from 'next/head';

// Provides the theme context to the app
import { ThemeProvider } from "@/components/Theme-provider"
import "./globals.css";
import "material-symbols";

// Fonts
import { Work_Sans } from "next/font/google";


import SidebarParent from "@/components/SidebarParent";
import Footer from "@/components/Footer";

const workSans = Work_Sans({
  subsets: ["latin"],
});

// Commented out for now, because it doesn't work having client components in the layout file

export const metadata: Metadata = {
  title: "TipiLAN 2025",
  description: "TipiLAN 2025 – Eesti suurim tudengite korraldatud LAN!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>TipiLAN</title>
        <meta property="og:title" content="TipiLAN 2025" key="title" />
        <meta name="description" content="TipiLAN 2025 – Eesti suurim tudengite korraldatud LAN!" />
      </Head>
      <body
        className={`${workSans} antialiased bg-[#EEE5E5] dark:bg-[#0E0F19]`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <SidebarParent />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
