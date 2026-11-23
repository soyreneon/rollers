import { Stack } from "expo-router";

import { AppConfigProvider } from "@/config/app-config-provider";
import { screenOptions } from "@/styles/app/layout.styles";

export default function RootLayout() {
  return (
    <AppConfigProvider>
      <Stack screenOptions={screenOptions} />
    </AppConfigProvider>
  );
}
