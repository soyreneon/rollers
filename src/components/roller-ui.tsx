import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { t } from '@/i18n';

import { styles } from './roller-ui.styles';

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
      <Text style={styles.backLabel}>{t('common.back')}</Text>
    </Pressable>
  );
}
