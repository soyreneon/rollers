import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 28,
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 26,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.3,
  },
  title: {
    color: theme.colors.foreground,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginTop: 8,
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  group: {
    gap: 9,
    paddingBottom: 12,
  },
  groupHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  groupMark: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  groupTitle: {
    color: theme.colors.foreground,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.7,
  },
  hint: {
    color: theme.colors.muted,
    fontSize: 12,
    marginBottom: 3,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  choice: {
    width: "31%",
    minHeight: 78,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 11,
    justifyContent: "center",
    gap: 9,
  },
  choicePressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  swatch: {
    width: 18,
    height: 18,
    borderRadius: 9,
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 3,
  },
  choiceName: {
    color: theme.colors.foreground,
    fontSize: 10,
    fontWeight: "700",
  },
  checkmark: {
    position: "absolute",
    right: 9,
    top: 8,
    fontSize: 12,
    fontWeight: "900",
  },
});
