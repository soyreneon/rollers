import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  Vibration,
  View,
} from "react-native";
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

const countAccessibilityLabels = [
  "dice.countOneAccessibility",
  "dice.countTwoAccessibility",
  "dice.countThreeAccessibility",
] as const;

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

function useDieAnimation() {
  return {
    rotationX: useSharedValue(0),
    rotationY: useSharedValue(0),
    scale: useSharedValue(1),
  };
}

export default function DiceRollerScreen() {
  const t = useTranslation();
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const dieAnimations = [
    useDieAnimation(),
    useDieAnimation(),
    useDieAnimation(),
  ];
  const remainingDice = useSharedValue(0);
  const [results, setResults] = useState([1]);
  const [diceCount, setDiceCount] = useState(1);
  const [rolling, setRolling] = useState(false);
  const availableWidth = Math.min(width, 500) - 48;
  const dieSize =
    diceCount === 1
      ? Math.min(280, availableWidth)
      : Math.min(190, (availableWidth - 12) / 2);

  const finishRoll = useCallback((nextResults: number[]) => {
    setResults(nextResults);
    setRolling(false);
  }, []);

  const rollDie = () => {
    if (rolling) return;

    const nextResults = Array.from({ length: diceCount }, getDieResult);
    setRolling(true);
    remainingDice.value = diceCount;
    if (Platform.OS !== "web") {
      Vibration.vibrate([0, 45, 35, 90]);
    }

    const fullTurn = Math.PI * 2;
    dieAnimations.slice(0, diceCount).forEach((die, index) => {
      const target = getTargetOrientation(nextResults[index]);
      const xTurns =
        Math.ceil((die.rotationX.value - target.x) / fullTurn) +
        2 +
        Math.floor(Math.random() * 2);
      const yTurns =
        Math.ceil((die.rotationY.value - target.y) / fullTurn) +
        2 +
        Math.floor(Math.random() * 2);

      die.rotationX.value = withTiming(
        target.x + xTurns * fullTurn,
        {
          duration: 2500,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            remainingDice.value -= 1;
            if (remainingDice.value === 0) {
              runOnJS(finishRoll)(nextResults);
            }
          }
        },
      );
      die.rotationY.value = withTiming(target.y + yTurns * fullTurn, {
        duration: 2500,
        easing: Easing.out(Easing.cubic),
      });
      die.scale.value = withSequence(
        withTiming(0.84, {
          duration: 900,
          easing: Easing.inOut(Easing.cubic),
        }),
        withSpring(1, { damping: 12, stiffness: 150 }),
      );
    });
  };

  const resultLabel =
    diceCount === 1
      ? t("dice.result", { result: results[0] })
      : t("dice.results", {
          results: results.join(", "),
          total: results.reduce((sum, result) => sum + result, 0),
        });

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

        <View style={styles.diceCount}>
          <Text style={styles.diceCountLabel}>{t("dice.countLabel")}</Text>
          <View style={styles.diceCountOptions}>
            {[1, 2, 3].map((count) => (
              <Pressable
                key={count}
                accessibilityRole="button"
                accessibilityLabel={t(countAccessibilityLabels[count - 1])}
                accessibilityState={{
                  selected: count === diceCount,
                  disabled: rolling,
                }}
                disabled={rolling}
                onPress={() => {
                  setDiceCount(count);
                  setResults((currentResults) =>
                    Array.from(
                      { length: count },
                      (_, index) => currentResults[index] ?? 1,
                    ),
                  );
                }}
                style={({ pressed }) => [
                  styles.diceCountOption,
                  count === diceCount && {
                    backgroundColor: theme.colors.dice.accent,
                    borderColor: theme.colors.dice.accent,
                  },
                  pressed && !rolling && styles.buttonPressed,
                  rolling && styles.buttonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.diceCountOptionText,
                    count === diceCount && styles.diceCountOptionTextSelected,
                  ]}
                >
                  {count}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.stage}>
          {dieAnimations.slice(0, diceCount).map((die, index) => (
            <View key={index} style={{ width: dieSize, height: dieSize }}>
              <SkiaDie
                rotationX={die.rotationX}
                rotationY={die.rotationY}
                scale={die.scale}
                size={dieSize}
                accessibilityLabel={
                  rolling
                    ? t("dice.rolling")
                    : t("dice.result", { result: results[index] })
                }
              />
            </View>
          ))}
        </View>
        <Text style={[styles.resultLabel, { color: theme.colors.dice.accent }]}>
          {rolling ? t("dice.rolling") : resultLabel}
        </Text>

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
