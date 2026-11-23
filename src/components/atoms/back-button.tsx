import { Pressable, Text } from "react-native";

import { useTranslation } from "@/i18n/use-translation";

import { styles } from "./back-button.styles";

type BackButtonProps = {
  accent: string;
  onPress: () => void;
};

export function BackButton({ accent, onPress }: BackButtonProps) {
  const t = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("common.backAccessibility")}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={[styles.arrow, { color: accent }]}>‹</Text>
      <Text style={styles.label}>{t("common.back")}</Text>
    </Pressable>
  );
}
