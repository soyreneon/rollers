export type Language = 'en' | 'es';

type AppConfig = {
  language: Language;
  colors: {
    coin: string;
    dice: string;
  };
};

export const appConfig: AppConfig = {
  language: 'en',
  colors: {
    coin: '#FF67DA',
    dice: '#56FFD6',
  },
};
