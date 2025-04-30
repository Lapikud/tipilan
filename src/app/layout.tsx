// Head metadata
// import type { Metadata } from "next";

// Fonts
import { Work_Sans } from "next/font/google";

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
