export type Language = 'en' | 'es';

export const appConfig: {
  language: Language;
  colors: {
    coin: string;
    dice: string;
  };
} = {
  language: 'en',
  colors: {
    coin: '#FF67DA',
    dice: '#56FFD6',
  },
};
