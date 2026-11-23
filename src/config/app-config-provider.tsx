import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocales } from "expo-localization";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { appConfig, type Language } from "@/config/app-config";
import { colorPresets, type ColorPresetId } from "@/constants/color-presets";

const STORAGE_KEY = "rollers.global-color-preference";

type AppConfigContextValue = {
  color: ColorPresetId;
  setColor: (color: ColorPresetId) => void;
  language: Language;
};

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

function isColorPresetId(value: unknown): value is ColorPresetId {
  return (
    typeof value === "string" &&
    colorPresets.some((preset) => preset.id === value)
  );
}

function readColor(value: string | null): ColorPresetId | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (isColorPresetId(parsed)) return parsed;
    console.error("Saved global color preference has an invalid format.");
  } catch (error) {
    console.error("Unable to read saved global color preference.", error);
  }

  return null;
}

function getDeviceLanguage(locales: ReturnType<typeof useLocales>): Language {
  const preferredLanguage = locales.find(
    (locale) => locale.languageCode === "en" || locale.languageCode === "es",
  )?.languageCode;

  if (preferredLanguage === "en" || preferredLanguage === "es") {
    return preferredLanguage;
  }
  return appConfig.language;
}

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const locales = useLocales();
  const deviceLanguage = getDeviceLanguage(locales);
  const [color, setColorState] = useState(appConfig.color);
  const colorRef = useRef(color);
  const changedBeforeLoad = useRef(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((savedColorValue) => {
        const savedColor = readColor(savedColorValue);
        if (active && savedColor && !changedBeforeLoad.current) {
          colorRef.current = savedColor;
          setColorState(savedColor);
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to load saved color preference.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const setColor = useCallback((nextColor: ColorPresetId) => {
    changedBeforeLoad.current = true;
    colorRef.current = nextColor;
    setColorState(nextColor);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextColor)).catch(
      (error: unknown) => {
        console.error("Unable to save global color preference.", error);
      },
    );
  }, []);

  return (
    <AppConfigContext.Provider
      value={{ color, setColor, language: deviceLanguage }}
    >
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const value = useContext(AppConfigContext);
  if (!value) {
    throw new Error("useAppConfig must be used within AppConfigProvider.");
  }
  return value;
}
