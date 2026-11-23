import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { ActivityIndicator } from "react-native";
import type { SharedValue } from "react-native-reanimated";

import { useHydrated } from "@/hooks/use-hydrated";
import { useAppTheme } from "@/theme/use-app-theme";

type SkiaCoinProps = {
  angle: SharedValue<number>;
  accessibilityLabel: string;
};

export default function SkiaCoin(props: SkiaCoinProps) {
  const hydrated = useHydrated();
  const theme = useAppTheme();

  if (!hydrated) {
    return <ActivityIndicator color={theme.colors.coin.accent} />;
  }

  return (
    <WithSkiaWeb
      getComponent={() => import("./skia-coin-canvas")}
      componentProps={props}
      fallback={<ActivityIndicator color={theme.colors.coin.accent} />}
    />
  );
}
