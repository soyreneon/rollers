import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const theme = {
  black: '#050607',
  panel: '#101315',
  white: '#F5F7F6',
  muted: '#858D8D',
  border: '#262B2D',
  cyan: '#56FFD6',
  pink: '#FF67DA',
  lime: '#C8FF58',
};

type ScreenFrameProps = {
  children: ReactNode;
};

export function ScreenFrame({ children }: ScreenFrameProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.frame}>{children}</View>
    </SafeAreaView>
  );
}

type BackButtonProps = {
  onPress: () => void;
  accent: string;
};

export function BackButton({ onPress, accent }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      style={({ pressed }) => [styles.backButton, pressed && styles.backPressed]}>
      <Text style={[styles.backArrow, { color: accent }]}>‹</Text>
      <Text style={styles.backLabel}>BACK</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.black,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 7,
    paddingRight: 12,
  },
  backArrow: {
    fontSize: 30,
    lineHeight: 34,
    marginTop: -3,
  },
  backLabel: {
    color: theme.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  backPressed: {
    opacity: 0.6,
  },
});
