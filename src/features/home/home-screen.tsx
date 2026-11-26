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
        <View>
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
            <View style={styles.config}>
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
          </View>

          <View style={styles.hero}>
            <Text style={[styles.eyebrow, { color: theme.colors.coin.accent }]}>
              {t("home.heroEyebrow")}
            </Text>
            <Text style={styles.title}>
              {t("home.titleLead")}
              <Text style={{ color: theme.colors.dice.accent }}>
                {t("home.titleAccent")}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.options}>
          <Text style={styles.sectionLabel}>{t("home.section")}</Text>
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
            <Coin size={50} color={theme.colors.coin.accent} />

            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>{t("home.coinTitle")}</Text>
              <Text style={styles.optionDescription}>
                {t("home.coinDescription")}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.colors.coin.accent }]}>
              ↗
            </Text>
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
            <Dice size={50} color={theme.colors.dice.accent} />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>{t("home.diceTitle")}</Text>
              <Text style={styles.optionDescription}>
                {t("home.diceDescription")}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.colors.dice.accent }]}>
              ↗
            </Text>
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
              size={50}
              color={theme.colors.dice.accent}
              strokeColor={theme.colors.background}
            />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>
                {t("home.magicEightTitle")}
              </Text>
              <Text style={styles.optionDescription}>
                {t("home.magicEightDescription")}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.colors.dice.accent }]}>
              ↗
            </Text>
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
              size={50}
              color={theme.colors.dice.accent}
              strokeColor={theme.colors.background}
            />
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>{t("home.rouletteTitle")}</Text>
              <Text style={styles.optionDescription}>
                {t("home.rouletteDescription")}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.colors.dice.accent }]}>
              ↗
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>{t("home.footer")}</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
