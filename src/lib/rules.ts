import fs from 'fs';
import path from 'path';

export type Locale = 'et' | 'en';
export type RuleType = 'cs2' | 'lol';

/**
 * Loads rules content for a specific game and locale
 * @param ruleType - The type of rules to load (cs2, lol)
 * @param locale - The locale to load rules for (et, en)
 * @returns The markdown content of the rules file
 */
export async function getRules(ruleType: RuleType, locale: Locale): Promise<string> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'rules', locale, `${ruleType}.md`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    // Fallback to Estonian if English version doesn't exist
    if (locale === 'en') {
      console.warn(`Rules file not found for ${ruleType} in ${locale}, falling back to Estonian`);
      const fallbackPath = path.join(process.cwd(), 'src', 'data', 'rules', 'et', `${ruleType}.md`);
      try {
        const fallbackContent = fs.readFileSync(fallbackPath, 'utf8');
        return fallbackContent;
      } catch (fallbackError) {
        throw new Error(`Rules file not found for ${ruleType} in either ${locale} or et locale`);
      }
    }

    throw new Error(`Rules file not found for ${ruleType} in ${locale} locale: ${error}`);
  }
}

/**
 * Gets all available rule types
 * @param locale - The locale to check for available rules
 * @returns Array of available rule types
 */
export async function getAvailableRules(locale: Locale): Promise<RuleType[]> {
  const rulesDir = path.join(process.cwd(), 'src', 'data', 'rules', locale);

  try {
    const files = fs.readdirSync(rulesDir);
    const ruleTypes = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', '') as RuleType);

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
 * @returns Boolean indicating if the file exists
 */
export function ruleExists(ruleType: RuleType, locale: Locale): boolean {
  const filePath = path.join(process.cwd(), 'src', 'data', 'rules', locale, `${ruleType}.md`);
  return fs.existsSync(filePath);
}

/**
 * Gets the best available locale for a rule type
 * Prefers the requested locale, falls back to Estonian
 * @param ruleType - The type of rules to check
 * @param preferredLocale - The preferred locale
 * @returns The best available locale for the rule type
 */
export function getBestAvailableLocale(ruleType: RuleType, preferredLocale: Locale): Locale {
  if (ruleExists(ruleType, preferredLocale)) {
    return preferredLocale;
  }

  if (ruleExists(ruleType, 'et')) {
    return 'et';
  }

  // If neither exists, return preferred (will throw error when trying to load)
  return preferredLocale;
}
