import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  brandMarkText: {
    color: theme.colors.background,
    fontSize: 20,
    fontWeight: "900",
  },
  brandName: {
    color: theme.colors.foreground,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    color: theme.colors.muted,
    fontSize: 17,
  },
  config: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 7,
  },
  hero: {
    paddingTop: 55,
    paddingBottom: 38,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.4,
    marginBottom: 15,
  },
  title: {
    color: theme.colors.foreground,
    fontSize: 43,
    lineHeight: 47,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
  },
  options: {
    gap: 12,
  },
  sectionLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 2,
  },
  optionCard: {
    minHeight: 116,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 17,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    gap: 15,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  optionCopy: {
    flex: 1,
    gap: 6,
  },
  optionTitle: {
    color: theme.colors.foreground,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  optionDescription: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  arrow: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingTop: 30,
  },
  footerLine: {
    width: 30,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  footerText: {
    color: theme.colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
