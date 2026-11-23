import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Platform, Pressable, Text, Vibration, View } from "react-native";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { BackButton } from "@/components/atoms/back-button";
import { ScreenFrame } from "@/components/templates/screen-frame";
import { useTranslation } from "@/i18n/use-translation";
import { useAppTheme } from "@/theme/use-app-theme";
import SkiaDie from "./skia-die";

import { styles } from "./dice-roller-screen.styles";

function getDieResult(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function getTargetOrientation(result: number): { x: number; y: number } {
  switch (result) {
    case 2:
      return { x: Math.PI / 2, y: 0 };
    case 3:
      return { x: 0, y: -Math.PI / 2 };
    case 4:
      return { x: 0, y: Math.PI / 2 };
    case 5:
      return { x: -Math.PI / 2, y: 0 };
    case 6:
      return { x: 0, y: Math.PI };
    default:
      return { x: 0, y: 0 };
  }
}

export default function DiceRollerScreen() {
  const t = useTranslation();
  const theme = useAppTheme();
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [result, setResult] = useState(1);
  const [rolling, setRolling] = useState(false);

  const finishRoll = useCallback((nextResult: number) => {
    setResult(nextResult);
    setRolling(false);
  }, []);

  const rollDie = () => {
    if (rolling) return;

    const nextResult = getDieResult();
    setRolling(true);
    if (Platform.OS !== "web") {
      Vibration.vibrate([0, 45, 35, 90]);
    }

    const target = getTargetOrientation(nextResult);
    const fullTurn = Math.PI * 2;
    const xTurns =
      Math.ceil((rotationX.value - target.x) / fullTurn) +
      2 +
      Math.floor(Math.random() * 2);
    const yTurns =
      Math.ceil((rotationY.value - target.y) / fullTurn) +
      2 +
      Math.floor(Math.random() * 2);

    rotationX.value = withTiming(
      target.x + xTurns * fullTurn,
      {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(finishRoll)(nextResult);
        }
      },
    );
    rotationY.value = withTiming(target.y + yTurns * fullTurn, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withSequence(
      withTiming(0.84, {
        duration: 700,
        easing: Easing.inOut(Easing.cubic),
      }),
      withSpring(1, { damping: 12, stiffness: 150 }),
    );
  };

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton
          accent={theme.colors.dice.accent}
          onPress={() => router.back()}
        />

        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: theme.colors.dice.accent }]}>
            {t("dice.eyebrow")}
          </Text>
          <Text style={styles.title}>{t("dice.title")}</Text>
          <Text style={styles.subtitle}>{t("dice.subtitle")}</Text>
        </View>

        <View style={styles.stage}>
          <SkiaDie
            rotationX={rotationX}
            rotationY={rotationY}
            scale={scale}
            accessibilityLabel={
              rolling ? t("dice.rolling") : t("dice.result", { result })
            }
          />
          <Text
            style={[styles.resultLabel, { color: theme.colors.dice.accent }]}
          >
            {rolling ? t("dice.rolling") : t("dice.result", { result })}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("dice.accessibility")}
            disabled={rolling}
            onPress={rollDie}
            style={({ pressed }) => [
              styles.rollButton,
              {
                backgroundColor: theme.colors.dice.accent,
                shadowColor: theme.colors.dice.accent,
              },
              pressed && !rolling && styles.buttonPressed,
              rolling && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.rollButtonText}>
              {rolling ? t("dice.rolling") : t("dice.rollButton")}
            </Text>
          </Pressable>
          <Text style={styles.helper}>{t("dice.helper")}</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}
