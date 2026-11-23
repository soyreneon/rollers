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

The app automatically uses the device's first supported language (English or Spanish), with the
configured language as a fallback. Players can choose the shared coin/dice color from the home
screen's settings; that color preference is saved on the device. The shared semantic palette is in
[`src/theme/index.ts`](./src/theme/index.ts).

Screens live in `src/app`, reusable screen code is organized by feature in `src/features`, and
shared UI lives in `src/components/common`. Web installs prepare the CanvasKit WASM asset
automatically through the `postinstall` script.
