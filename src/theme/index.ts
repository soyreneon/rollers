import { appConfig } from '@/config/app-config';

export const theme = {
  colors: {
    background: '#050607',
    surface: '#101315',
    foreground: '#F5F7F6',
    muted: '#858D8D',
    border: '#262B2D',
    status: '#C8FF58',
    coin: {
      accent: appConfig.colors.coin,
      surface: '#241323',
      glow: '#32142D',
      face: appConfig.colors.coin,
      inner: '#F9D7F2',
      outline: '#A73A8F',
      ink: '#4C1944',
    },
    dice: {
      accent: appConfig.colors.dice,
      surface: '#10221F',
      glow: '#11332E',
      face: '#D9FFF5',
      faceLight: '#F1FFFB',
      faceDark: '#A8E7D8',
      ink: '#09231F',
    },
  },
} as const;
