import { Stack } from "expo-router";

import { screenOptions } from "@/styles/app/_layout.styles";

export default function RootLayout() {
  return <Stack screenOptions={screenOptions} />;
}
