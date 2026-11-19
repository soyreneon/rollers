import { appConfig } from '@/constants/app-config';

const english = {
  common: {
    back: 'BACK',
    home: 'Home',
    explore: 'Explore',
    learnMore: 'Learn more',
  },
  home: {
    brand: 'ROLLERS',
    ready: 'READY',
    heroEyebrow: 'LET FATE TAKE THE WHEEL',
    titleLead: 'MAKE YOUR\n',
    titleAccent: 'NEXT MOVE.',
    description: 'One tap. One outcome. Pick your kind of chance.',
    section: 'CHOOSE YOUR GAME',
    coinTitle: 'COIN FLIP',
    coinDescription: 'Heads or tails. No second guessing.',
    diceTitle: 'DICE ROLLER',
    diceDescription: 'Tap to roll. Feel the shake.',
    coinAccessibility: 'Open coin flip',
    diceAccessibility: 'Open dice roller',
    footer: 'NO SKILLS. JUST LUCK.',
  },
  coin: {
    eyebrow: 'THE CLASSIC',
    title: 'COIN FLIP',
    subtitle: 'Leave it to the universe.',
    heads: 'HEADS',
    tails: 'TAILS',
    inAir: 'IN THE AIR...',
    waiting: 'YOUR CALL IS WAITING',
    result: 'RESULT: {result}',
    accessibility: 'Flip the coin',
    flipping: 'FLIPPING...',
    flipButton: 'FLIP COIN',
    helper: 'TAP TO FLIP',
    headsSide: 'Heads coin side',
    tailsSide: 'Tails coin side',
  },
  dice: {
    eyebrow: 'LET IT ROLL',
    title: 'DICE ROLLER',
    subtitle: 'A little chaos never hurt.',
    rolling: 'ROLLING...',
    result: 'YOU ROLLED A {result}',
    accessibility: 'Roll the die',
    rollButton: 'ROLL DICE',
    helper: 'SHAKE IT UP',
  },
  explore: {
    title: 'Explore',
    introduction: 'This starter app includes example\ncode to help you get started.',
    documentation: 'Expo documentation',
    fileRouting: 'File-based routing',
    routingDescription: 'This app has two screens: {index} and {explore}.',
    layoutDescription: 'The layout file in {layout} sets up the tab navigator.',
    platformSupport: 'Android, iOS, and web support',
    platformDescription:
      'You can open this project on Android, iOS, and the web. To open the web version, press {key} in the terminal running this project.',
    images: 'Images',
    imagesDescription:
      'For static images, use the {twoX} and {threeX} suffixes to provide files for different screen densities.',
    colorModes: 'Light and dark mode components',
    colorModesDescription:
      'This template supports light and dark mode. The {hook} hook lets you inspect the current color scheme and adjust UI colors.',
    animations: 'Animations',
    animationsDescription:
      'This template includes an animated component. The {component} component uses the {library} library to animate this hint.',
  },
} as const;

type TranslationKey =
  | 'common.back'
  | 'common.home'
  | 'common.explore'
  | 'common.learnMore'
  | `home.${keyof typeof english.home}`
  | `coin.${keyof typeof english.coin}`
  | `dice.${keyof typeof english.dice}`
  | `explore.${keyof typeof english.explore}`;

type Translations = Record<TranslationKey, string>;

const spanish: Translations = {
  'common.back': 'VOLVER',
  'common.home': 'Inicio',
  'common.explore': 'Explorar',
  'common.learnMore': 'Más información',
  'home.brand': 'ROLLERS',
  'home.ready': 'LISTO',
  'home.heroEyebrow': 'DEJA QUE EL DESTINO DECIDA',
  'home.titleLead': 'HAZ TU\n',
  'home.titleAccent': 'JUGADA.',
  'home.description': 'Un toque. Un resultado. Elige tu oportunidad.',
  'home.section': 'ELIGE TU JUEGO',
  'home.coinTitle': 'LANZAR MONEDA',
  'home.coinDescription': 'Cara o cruz. Sin darle más vueltas.',
  'home.diceTitle': 'TIRAR EL DADO',
  'home.diceDescription': 'Toca para lanzar. Siente la emoción.',
  'home.coinAccessibility': 'Abrir lanzamiento de moneda',
  'home.diceAccessibility': 'Abrir tirada de dado',
  'home.footer': 'SIN HABILIDAD. SOLO SUERTE.',
  'coin.eyebrow': 'EL CLÁSICO',
  'coin.title': 'LANZAR MONEDA',
  'coin.subtitle': 'Déjaselo al universo.',
  'coin.heads': 'CARA',
  'coin.tails': 'CRUZ',
  'coin.inAir': 'EN EL AIRE...',
  'coin.waiting': 'ESPERANDO TU JUGADA',
  'coin.result': 'RESULTADO: {result}',
  'coin.accessibility': 'Lanzar la moneda',
  'coin.flipping': 'LANZANDO...',
  'coin.flipButton': 'LANZAR MONEDA',
  'coin.helper': 'TOCA PARA LANZAR',
  'coin.headsSide': 'Lado de cara de la moneda',
  'coin.tailsSide': 'Lado de cruz de la moneda',
  'dice.eyebrow': 'A LANZAR',
  'dice.title': 'TIRAR EL DADO',
  'dice.subtitle': 'Un poco de caos nunca viene mal.',
  'dice.rolling': 'LANZANDO...',
  'dice.result': 'RESULTADO: {result}',
  'dice.accessibility': 'Lanzar el dado',
  'dice.rollButton': 'LANZAR DADO',
  'dice.helper': 'AGÍTALO',
  'explore.title': 'Explorar',
  'explore.introduction': 'Esta aplicación incluye ejemplos\nde código para ayudarte a empezar.',
  'explore.documentation': 'Documentación de Expo',
  'explore.fileRouting': 'Navegación basada en archivos',
  'explore.routingDescription': 'Esta aplicación tiene dos pantallas: {index} y {explore}.',
  'explore.layoutDescription':
    'El archivo de diseño {layout} configura el navegador por pestañas.',
  'explore.platformSupport': 'Compatibilidad con Android, iOS y web',
  'explore.platformDescription':
    'Puedes abrir este proyecto en Android, iOS y la web. Para abrir la versión web, pulsa {key} en la terminal donde se ejecuta el proyecto.',
  'explore.images': 'Imágenes',
  'explore.imagesDescription':
    'Para imágenes estáticas, usa los sufijos {twoX} y {threeX} para proporcionar archivos con distintas densidades.',
  'explore.colorModes': 'Componentes con modo claro y oscuro',
  'explore.colorModesDescription':
    'Esta plantilla admite los modos claro y oscuro. El hook {hook} permite consultar el esquema de color actual y ajustar la interfaz.',
  'explore.animations': 'Animaciones',
  'explore.animationsDescription':
    'Esta plantilla incluye un componente animado. El componente {component} usa la biblioteca {library} para animar esta sugerencia.',
};

const translations: Record<'en' | 'es', Translations> = {
  en: {
    'common.back': english.common.back,
    'common.home': english.common.home,
    'common.explore': english.common.explore,
    'common.learnMore': english.common.learnMore,
    'home.brand': english.home.brand,
    'home.ready': english.home.ready,
    'home.heroEyebrow': english.home.heroEyebrow,
    'home.titleLead': english.home.titleLead,
    'home.titleAccent': english.home.titleAccent,
    'home.description': english.home.description,
    'home.section': english.home.section,
    'home.coinTitle': english.home.coinTitle,
    'home.coinDescription': english.home.coinDescription,
    'home.diceTitle': english.home.diceTitle,
    'home.diceDescription': english.home.diceDescription,
    'home.coinAccessibility': english.home.coinAccessibility,
    'home.diceAccessibility': english.home.diceAccessibility,
    'home.footer': english.home.footer,
    'coin.eyebrow': english.coin.eyebrow,
    'coin.title': english.coin.title,
    'coin.subtitle': english.coin.subtitle,
    'coin.heads': english.coin.heads,
    'coin.tails': english.coin.tails,
    'coin.inAir': english.coin.inAir,
    'coin.waiting': english.coin.waiting,
    'coin.result': english.coin.result,
    'coin.accessibility': english.coin.accessibility,
    'coin.flipping': english.coin.flipping,
    'coin.flipButton': english.coin.flipButton,
    'coin.helper': english.coin.helper,
    'coin.headsSide': english.coin.headsSide,
    'coin.tailsSide': english.coin.tailsSide,
    'dice.eyebrow': english.dice.eyebrow,
    'dice.title': english.dice.title,
    'dice.subtitle': english.dice.subtitle,
    'dice.rolling': english.dice.rolling,
    'dice.result': english.dice.result,
    'dice.accessibility': english.dice.accessibility,
    'dice.rollButton': english.dice.rollButton,
    'dice.helper': english.dice.helper,
    'explore.title': english.explore.title,
    'explore.introduction': english.explore.introduction,
    'explore.documentation': english.explore.documentation,
    'explore.fileRouting': english.explore.fileRouting,
    'explore.routingDescription': english.explore.routingDescription,
    'explore.layoutDescription': english.explore.layoutDescription,
    'explore.platformSupport': english.explore.platformSupport,
    'explore.platformDescription': english.explore.platformDescription,
    'explore.images': english.explore.images,
    'explore.imagesDescription': english.explore.imagesDescription,
    'explore.colorModes': english.explore.colorModes,
    'explore.colorModesDescription': english.explore.colorModesDescription,
    'explore.animations': english.explore.animations,
    'explore.animationsDescription': english.explore.animationsDescription,
  },
  es: spanish,
};

const language = translations[appConfig.language] ? appConfig.language : 'en';

export function t(key: TranslationKey, params: Record<string, string | number> = {}): string {
  return translations[language][key].replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    String(params[name] ?? placeholder),
  );
}
