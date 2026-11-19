import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { ActivityIndicator } from "react-native";
import type { SharedValue } from "react-native-reanimated";

import { theme } from "@/constants/theme";
import { useHydrated } from "@/hooks/use-hydrated";

type SkiaDieProps = {
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
  accessibilityLabel: string;
};

export default function SkiaDie(props: SkiaDieProps) {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <ActivityIndicator color={theme.dice} />;
  }

  return (
    <WithSkiaWeb
      getComponent={() => import("./skia-die-canvas")}
      componentProps={props}
      fallback={<ActivityIndicator color={theme.dice} />}
    />
  );
}
