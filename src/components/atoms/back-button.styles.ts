import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  button: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 7,
    paddingRight: 12,
  },
  arrow: {
    fontSize: 30,
    lineHeight: 34,
    marginTop: -3,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  pressed: {
    opacity: 0.6,
  },
});
