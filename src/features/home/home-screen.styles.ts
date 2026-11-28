import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 28,
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
    marginLeft: "auto",
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
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    alignContent: "center",
    height: "95%",
  },
  optionCard: {
    width: "48.5%",
    aspectRatio: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    gap: 16,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  optionTitle: {
    color: theme.colors.foreground,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.1,
    textAlign: "center",
  },
});
