import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  appConfig,
  colorPresets,
  type ColorPresetId,
} from '@/config/app-config';

const STORAGE_KEY = 'rollers.global-color-preference';

type AppConfigContextValue = {
  color: ColorPresetId;
  setColor: (color: ColorPresetId) => void;
};

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

function isColorPresetId(value: unknown): value is ColorPresetId {
  return (
    typeof value === 'string' &&
    colorPresets.some((preset) => preset.id === value)
  );
}

function readColor(value: string | null): ColorPresetId | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (isColorPresetId(parsed)) return parsed;
    console.error('Saved global color preference has an invalid format.');
  } catch (error) {
    console.error('Unable to read saved global color preference.', error);
  }

  return null;
}

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const [color, setColorState] = useState(appConfig.color);
  const colorRef = useRef(color);
  const changedBeforeLoad = useRef(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        const savedColor = readColor(value);
        if (active && savedColor && !changedBeforeLoad.current) {
          colorRef.current = savedColor;
          setColorState(savedColor);
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to load saved global color preference.', error);
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
        console.error('Unable to save global color preference.', error);
      },
    );
  }, []);

  return (
    <AppConfigContext.Provider value={{ color, setColor }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const value = useContext(AppConfigContext);
  if (!value) {
    throw new Error('useAppConfig must be used within AppConfigProvider.');
  }
  return value;
}
