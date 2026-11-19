import { StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

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
    color: theme.dice,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.3,
  },
  title: {
    color: theme.white,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 8,
  },
  subtitle: {
    color: theme.muted,
    fontSize: 14,
    marginTop: 8,
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  resultLabel: {
    color: theme.dice,
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
    backgroundColor: theme.dice,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.dice,
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
    color: theme.black,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
  },
  helper: {
    color: theme.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
