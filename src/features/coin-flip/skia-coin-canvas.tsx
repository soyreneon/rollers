import {
  Canvas,
  Circle,
  Group,
  Path,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";

import { useAppTheme } from "@/theme/use-app-theme";

import { styles } from "./skia-coin-canvas.styles";

const CENTER = 140;

type SkiaCoinCanvasProps = {
  angle: SharedValue<number>;
  accessibilityLabel: string;
};

export default function SkiaCoinCanvas({
  angle,
  accessibilityLabel,
}: SkiaCoinCanvasProps) {
  const theme = useAppTheme();
  const faceTransform = useDerivedValue(() => [
    { scaleX: Math.max(Math.abs(Math.cos(angle.value)), 0.015) },
  ]);
  const edgeTransform = useDerivedValue(() => [
    { scaleX: Math.max(Math.abs(Math.sin(angle.value)), 0.025) },
  ]);
  const headsOpacity = useDerivedValue(() =>
    Math.cos(angle.value) >= 0 ? 1 : 0,
  );
  const tailsOpacity = useDerivedValue(() =>
    Math.cos(angle.value) < 0 ? 1 : 0,
  );

  return (
    <Canvas
      accessible
      accessibilityLabel={accessibilityLabel}
      style={styles.canvas}
    >
      <Group opacity={0.45}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={104}
          color={theme.colors.coin.glow}
        />
      </Group>

      <Group origin={vec(CENTER, CENTER)} transform={edgeTransform}>
        <RoundedRect
          x={CENTER - 10}
          y={CENTER - 87}
          width={20}
          height={174}
          r={10}
          color={theme.colors.coin.accent}
        />
        <Path
          path={`M ${CENTER - 5} ${CENTER - 76} L ${CENTER - 5} ${CENTER + 76}`}
          color={theme.colors.coin.outline}
          strokeWidth={2}
          style="stroke"
        />
      </Group>

      <Group origin={vec(CENTER, CENTER)} transform={faceTransform}>
        <Circle cx={CENTER} cy={CENTER} r={90} color={theme.colors.coin.face} />
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={81}
          color={theme.colors.coin.inner}
        />
        <Group opacity={headsOpacity}>
          <Path
            path={`M ${CENTER - 23} ${CENTER - 30} L ${CENTER - 23} ${CENTER + 30} M ${CENTER + 23} ${CENTER - 30} L ${CENTER + 23} ${CENTER + 30} M ${CENTER - 23} ${CENTER} L ${CENTER + 23} ${CENTER}`}
            color={theme.colors.coin.ink}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={10}
            style="stroke"
          />
          {/* <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-.045 17.51h-.015c-2.285 0-4.469-1.189-6.153-3.349l.789-.614c1.489 1.911 3.394 2.963 5.364 2.963h.013c1.987-.004 3.907-1.078 5.408-3.021l.791.611c-1.693 2.194-3.894 3.405-6.197 3.41zm-3.468-10.01c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm7.013 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/> */}
        </Group>
        <Group opacity={tailsOpacity}>
          <Path
            path={`M ${CENTER - 29} ${CENTER - 25} L ${CENTER + 29} ${CENTER - 25} M ${CENTER} ${CENTER - 25} L ${CENTER} ${CENTER + 30}`}
            color={theme.colors.coin.ink}
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={10}
            style="stroke"
          />
        </Group>
      </Group>
    </Canvas>
  );
}
