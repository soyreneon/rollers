This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Code organization (Atomic Design)

- `src/app/` contains Expo Router route entry points only. Keep route files thin and re-export the matching feature screen.
- `src/components/atoms/` contains basic, reusable UI controls; `molecules/` combines atoms into small functional units; `organisms/` contains larger reusable UI sections; `templates/` provides screen-level layout without feature content.
- `src/features/<feature>/` owns feature screens, feature-specific components, and their styles. Keep feature-only UI in its feature instead of promoting it to shared components.
- `src/constants/` contains shared static data such as color palettes. Keep selected user preferences in `src/config/`.
- `src/i18n/translations/` contains one translation dictionary per locale. `src/i18n/` owns translation lookup and hooks; use the translation hook in UI so locale changes trigger rerenders.
- Keep global app styling in `src/styles/`; keep component and feature styles next to the code they style.

## Formatting standards

- Prettier is the source formatter. After changing code, configuration, or documentation in any task, run `npm run format` before validation.
- `npm run format` formats maintained source files and root configuration/documentation files. Do not manually format around or disable Prettier.
- Run `npm run format:check` when verifying formatting without writing files.

## Commit quality gates

- The Husky `pre-commit` hook runs `lint-staged`.
- For staged TypeScript and JavaScript under `src/`, lint-staged runs Prettier first, then ESLint with `--fix`. Staged source JSON and Markdown, plus maintained root config and documentation files, are formatted with Prettier.
- Keep pre-commit checks scoped to staged files. Run full-project lint and typecheck separately before completing a task; do not make a commit depend on a full build.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
