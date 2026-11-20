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
- Set `colors.coin` and `colors.dice` to the desired accent colors.

The shared semantic palette is in [`src/theme/index.ts`](./src/theme/index.ts). Update it to adjust
the app-wide colors and the coin/die surface colors together.

Screens live in `src/app`, reusable screen code is organized by feature in `src/features`, and
shared UI lives in `src/components/common`. Web installs prepare the CanvasKit WASM asset
automatically through the `postinstall` script.
