import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G, Line } from "react-native-svg";

import { BackButton } from "@/components/atoms/back-button";
import { ScreenFrame } from "@/components/templates/screen-frame";
import { useTranslation } from "@/i18n/use-translation";
import { Roulette } from "@/icons";
import { useAppTheme } from "@/theme/use-app-theme";

import { styles } from "./roulette-screen.styles";

const DEFAULT_OPTIONS = Array.from({ length: 37 }, (_, number) =>
  String(number),
);

function chooseOption(options: string[]) {
  return options[Math.floor(Math.random() * options.length)];
}

export default function RouletteScreen() {
  const t = useTranslation();
  const theme = useAppTheme();
  const rotation = useSharedValue(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [customName, setCustomName] = useState("");
  const [duplicateName, setDuplicateName] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const finishSpin = useCallback((nextResult: string) => {
    setResult(nextResult);
    setSpinning(false);
  }, []);

  const spin = () => {
    if (spinning || options.length === 0) return;

    const nextResult = chooseOption(options);
    setResult(null);
    setSpinning(true);
    rotation.value = withTiming(
      rotation.value + Math.PI * 2 * (6 + Math.random() * 4),
      { duration: 3200, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(finishSpin)(nextResult);
      },
    );
  };

  const addName = () => {
    const name = customName.trim();
    if (!name) return;
    if (options.some((option) => option.toLowerCase() === name.toLowerCase())) {
      setDuplicateName(true);
      return;
    }

    setOptions((currentOptions) => [...currentOptions, name]);
    setCustomName("");
    setDuplicateName(false);
  };

  const removeName = (nameToRemove: string) => {
    setOptions((currentOptions) =>
      currentOptions.filter((option) => option !== nameToRemove),
    );
    if (result === nameToRemove) setResult(null);
  };

  const wheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}rad` }],
  }));

  return (
    <ScreenFrame>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <BackButton
          accent={theme.colors.dice.accent}
          onPress={() => router.back()}
        />

        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: theme.colors.dice.accent }]}>
            {t("roulette.eyebrow")}
          </Text>
          <Text style={styles.title}>{t("roulette.title")}</Text>
          <Text style={styles.subtitle}>{t("roulette.subtitle")}</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.wheel}>
            <Roulette
              size={220}
              color={theme.colors.dice.accent}
              strokeColor={theme.colors.background}
            />
            <Animated.View style={[styles.spinningWheel, wheelStyle]}>
              <Svg width="100%" height="100%" viewBox="0 0 128 128">
                <Circle
                  cx={64}
                  cy={64}
                  r={61}
                  fill={theme.colors.background}
                  stroke={theme.colors.dice.accent}
                  strokeWidth={2}
                />
                {Array.from({ length: 12 }, (_, index) => (
                  <G key={index} transform={`rotate(${index * 30} 64 64)`}>
                    <Line
                      x1={64}
                      y1={4}
                      x2={64}
                      y2={124}
                      stroke={theme.colors.dice.accent}
                      strokeWidth={2}
                    />
                  </G>
                ))}
                <Circle
                  cx={64}
                  cy={64}
                  r={14}
                  fill={theme.colors.background}
                  stroke={theme.colors.dice.accent}
                  strokeWidth={2}
                />
              </Svg>
            </Animated.View>
          </View>
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.result, { color: theme.colors.dice.accent }]}
          >
            {spinning
              ? t("roulette.spinning")
              : (result ?? t("roulette.waiting"))}
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <Text style={styles.optionsLabel}>{t("roulette.optionsLabel")}</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.optionList}
            showsHorizontalScrollIndicator={false}
          >
            {options.map((option, index) =>
              index >= DEFAULT_OPTIONS.length ? (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityLabel={t("roulette.removeName", {
                    name: option,
                  })}
                  onPress={() => removeName(option)}
                  style={[
                    styles.optionChip,
                    { borderColor: theme.colors.dice.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.colors.dice.accent },
                    ]}
                  >
                    {option} ×
                  </Text>
                </Pressable>
              ) : (
                <View
                  key={option}
                  style={[
                    styles.optionChip,
                    { borderColor: theme.colors.dice.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.colors.dice.accent },
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              ),
            )}
          </ScrollView>

          <View style={styles.addRow}>
            <TextInput
              accessibilityLabel={t("roulette.nameInputAccessibility")}
              editable={!spinning}
              onChangeText={(name) => {
                setCustomName(name);
                setDuplicateName(false);
              }}
              onSubmitEditing={addName}
              placeholder={t("roulette.namePlaceholder")}
              placeholderTextColor={theme.colors.muted}
              returnKeyType="done"
              style={[
                styles.input,
                {
                  borderColor: theme.colors.dice.accent,
                  color: theme.colors.foreground,
                },
              ]}
              value={customName}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("roulette.addNameAccessibility")}
              disabled={spinning || !customName.trim()}
              onPress={addName}
              style={({ pressed }) => [
                styles.addButton,
                {
                  backgroundColor: theme.colors.dice.accent,
                },
                pressed && styles.buttonPressed,
                (!customName.trim() || spinning) && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.addButtonText}>
                {t("roulette.addButton")}
              </Text>
            </Pressable>
          </View>
          {duplicateName && (
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.inputHint, { color: theme.colors.dice.accent }]}
            >
              {t("roulette.duplicateName")}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("roulette.accessibility")}
            disabled={spinning}
            onPress={spin}
            style={({ pressed }) => [
              styles.spinButton,
              {
                backgroundColor: theme.colors.dice.accent,
                shadowColor: theme.colors.dice.accent,
              },
              pressed && !spinning && styles.buttonPressed,
              spinning && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.spinButtonText}>
              {spinning ? t("roulette.spinning") : t("roulette.spinButton")}
            </Text>
          </Pressable>
          <Text style={styles.helper}>{t("roulette.helper")}</Text>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
