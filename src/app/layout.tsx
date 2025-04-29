// Head metadata
// import type { Metadata } from "next";

// Fonts
import { Work_Sans } from "next/font/google";
import localFont from 'next/font/local'

// Style 'only' has normal and italic for some reason.
// It uses the weight to determine the style used.
export const vipnagorgialla = localFont({
  src: [
    {
      path: './fonts/vipnagorgialla/Vipnagorgialla-Rg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/vipnagorgialla/Vipnagorgialla-Rg-It.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/vipnagorgialla/Vipnagorgialla-Bd.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/vipnagorgialla/Vipnagorgialla-Bd-It.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

import "./globals.css";
import SidebarParent from "@/components/SidebarParent";
import Footer from "@/components/Footer";

const workSans = Work_Sans({
  subsets: ["latin"],
});

// Commented out for now, because it doesn't work having client components in the layout file

// export const metadata: Metadata = {
//   title: "Tipilan",
//   description: "TipiLAN on pungil põnevatest turniiridest, mini-võistlustest, loengutest ja paljust muust.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans} antialiased bg-[#EEE5E5]`}
      >
        <SidebarParent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
