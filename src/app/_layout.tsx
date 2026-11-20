import { Stack } from "expo-router";

import { screenOptions } from "@/styles/app/layout.styles";

export default function RootLayout() {
  return <Stack screenOptions={screenOptions} />;
}
