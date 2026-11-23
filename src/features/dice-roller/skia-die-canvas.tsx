import {
  Canvas,
  Circle,
  Group,
  Path,
} from "@shopify/react-native-skia";
import {
  useDerivedValue,
  type SharedValue,
} from "react-native-reanimated";
import { useMemo } from "react";

import { useAppTheme } from "@/theme/use-app-theme";

import { styles } from "./skia-die-canvas.styles";

const CANVAS_SIZE = 280;
const CENTER = CANVAS_SIZE / 2;
const CAMERA_DISTANCE = 5;
const DIE_RADIUS = 62;
const PIP_RADIUS = 0.14;
const PIP_SEGMENTS = 12;

type Vector3 = readonly [number, number, number];

type Face = {
  value: number;
  normal: Vector3;
  horizontal: Vector3;
  vertical: Vector3;
  color: string;
};

function getFaces(theme: ReturnType<typeof useAppTheme>): Face[] {
  return [
    {
      value: 1,
      normal: [0, 0, 1],
      horizontal: [1, 0, 0],
      vertical: [0, 1, 0],
      color: theme.colors.dice.face,
    },
    {
      value: 6,
      normal: [0, 0, -1],
      horizontal: [-1, 0, 0],
      vertical: [0, 1, 0],
      color: theme.colors.dice.faceDark,
    },
    {
      value: 3,
      normal: [1, 0, 0],
      horizontal: [0, 0, -1],
      vertical: [0, 1, 0],
      color: theme.colors.dice.faceLight,
    },
    {
      value: 4,
      normal: [-1, 0, 0],
      horizontal: [0, 0, 1],
      vertical: [0, 1, 0],
      color: theme.colors.dice.faceDark,
    },
    {
      value: 2,
      normal: [0, 1, 0],
      horizontal: [1, 0, 0],
      vertical: [0, 0, -1],
      color: theme.colors.dice.faceLight,
    },
    {
      value: 5,
      normal: [0, -1, 0],
      horizontal: [1, 0, 0],
      vertical: [0, 0, 1],
      color: theme.colors.dice.face,
    },
  ];
}

const PIP_POSITIONS: Record<number, readonly (readonly [number, number])[]> = {
  1: [[0, 0]],
  2: [[-0.5, -0.5], [0.5, 0.5]],
  3: [[-0.5, -0.5], [0, 0], [0.5, 0.5]],
  4: [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]],
  5: [
    [-0.5, -0.5],
    [0.5, -0.5],
    [0, 0],
    [-0.5, 0.5],
    [0.5, 0.5],
  ],
  6: [
    [-0.5, -0.5],
    [0, -0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [0, 0.5],
    [0.5, 0.5],
  ],
};

type SkiaDieCanvasProps = {
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
  accessibilityLabel: string;
};

function facePoint(face: Face, horizontal: number, vertical: number): Vector3 {
  "worklet";
  return [
    face.normal[0] +
      face.horizontal[0] * horizontal +
      face.vertical[0] * vertical,
    face.normal[1] +
      face.horizontal[1] * horizontal +
      face.vertical[1] * vertical,
    face.normal[2] +
      face.horizontal[2] * horizontal +
      face.vertical[2] * vertical,
  ];
}

function rotatePoint(
  point: Vector3,
  rotationX: number,
  rotationY: number,
): Vector3 {
  "worklet";
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y = point[1] * cosX - point[2] * sinX;
  const z = point[1] * sinX + point[2] * cosX;
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  return [
    point[0] * cosY + z * sinY,
    y,
    -point[0] * sinY + z * cosY,
  ];
}

function projectPoint(
  point: Vector3,
  rotationX: number,
  rotationY: number,
  scale: number,
): readonly [number, number] {
  "worklet";
  const rotated = rotatePoint(point, rotationX, rotationY);
  const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - rotated[2]);
  return [
    CENTER + rotated[0] * perspective * DIE_RADIUS * scale,
    CENTER - rotated[1] * perspective * DIE_RADIUS * scale,
  ];
}

function makeFacePath(
  face: Face,
  rotationX: number,
  rotationY: number,
  scale: number,
): string {
  "worklet";
  const corners = [
    facePoint(face, -1, -1),
    facePoint(face, 1, -1),
    facePoint(face, 1, 1),
    facePoint(face, -1, 1),
  ];
  const first = projectPoint(corners[0], rotationX, rotationY, scale);
  let path = `M ${first[0]} ${first[1]}`;
  for (let index = 1; index < corners.length; index += 1) {
    const point = projectPoint(corners[index], rotationX, rotationY, scale);
    path += ` L ${point[0]} ${point[1]}`;
  }
  return `${path} Z`;
}

function makePipsPath(
  face: Face,
  rotationX: number,
  rotationY: number,
  scale: number,
): string {
  "worklet";
  let path = "";
  const positions = PIP_POSITIONS[face.value];

  for (const [horizontal, vertical] of positions) {
    for (let segment = 0; segment <= PIP_SEGMENTS; segment += 1) {
      const angle = (segment / PIP_SEGMENTS) * Math.PI * 2;
      const point = facePoint(
        face,
        horizontal + Math.cos(angle) * PIP_RADIUS,
        vertical + Math.sin(angle) * PIP_RADIUS,
      );
      const projected = projectPoint(point, rotationX, rotationY, scale);
      path += `${segment === 0 ? "M" : "L"} ${projected[0]} ${projected[1]} `;
    }
    path += "Z ";
  }
  return path;
}

function faceOpacity(
  face: Face,
  rotationX: number,
  rotationY: number,
): number {
  "worklet";
  return rotatePoint(face.normal, rotationX, rotationY)[2] > 0.001 ? 1 : 0;
}

function DieFace({
  face,
  accent,
  ink,
  rotationX,
  rotationY,
  scale,
}: {
  face: Face;
  accent: string;
  ink: string;
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
}) {
  const facePath = useDerivedValue(() =>
    makeFacePath(face, rotationX.value, rotationY.value, scale.value),
  );
  const pipsPath = useDerivedValue(() =>
    makePipsPath(face, rotationX.value, rotationY.value, scale.value),
  );
  const opacity = useDerivedValue(() =>
    faceOpacity(face, rotationX.value, rotationY.value),
  );

  return (
    <Group opacity={opacity}>
      <Path path={facePath} color={face.color} />
      <Path
        path={facePath}
        color={accent}
        strokeJoin="round"
        strokeWidth={2.5}
        style="stroke"
      />
      <Path path={pipsPath} color={ink} />
    </Group>
  );
}

export default function SkiaDieCanvas({
  rotationX,
  rotationY,
  scale,
  accessibilityLabel,
}: SkiaDieCanvasProps) {
  const theme = useAppTheme();
  const faces = useMemo(() => getFaces(theme), [theme]);

  return (
    <Canvas
      accessible
      accessibilityLabel={accessibilityLabel}
      style={styles.canvas}
    >
      <Group opacity={0.32}>
        <Circle cx={CENTER} cy={CENTER} r={112} color={theme.colors.dice.glow} />
      </Group>
      {faces.map((face) => (
        <DieFace
          key={face.value}
          face={face}
          accent={theme.colors.dice.accent}
          ink={theme.colors.dice.ink}
          rotationX={rotationX}
          rotationY={rotationY}
          scale={scale}
        />
      ))}
    </Canvas>
  );
}
