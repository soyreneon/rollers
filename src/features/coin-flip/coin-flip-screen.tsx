import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BackButton } from '@/components/common/back-button';
import { ScreenFrame } from '@/components/common/screen-frame';
import { useTranslation } from '@/i18n/use-translation';
import { useAppTheme } from '@/theme/use-app-theme';
import SkiaCoin from './skia-coin';

import { styles } from './coin-flip-screen.styles';

function getCoinResult(): 'HEADS' | 'TAILS' {
  return Math.random() < 0.5 ? 'HEADS' : 'TAILS';
}

export default function CoinFlipScreen() {
  const t = useTranslation();
  const theme = useAppTheme();
  const angle = useSharedValue(0);
  const [result, setResult] = useState<'HEADS' | 'TAILS' | null>(null);
  const [flipping, setFlipping] = useState(false);

  const finishFlip = useCallback((nextResult: 'HEADS' | 'TAILS') => {
    setResult(nextResult);
    setFlipping(false);
  }, []);

  const flipCoin = () => {
    if (flipping) return;

    const nextResult = getCoinResult();
    const sideChange = nextResult === (result ?? 'HEADS') ? 0 : Math.PI;
    const nextAngle = angle.value + Math.PI * 8 + sideChange;

    setFlipping(true);
    angle.value = withTiming(
      nextAngle,
      {
        duration: 1700,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(finishFlip)(nextResult);
        }
      },
    );
  };

  const resultLabel = result
    ? t('coin.result', {
        result: t(result === 'HEADS' ? 'coin.heads' : 'coin.tails'),
      })
    : t('coin.waiting');

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton
          accent={theme.colors.coin.accent}
          onPress={() => router.back()}
        />

        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: theme.colors.coin.accent }]}>
            {t('coin.eyebrow')}
          </Text>
          <Text style={styles.title}>{t('coin.title')}</Text>
          <Text style={styles.subtitle}>{t('coin.subtitle')}</Text>
        </View>

        <View style={styles.stage}>
          <SkiaCoin
            angle={angle}
            accessibilityLabel={
              flipping
                ? t('coin.flipping')
                : t(result === 'TAILS' ? 'coin.tailsSide' : 'coin.headsSide')
            }
          />
          <Text
            style={[styles.resultLabel, { color: theme.colors.coin.accent }]}>
            {flipping ? t('coin.inAir') : resultLabel}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('coin.accessibility')}
            disabled={flipping}
            onPress={flipCoin}
            style={({ pressed }) => [
              styles.flipButton,
              {
                backgroundColor: theme.colors.coin.accent,
                shadowColor: theme.colors.coin.accent,
              },
              pressed && !flipping && styles.buttonPressed,
              flipping && styles.buttonDisabled,
            ]}>
            <Text style={styles.flipButtonText}>
              {flipping ? t('coin.flipping') : t('coin.flipButton')}
            </Text>
          </Pressable>
          <Text style={styles.helper}>{t('coin.helper')}</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}
