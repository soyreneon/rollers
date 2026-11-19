import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { BackButton, ScreenFrame } from "@/components/roller-ui";
import SkiaCoin from "@/components/skia-coin";
import { theme } from "@/constants/theme";
import { t } from "@/i18n";

import { styles } from "@/styles/app/coin-flip.styles";

function getCoinResult(): "HEADS" | "TAILS" {
  return Math.random() < 0.5 ? "HEADS" : "TAILS";
}

export default function CoinFlipScreen() {
  const angle = useSharedValue(0);
  const [result, setResult] = useState<"HEADS" | "TAILS" | null>(null);
  const [flipping, setFlipping] = useState(false);

  const finishFlip = useCallback((nextResult: "HEADS" | "TAILS") => {
    setResult(nextResult);
    setFlipping(false);
  }, []);

  const flipCoin = () => {
    if (flipping) return;

    const nextResult = getCoinResult();
    const sideChange = nextResult === (result ?? "HEADS") ? 0 : Math.PI;
    const nextAngle = angle.value + Math.PI * 8 + sideChange;

    setFlipping(true);
    angle.value = withTiming(
      nextAngle,
      {
        duration: 1700,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(finishFlip)(nextResult);
        }
      },
    );
  };

  const resultLabel = result
    ? t("coin.result", {
        result: t(result === "HEADS" ? "coin.heads" : "coin.tails"),
      })
    : t("coin.waiting");

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton onPress={() => router.back()} accent={theme.coin} />

        <View style={styles.heading}>
          <Text style={styles.eyebrow}>{t("coin.eyebrow")}</Text>
          <Text style={styles.title}>{t("coin.title")}</Text>
          <Text style={styles.subtitle}>{t("coin.subtitle")}</Text>
        </View>

        <View style={styles.stage}>
          <SkiaCoin
            angle={angle}
            accessibilityLabel={
              flipping
                ? t("coin.flipping")
                : t(result === "TAILS" ? "coin.tailsSide" : "coin.headsSide")
            }
          />
          <Text style={styles.resultLabel}>
            {flipping ? t("coin.inAir") : resultLabel}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("coin.accessibility")}
            disabled={flipping}
            onPress={flipCoin}
            style={({ pressed }) => [
              styles.flipButton,
              pressed && !flipping && styles.buttonPressed,
              flipping && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.flipButtonText}>
              {flipping ? t("coin.flipping") : t("coin.flipButton")}
            </Text>
          </Pressable>
          <Text style={styles.helper}>{t("coin.helper")}</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}
