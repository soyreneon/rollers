import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 28,
  },
  heading: {
    alignItems: "center",
    paddingTop: 25,
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
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.3,
    marginTop: 38,
  },
  actions: {
    alignItems: "center",
    gap: 14,
  },
  rollButton: {
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
  rollButtonText: {
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
