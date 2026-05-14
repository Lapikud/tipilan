import { getTranslations } from "next-intl/server";
import type { Locale, RuleType } from "@/lib/loadRules";

type GithubCommit = {
  commit?: {
    committer?: {
      date?: string;
    };
  };
};

type RulesLastChangedProps = {
  locale: Locale;
  ruleType: RuleType;
  className?: string;
};

const apiBaseUrl = "https://api.github.com/repos/Lapikud/tipilan/commits";

function buildCommitUrl(ruleType: RuleType, locale: Locale): string {
  return `${apiBaseUrl}?path=src/data/rules/${locale}/${ruleType}.md&page=1&per_page=1`;
}

async function fetchCommitDate(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(
        `Failed to fetch last changed date: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as GithubCommit[];
    return data?.[0]?.commit?.committer?.date ?? null;
  } catch (error) {
    console.warn("Failed to fetch last changed date", error);
    return null;
  }
}

async function getLastChangedDate(
  ruleType: RuleType,
  locale: Locale,
): Promise<string | null> {
  const primary = await fetchCommitDate(buildCommitUrl(ruleType, locale));
  if (primary) {
    return primary;
  }

  if (locale !== "et") {
    return fetchCommitDate(buildCommitUrl(ruleType, "et"));
  }

  return null;
}

export default async function RulesLastChanged({
  locale,
  ruleType,
  className,
}: RulesLastChangedProps) {
  const t = await getTranslations({ locale });
  const lastChangedIso = await getLastChangedDate(ruleType, locale);

  if (!lastChangedIso) {
    return null;
  }

  const lastChangedDate = new Intl.DateTimeFormat(
    locale === "et" ? "et-EE" : "en-US",
    {
      dateStyle: "long",
    },
  ).format(new Date(lastChangedIso));

  const classes = `text-white mb-6 leading-[19px]${className ? ` ${className}` : ""}`;

  return (
    <p className={classes}>
      {t("rules.lastChanged")} {lastChangedDate}
    </p>
  );
}
