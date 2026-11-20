import { Pressable, Text } from 'react-native';

import { t } from '@/i18n';

import { styles } from '@/styles/components/back-button.styles';

type BackButtonProps = {
  accent: string;
  onPress: () => void;
};

export function BackButton({ accent, onPress }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('common.backAccessibility')}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={[styles.arrow, { color: accent }]}>‹</Text>
      <Text style={styles.label}>{t('common.back')}</Text>
    </Pressable>
  );
}
