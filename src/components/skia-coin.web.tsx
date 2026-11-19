import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { ActivityIndicator } from "react-native";
import type { SharedValue } from "react-native-reanimated";

import { theme } from "@/constants/theme";
import { useHydrated } from "@/hooks/use-hydrated";

type SkiaCoinProps = {
  angle: SharedValue<number>;
  accessibilityLabel: string;
};

export default function SkiaCoin(props: SkiaCoinProps) {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <ActivityIndicator color={theme.coin} />;
  }

  return (
    <WithSkiaWeb
      getComponent={() => import("./skia-coin-canvas")}
      componentProps={props}
      fallback={<ActivityIndicator color={theme.coin} />}
    />
  );
}
