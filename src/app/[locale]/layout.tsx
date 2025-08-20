import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/Theme-provider";
import SidebarParent from "@/components/SidebarParent";
import Footer from "@/components/Footer";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Provide messages for client-side components
  const messages = await getMessages();

  return (
    <div lang={locale}>
      <NextIntlClientProvider messages={messages}>
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
      </NextIntlClientProvider>
    </div>
  );
}
