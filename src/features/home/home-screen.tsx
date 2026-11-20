import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ScreenFrame } from "@/components/common/screen-frame";
import { t } from "@/i18n";
import { theme } from "@/theme";

import { styles } from "./home-screen.styles";

export default function HomeScreen() {
  return (
    <ScreenFrame>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>R</Text>
            </View>
            <Text style={styles.brandName}>{t("home.brand")}</Text>
            <View style={styles.liveTag}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{t("home.ready")}</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>{t("home.heroEyebrow")}</Text>
            <Text style={styles.title}>
              {t("home.titleLead")}
              <Text style={styles.titleAccent}>{t("home.titleAccent")}</Text>
            </Text>
            <Text style={styles.description}>{t("home.description")}</Text>
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
              styles.coinCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.coinIcon}>
              <Text style={styles.coinIconText}>C</Text>
            </View>
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
              styles.diceCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.diceIcon}>
              <View style={styles.miniPips}>
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
              </View>
            </View>
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
