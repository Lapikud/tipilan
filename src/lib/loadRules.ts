import fs from "fs";
import path from "path";

export type Locale = "et" | "en";
export type RuleType = "cs2" | "lol" | "kodukord";

/**
 * Loads any rule content for a specific type and locale
 * @param ruleType - The type of rules to load (cs2, lol, kodukord)
 * @param locale - The locale to load rules for (et, en)
 * @returns Promise<string> The markdown content of the rules file
 */
export async function loadRules(
  ruleType: RuleType,
  locale: Locale,
): Promise<string> {
  // Try to load the file for the current locale first
  let filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "rules",
    locale,
    `${ruleType}.md`,
  );

  try {
    // Check if file exists for current locale
    if (fs.existsSync(filePath)) {
      const file = await import("fs").then(() =>
        fs.readFileSync(filePath, "utf8")
      );
      return file;
    }

    // Fallback to Estonian if English version doesn't exist
    if (locale !== "et") {
      console.warn(
        `Rules file not found for ${ruleType} in ${locale}, falling back to Estonian`,
      );
      const fallbackPath = path.join(
        process.cwd(),
        "src",
        "data",
        "rules",
        "et",
        `${ruleType}.md`,
      );

      if (fs.existsSync(fallbackPath)) {
        const fallbackFile = fs.readFileSync(fallbackPath, "utf8");
        return fallbackFile;
      }
    }

    throw new Error(`Rules file not found for ${ruleType}`);
  } catch (error) {
    console.error(
      `Error loading rules for ${ruleType} in locale ${locale}:`,
      error,
    );
    throw new Error(
      `Failed to load rules for ${ruleType}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Loads rules using Bun.file (for Bun runtime environments)
 * @param ruleType - The type of rules to load
 * @param locale - The locale to load rules for
 * @returns Promise<string> The markdown content
 */
export async function loadRulesBun(
  ruleType: RuleType,
  locale: Locale,
): Promise<string> {
  // Try to load the file for the current locale first
  let filePath = `src/data/rules/${locale}/${ruleType}.md`;
  let file = Bun.file(filePath);

  // Check if file exists, if not fallback to Estonian
  if (!(await file.exists()) && locale !== "et") {
    console.warn(
      `Rules file not found for ${ruleType} in ${locale}, falling back to Estonian`,
    );
    filePath = `src/data/rules/et/${ruleType}.md`;
    file = Bun.file(filePath);
  }

  try {
    const content = await file.text();
    return content;
  } catch (error) {
    console.error(
      `Error loading rules for ${ruleType} in locale ${locale}:`,
      error,
    );
    throw new Error(
      `Failed to load rules for ${ruleType}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Gets all available rule types for a given locale
 * @param locale - The locale to check for available rules
 * @returns Promise<RuleType[]> Array of available rule types
 */
export async function getAvailableRules(locale: Locale): Promise<RuleType[]> {
  const rulesDir = path.join(process.cwd(), "src", "data", "rules", locale);

  try {
    const files = fs.readdirSync(rulesDir);
    const ruleTypes = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", "") as RuleType);

    return ruleTypes;
  } catch (error) {
    console.warn(`Could not read rules directory for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Checks if a specific rule file exists for a given locale
 * @param ruleType - The type of rules to check
 * @param locale - The locale to check
 * @returns boolean indicating if the file exists
 */
export function ruleExists(ruleType: RuleType, locale: Locale): boolean {
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "rules",
    locale,
    `${ruleType}.md`,
  );
  return fs.existsSync(filePath);
}

/**
 * Gets the best available locale for a rule type
 * Prefers the requested locale, falls back to Estonian
 * @param ruleType - The type of rules to check
 * @param preferredLocale - The preferred locale
 * @returns Locale The best available locale for the rule type
 */
export function getBestAvailableLocale(
  ruleType: RuleType,
  preferredLocale: Locale,
): Locale {
  if (ruleExists(ruleType, preferredLocale)) {
    return preferredLocale;
  }

  if (ruleExists(ruleType, "et")) {
    return "et";
  }

  // If neither exists, return preferred (will throw error when trying to load)
  return preferredLocale;
}
