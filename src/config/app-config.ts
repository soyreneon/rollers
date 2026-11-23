import type { ColorPresetId } from "@/constants/color-presets";

export type Language = "en" | "es";

type AppConfig = {
  language: Language;
  color: ColorPresetId;
};

export const appConfig: AppConfig = {
  language: "en",
  color: "cyan",
};
