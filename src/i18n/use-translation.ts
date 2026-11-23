import { useCallback } from "react";

import { useAppConfig } from "@/config/app-config-provider";
import { t as translate, type TranslationKey } from "@/i18n";

type TranslationParams = Record<string, string | number>;

export function useTranslation() {
  const { language } = useAppConfig();

  return useCallback(
    (key: TranslationKey, params: TranslationParams = {}) =>
      translate(key, params, language),
    [language],
  );
}
