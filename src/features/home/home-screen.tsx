import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ScreenFrame } from "@/components/templates/screen-frame";
import { useTranslation } from "@/i18n/use-translation";
import { BallEight, Coin, Dice, Roulette } from "@/icons";
import { useAppTheme } from "@/theme/use-app-theme";

import { styles } from "./home-screen.styles";

export default function HomeScreen() {
  const t = useTranslation();
  const theme = useAppTheme();

  return (
    <ScreenFrame>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View
            style={[
              styles.brandMark,
              { backgroundColor: theme.colors.dice.accent },
            ]}
          >
            <Text style={styles.brandMarkText}>R</Text>
          </View>
          <Text style={styles.brandName}>{t("home.brand")}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.settingsAccessibility")}
            onPress={() => router.push("/settings")}
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>

        <View style={styles.options}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.coinAccessibility")}
            onPress={() => router.push("/coin-flip")}
            style={({ pressed }) => [
              styles.optionCard,
              { borderColor: theme.colors.coin.accent },
              pressed && styles.pressed,
            ]}
          >
            <Coin size={64} color={theme.colors.coin.accent} />
            <Text style={styles.optionTitle}>{t("home.coinTitle")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.diceAccessibility")}
            onPress={() => router.push("/dice-roller")}
            style={({ pressed }) => [
              styles.optionCard,
              { borderColor: theme.colors.dice.accent },
              pressed && styles.pressed,
            ]}
          >
            <Dice size={64} color={theme.colors.dice.accent} />
            <Text style={styles.optionTitle}>{t("home.diceTitle")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.magicEightAccessibility")}
            onPress={() => router.push("/magic-eight")}
            style={({ pressed }) => [
              styles.optionCard,
              { borderColor: theme.colors.dice.accent },
              pressed && styles.pressed,
            ]}
          >
            <BallEight
              size={64}
              color={theme.colors.dice.accent}
              strokeColor={theme.colors.background}
            />
            <Text style={styles.optionTitle}>{t("home.magicEightTitle")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.rouletteAccessibility")}
            onPress={() => router.push("/roulette")}
            style={({ pressed }) => [
              styles.optionCard,
              { borderColor: theme.colors.dice.accent },
              pressed && styles.pressed,
            ]}
          >
            <Roulette
              size={64}
              color={theme.colors.dice.accent}
              strokeColor={theme.colors.background}
            />
            <Text style={styles.optionTitle}>{t("home.rouletteTitle")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
