# Rollers

An Expo app for coin flips and dice rolls, with animated Skia graphics.

## Get started

```bash
npm install
npx expo start
```

## App configuration

Edit [`src/config/app-config.ts`](./src/config/app-config.ts) to configure the app:

- Set `language` to `en` (the default) or `es`.
- Set `color` to a preset ID (`pink`, `cyan`, `lime`, `purple`, `orange`, or `blue`) for the global
  game color.

Players can choose the shared coin and dice color from the settings button on the home screen. The
selection is saved on the device. The shared semantic palette is in
[`src/theme/index.ts`](./src/theme/index.ts).

Screens live in `src/app`, reusable screen code is organized by feature in `src/features`, and
shared UI lives in `src/components/common`. Web installs prepare the CanvasKit WASM asset
automatically through the `postinstall` script.
