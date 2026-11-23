import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BackButton } from '@/components/common/back-button';
import { ScreenFrame } from '@/components/common/screen-frame';
import {
  colorPresets,
  type ColorPresetId,
} from '@/config/app-config';
import { useAppConfig } from '@/config/app-config-provider';
import { t } from '@/i18n';
import { useAppTheme } from '@/theme/use-app-theme';

import { styles } from './settings-screen.styles';

const colorNameKeys: Record<
  ColorPresetId,
  Parameters<typeof t>[0]
> = {
  pink: 'settings.pink',
  cyan: 'settings.cyan',
  lime: 'settings.lime',
  purple: 'settings.purple',
  orange: 'settings.orange',
  blue: 'settings.blue',
};

function ColorChoices({
  selected,
  onSelect,
}: {
  selected: ColorPresetId;
  onSelect: (color: ColorPresetId) => void;
}) {
  return (
    <View style={styles.choices}>
      {colorPresets.map((preset) => {
        const isSelected = preset.id === selected;

        return (
          <Pressable
            key={preset.id}
            accessibilityRole="button"
            accessibilityLabel={`${t(colorNameKeys[preset.id])}${isSelected ? `, ${t('settings.selected')}` : ''}`}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(preset.id)}
            style={({ pressed }) => [
              styles.choice,
              {
                borderColor: isSelected ? preset.accent : '#262B2D',
                backgroundColor: isSelected
                  ? preset.coin.surface
                  : '#101315',
              },
              pressed && styles.choicePressed,
            ]}
          >
            <View
              style={[
                styles.swatch,
                {
                  backgroundColor: preset.accent,
                  shadowColor: preset.accent,
                },
              ]}
            />
            <Text style={styles.choiceName}>{t(colorNameKeys[preset.id])}</Text>
            {isSelected && (
              <Text
                accessibilityLabel={t('settings.selected')}
                style={[styles.checkmark, { color: preset.accent }]}
              >
                ✓
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export default function SettingsScreen() {
  const { color, setColor } = useAppConfig();
  const theme = useAppTheme();

  return (
    <ScreenFrame>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BackButton
          accent={theme.colors.coin.accent}
          onPress={() => router.back()}
        />
        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: theme.colors.dice.accent }]}>
            {t('settings.eyebrow')}
          </Text>
          <Text style={styles.title}>{t('settings.title')}</Text>
          <Text style={styles.description}>{t('settings.description')}</Text>
        </View>

        <View style={styles.group}>
          <View style={styles.groupHeading}>
            <View
              style={[
                styles.groupMark,
                { backgroundColor: theme.colors.coin.accent },
              ]}
            />
            <Text style={styles.groupTitle}>{t('settings.globalTitle')}</Text>
          </View>
          <Text style={styles.hint}>{t('settings.globalHint')}</Text>
          <ColorChoices selected={color} onSelect={setColor} />
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
