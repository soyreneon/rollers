import { StyleSheet } from 'react-native';

import { theme } from '@/constants/theme';

export const styles = StyleSheet.create({
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
