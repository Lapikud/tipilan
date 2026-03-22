import { setRequestLocale } from "next-intl/server";
import TeaserPage from "@/components/TeaserPage";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TeaserPage />;
}
