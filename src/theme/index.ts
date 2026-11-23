import {
  appConfig,
  colorPresets,
  type ColorPresetId,
} from '@/config/app-config';

function getPreset(id: ColorPresetId) {
  return colorPresets.find((preset) => preset.id === id) ?? colorPresets[0];
}

export function createTheme(color: ColorPresetId) {
  const preset = getPreset(color);

  return {
    colors: {
      background: '#050607',
      surface: '#101315',
      foreground: '#F5F7F6',
      muted: '#858D8D',
      border: '#262B2D',
      status: '#C8FF58',
      coin: {
        accent: preset.accent,
        surface: preset.coin.surface,
        glow: preset.coin.glow,
        face: preset.accent,
        inner: preset.coin.inner,
        outline: preset.coin.outline,
        ink: preset.coin.ink,
      },
      dice: {
        accent: preset.accent,
        surface: preset.dice.surface,
        glow: preset.dice.glow,
        face: preset.dice.face,
        faceLight: preset.dice.faceLight,
        faceDark: preset.dice.faceDark,
        ink: preset.dice.ink,
      },
    },
  } as const;
}

export const theme = createTheme(appConfig.color);
