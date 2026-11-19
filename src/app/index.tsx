import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenFrame, theme } from '@/components/roller-ui';

export default function HomeScreen() {
  return (
    <ScreenFrame>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>R</Text>
            </View>
            <Text style={styles.brandName}>ROLLERS</Text>
            <View style={styles.liveTag}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>READY</Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>LET FATE TAKE THE WHEEL</Text>
            <Text style={styles.title}>
              MAKE YOUR{'\n'}
              <Text style={styles.titleAccent}>NEXT MOVE.</Text>
            </Text>
            <Text style={styles.description}>
              One tap. One outcome. Pick your kind of chance.
            </Text>
          </View>
        </View>

        <View style={styles.options}>
          <Text style={styles.sectionLabel}>CHOOSE YOUR GAME</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open coin flip"
            onPress={() => router.push('/coin-flip')}
            style={({ pressed }) => [styles.optionCard, styles.coinCard, pressed && styles.pressed]}>
            <View style={styles.coinIcon}>
              <Text style={styles.coinIconText}>C</Text>
            </View>
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>COIN FLIP</Text>
              <Text style={styles.optionDescription}>Heads or tails. No second guessing.</Text>
            </View>
            <Text style={[styles.arrow, { color: theme.pink }]}>↗</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open dice roller"
            onPress={() => router.push('/dice-roller')}
            style={({ pressed }) => [styles.optionCard, styles.diceCard, pressed && styles.pressed]}>
            <View style={styles.diceIcon}>
              <View style={styles.miniPips}>
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
                <View style={styles.miniPip} />
              </View>
            </View>
            <View style={styles.optionCopy}>
              <Text style={styles.optionTitle}>DICE ROLLER</Text>
              <Text style={styles.optionDescription}>Tap to roll. Feel the shake.</Text>
            </View>
            <Text style={[styles.arrow, { color: theme.cyan }]}>↗</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>NO SKILLS. JUST LUCK.</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: theme.cyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandMarkText: {
    color: theme.black,
    fontSize: 20,
    fontWeight: '900',
  },
  brandName: {
    color: theme.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
  },
  liveTag: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.lime,
  },
  liveText: {
    color: theme.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  hero: {
    paddingTop: 55,
    paddingBottom: 38,
  },
  eyebrow: {
    color: theme.pink,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.4,
    marginBottom: 15,
  },
  title: {
    color: theme.white,
    fontSize: 43,
    lineHeight: 47,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  titleAccent: {
    color: theme.cyan,
  },
  description: {
    color: theme.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
  },
  options: {
    gap: 12,
  },
  sectionLabel: {
    color: theme.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 2,
  },
  optionCard: {
    minHeight: 116,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 17,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.panel,
    gap: 15,
  },
  coinCard: {
    borderColor: '#713762',
  },
  diceCard: {
    borderColor: '#246B60',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  coinIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: theme.pink,
    backgroundColor: '#241323',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.pink,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 5,
  },
  coinIconText: {
    color: theme.pink,
    fontSize: 25,
    fontWeight: '800',
  },
  diceIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.cyan,
    backgroundColor: '#10221F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.cyan,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 5,
  },
  miniPips: {
    width: 29,
    height: 29,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  miniPip: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.cyan,
  },
  optionCopy: {
    flex: 1,
    gap: 6,
  },
  optionTitle: {
    color: theme.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  optionDescription: {
    color: theme.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 30,
  },
  footerLine: {
    width: 30,
    height: 1,
    backgroundColor: theme.border,
  },
  footerText: {
    color: theme.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
