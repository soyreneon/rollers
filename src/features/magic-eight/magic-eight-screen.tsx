import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { BackButton } from "@/components/atoms/back-button";
import { ScreenFrame } from "@/components/templates/screen-frame";
import { useTranslation } from "@/i18n/use-translation";
import type { TranslationKey } from "@/i18n/translations/en";
import { BallEight } from "@/icons";
import { useAppTheme } from "@/theme/use-app-theme";

import { styles } from "./magic-eight-screen.styles";

const ANSWERS: TranslationKey[] = [
  "magic.answer.yesDefinitely",
  "magic.answer.itIsCertain",
  "magic.answer.withoutDoubt",
  "magic.answer.replyHazy",
  "magic.answer.askAgain",
  "magic.answer.doNotCount",
  "magic.answer.mySourcesSayNo",
  "magic.answer.outlookNotGood",
];

export default function MagicEightScreen() {
  const t = useTranslation();
  const theme = useAppTheme();
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const [answer, setAnswer] = useState<TranslationKey | null>(null);
  const [shaking, setShaking] = useState(false);

  const revealAnswer = useCallback((nextAnswer: TranslationKey) => {
    setAnswer(nextAnswer);
    setShaking(false);
  }, []);

  const askBall = () => {
    if (shaking) return;

    const nextAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    setAnswer(null);
    setShaking(true);
    opacity.value = 1;
    scale.value = 1;
    opacity.value = withTiming(
      0,
      { duration: 1100, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(revealAnswer)(nextAnswer);
      },
    );
    scale.value = withTiming(0.15, {
      duration: 1100,
      easing: Easing.in(Easing.cubic),
    });
  };

  const ballStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton
          accent={theme.colors.dice.accent}
          onPress={() => router.back()}
        />

        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: theme.colors.dice.accent }]}>
            {t("magic.eyebrow")}
          </Text>
          <Text style={styles.title}>{t("magic.title")}</Text>
          <Text style={styles.subtitle}>{t("magic.subtitle")}</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.ballStage}>
            <Animated.View style={[styles.ball, ballStyle]}>
              <BallEight
                size={190}
                color={theme.colors.dice.accent}
                strokeColor={theme.colors.background}
              />
            </Animated.View>
            {answer && (
              <Text
                accessibilityLiveRegion="polite"
                style={[styles.answer, { color: theme.colors.dice.accent }]}
              >
                {t(answer)}
              </Text>
            )}
          </View>
          {!answer && (
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.result, { color: theme.colors.dice.accent }]}
            >
              {shaking ? t("magic.vanishing") : t("magic.waiting")}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("magic.accessibility")}
            disabled={shaking}
            onPress={askBall}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: theme.colors.dice.accent,
                shadowColor: theme.colors.dice.accent,
              },
              pressed && !shaking && styles.buttonPressed,
              shaking && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {shaking ? t("magic.vanishing") : t("magic.askButton")}
            </Text>
          </Pressable>
          <Text style={styles.helper}>{t("magic.helper")}</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}
