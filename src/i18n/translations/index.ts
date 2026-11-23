import { appConfig, type Language } from "@/config/app-config";

import en, { type TranslationKey } from "./en";
import es from "./es";

const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  es,
};

export function t(
  key: TranslationKey,
  params: Record<string, string | number> = {},
  language: Language = appConfig.language,
): string {
  return translations[language][key].replace(
    /\{(\w+)\}/g,
    (placeholder, name: string) => String(params[name] ?? placeholder),
  );
}

export type { TranslationKey };
