# Rollers

An Expo app for coin flips and dice rolls, with animated Skia graphics.

## Get started

```bash
npm install
npx expo start
```

## App configuration

Edit [`src/config/app-config.ts`](./src/config/app-config.ts) to configure the app:

- Set the default `language` to `en` or `es`.
- Set `color` to a preset ID (`pink`, `cyan`, `lime`, `purple`, `orange`, or `blue`) for the global
  game color.

Color palette definitions are in `src/constants/color-presets.ts`; English and Spanish dictionaries
are separated under `src/i18n/translations/`.
The app automatically uses the device's first supported language (English or Spanish), with the
configured language as a fallback. Players can choose the shared coin/dice color from the home
screen's settings; that color preference is saved on the device. The shared semantic palette is in
[`src/theme/index.ts`](./src/theme/index.ts).

Screens live in `src/app`, reusable screen code is organized by feature in `src/features`, and
shared UI is organized by atomic-design role in `src/components`. Run `npm run format` to format
the maintained source, configuration, and documentation files. Web installs prepare the CanvasKit
WASM asset automatically through the `postinstall` script.
