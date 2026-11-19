import { router } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

import { BackButton, ScreenFrame, theme } from "@/components/roller-ui";

const pipPatterns: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function getDieResult(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export default function DiceRollerScreen() {
  const [rotationX] = useState(() => new Animated.Value(0));
  const [rotationY] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(1));
  const [opacity] = useState(() => new Animated.Value(1));
  const [lift] = useState(() => new Animated.Value(0));
  const [result, setResult] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDie = () => {
    if (rolling) return;

    const nextResult = getDieResult();
    setRolling(true);
    if (Platform.OS !== "web") {
      Vibration.vibrate([0, 45, 35, 90]);
    }

    Animated.parallel([
      Animated.timing(rotationX, {
        toValue: 540,
        duration: 520,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(rotationY, {
        toValue: 360,
        duration: 520,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.12,
        duration: 520,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 420,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lift, {
        toValue: -28,
        duration: 520,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        setRolling(false);
        return;
      }

      setResult(nextResult);
      Animated.parallel([
        Animated.timing(rotationX, {
          toValue: 720,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rotationY, {
          toValue: 720,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          speed: 15,
          bounciness: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(lift, {
          toValue: 0,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => setRolling(false));
    });
  };

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton onPress={() => router.back()} accent={theme.cyan} />

        <View style={styles.heading}>
          <Text style={styles.eyebrow}>LET IT ROLL</Text>
          <Text style={styles.title}>DICE ROLLER</Text>
          <Text style={styles.subtitle}>A little chaos never hurt.</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.dieGlow} />
          <Animated.View
            style={[
              styles.die,
              {
                opacity,
                transform: [
                  { perspective: 700 },
                  { translateY: lift },
                  {
                    rotateX: rotationX.interpolate({
                      inputRange: [0, 540, 720],
                      outputRange: ["0deg", "540deg", "720deg"],
                    }),
                  },
                  {
                    rotateY: rotationY.interpolate({
                      inputRange: [0, 360, 720],
                      outputRange: ["0deg", "360deg", "720deg"],
                    }),
                  },
                  { scale },
                ],
              },
            ]}
          >
            <View style={styles.dieFace}>
              {[0, 1, 2].map((row) => (
                <View key={row} style={styles.dieRow}>
                  {[0, 1, 2].map((column) => {
                    const pip = row * 3 + column;
                    return (
                      <View key={pip} style={styles.dieCell}>
                        <View
                          style={[
                            styles.pip,
                            !pipPatterns[result].includes(pip) &&
                              styles.hiddenPip,
                          ]}
                        />
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </Animated.View>
          <Text style={styles.resultLabel}>
            {rolling ? "ROLLING..." : `YOU ROLLED A ${result}`}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Roll the die"
            disabled={rolling}
            onPress={rollDie}
            style={({ pressed }) => [
              styles.rollButton,
              pressed && !rolling && styles.buttonPressed,
              rolling && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.rollButtonText}>
              {rolling ? "ROLLING..." : "ROLL DICE"}
            </Text>
          </Pressable>
          <Text style={styles.helper}>SHAKE IT UP</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
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
    color: theme.cyan,
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
  dieGlow: {
    position: "absolute",
    width: 205,
    height: 205,
    borderRadius: 50,
    backgroundColor: "#11332E",
    opacity: 0.65,
    shadowColor: theme.cyan,
    shadowOpacity: 0.8,
    shadowRadius: 70,
    elevation: 14,
  },
  die: {
    width: 190,
    height: 190,
    borderRadius: 37,
    backgroundColor: theme.cyan,
    padding: 11,
    shadowColor: theme.cyan,
    shadowOpacity: 0.6,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
  },
  dieFace: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#D9FFF5",
    padding: 14,
    justifyContent: "space-between",
  },
  dieRow: {
    flex: 1,
    flexDirection: "row",
  },
  dieCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pip: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#09231F",
  },
  hiddenPip: {
    opacity: 0,
  },
  resultLabel: {
    color: theme.cyan,
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
    backgroundColor: theme.cyan,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.cyan,
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
