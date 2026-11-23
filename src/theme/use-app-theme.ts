import { useMemo } from "react";

import { useAppConfig } from "@/config/app-config-provider";
import { createTheme } from "@/theme";

export function useAppTheme() {
  const { color } = useAppConfig();
  return useMemo(() => createTheme(color), [color]);
}
