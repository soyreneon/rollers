/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';
import { appConfig } from '@/constants/app-config';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export const theme = {
  black: '#050607',
  panel: '#101315',
  white: '#F5F7F6',
  muted: '#858D8D',
  border: '#262B2D',
  coin: appConfig.colors.coin,
  dice: appConfig.colors.dice,
  lime: '#C8FF58',
  coinSurface: '#241323',
  coinGlow: '#32142D',
  coinFace: appConfig.colors.coin,
  coinInner: '#F9D7F2',
  coinInnerBorder: '#A73A8F',
  coinInk: '#4C1944',
  diceSurface: '#10221F',
  diceGlow: '#11332E',
  diceFace: '#D9FFF5',
  diceFaceLight: '#F1FFFB',
  diceFaceDark: '#A8E7D8',
  diceInk: '#09231F',
  link: '#3C87F7',
  splash: '#208AEF',
  splashStart: '#3C9FFE',
  splashEnd: '#0274DF',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
