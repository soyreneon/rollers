import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 28,
    gap: 22,
  },
  heading: {
    alignItems: "center",
    paddingTop: 12,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.3,
  },
  title: {
    color: theme.colors.foreground,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 8,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 255,
  },
  wheel: {
    width: 220,
    height: 220,
    position: "relative",
  },
  spinningWheel: {
    width: 128,
    height: 128,
    position: "absolute",
    left: 46,
    top: 36,
  },
  result: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginTop: 12,
    textAlign: "center",
  },
  optionsSection: {
    gap: 12,
  },
  optionsLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  optionList: {
    gap: 8,
  },
  optionChip: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
  },
  optionText: {
    fontSize: 11,
    fontWeight: "800",
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  inputHint: {
    fontSize: 12,
    fontWeight: "700",
  },
  addButton: {
    minHeight: 48,
    minWidth: 78,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
  actions: {
    alignItems: "center",
    gap: 14,
  },
  spinButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.38,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  spinButtonText: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
  },
  helper: {
    color: theme.colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
