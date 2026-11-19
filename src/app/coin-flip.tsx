import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { BackButton, ScreenFrame, theme } from "@/components/roller-ui";

function getCoinResult(): "HEADS" | "TAILS" {
  return Math.random() < 0.5 ? "HEADS" : "TAILS";
}

export default function CoinFlipScreen() {
  const [rotation] = useState(() => new Animated.Value(0));
  const finalAngle = useRef(0);
  const [result, setResult] = useState<"HEADS" | "TAILS" | null>(null);
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    if (flipping) return;

    const nextResult = getCoinResult();
    const nextAngle =
      Math.ceil(finalAngle.current / 360) * 360 +
      1440 +
      (nextResult === "TAILS" ? 180 : 0);
    finalAngle.current = nextAngle;
    setFlipping(true);

    Animated.timing(rotation, {
      toValue: nextAngle,
      duration: 1250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      setFlipping(false);
      if (finished) setResult(nextResult);
    });
  };

  const rotateY = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"],
        extrapolate: "extend",
      }),
    [rotation],
  );

  return (
    <ScreenFrame>
      <View style={styles.screen}>
        <BackButton onPress={() => router.back()} accent={theme.pink} />

        <View style={styles.heading}>
          <Text style={styles.eyebrow}>THE CLASSIC</Text>
          <Text style={styles.title}>COIN FLIP</Text>
          <Text style={styles.subtitle}>Leave it to the universe.</Text>
        </View>

        <View style={styles.stage}>
          <View style={styles.coinGlow} />
          <Animated.View
            style={[
              styles.coin,
              { transform: [{ perspective: 700 }, { rotateY }] },
            ]}
          >
            <View style={styles.coinInner}>
              <Image
                accessibilityLabel={
                  result
                    ? `${result.toLowerCase()} coin side`
                    : "Heads coin side"
                }
                contentFit="contain"
                source={
                  result === "TAILS"
                    ? require("../../assets/icons/tails.svg")
                    : require("../../assets/icons/head.svg")
                }
                style={styles.coinImage}
              />
              {/* <Text style={styles.coinLabel}>{result ?? 'FLIP'}</Text> */}
            </View>
          </Animated.View>
          <Text style={styles.resultLabel}>
            {flipping
              ? "IN THE AIR..."
              : result
                ? `RESULT: ${result}`
                : "YOUR CALL IS WAITING"}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Flip the coin"
            disabled={flipping}
            onPress={flipCoin}
            style={({ pressed }) => [
              styles.flipButton,
              pressed && !flipping && styles.buttonPressed,
              flipping && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.flipButtonText}>
              {flipping ? "FLIPPING..." : "FLIP COIN"}
            </Text>
          </Pressable>
          <Text style={styles.helper}>TAP TO FLIP</Text>
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
    color: theme.pink,
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
  coinGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#32142D",
    opacity: 0.65,
    shadowColor: theme.pink,
    shadowOpacity: 0.8,
    shadowRadius: 70,
    elevation: 14,
  },
  coin: {
    width: 194,
    height: 194,
    borderRadius: 97,
    backgroundColor: "#F6BDEB",
    borderWidth: 5,
    borderColor: theme.pink,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.pink,
    shadowOpacity: 0.65,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
  },
  coinInner: {
    width: 166,
    height: 166,
    borderRadius: 83,
    borderWidth: 1.5,
    borderColor: "#A73A8F",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9D7F2",
  },
  coinImage: {
    width: 112,
    height: 112,
    tintColor: "#4C1944",
  },
  // coinLabel: {
  //   color: "#68215C",
  //   fontSize: 10,
  //   fontWeight: "900",
  //   letterSpacing: 2,
  //   marginTop: 2,
  // },
  resultLabel: {
    color: theme.pink,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.3,
    marginTop: 38,
  },
  actions: {
    alignItems: "center",
    gap: 14,
  },
  flipButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: theme.pink,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.pink,
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
  flipButtonText: {
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
