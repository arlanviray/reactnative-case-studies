import { StyleSheet, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

type Props = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke?: string;
};

export const LineProps = ({ x1, y1, x2, y2, stroke = "black" }: Props) => (
  <Line
    fill="transparent"
    stroke={stroke}
    strokeWidth="8px"
    strokeLinecap="round"
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
  />
);

export default function ProgressParts({ fails }: any) {
  const setColor = (id: number) => {
    return fails.length >= id ? "#000" : "#E0E0E0";
  };

  return (
    <View style={styles.container}>
      <Svg height="250" width="200">
        {/* Rods */}
        <LineProps x1={"20"} y1={"230"} x2={"100"} y2={"230"} />
        <LineProps x1={"60"} y1={"20"} x2={"60"} y2={"230"} />
        <LineProps x1={"60"} y1={"20"} x2={"140"} y2={"20"} />
        <LineProps x1={"140"} y1={"20"} x2={"140"} y2={"60"} />

        {/* Right Arm */}
        <LineProps
          x1={"140"}
          y1={"120"}
          x2={"180"}
          y2={"140"}
          stroke={setColor(4)}
        />
        {/* Left Arm */}
        <LineProps
          x1={"140"}
          y1={"120"}
          x2={"100"}
          y2={"140"}
          stroke={setColor(3)}
        />
        {/* Right Leg */}
        <LineProps
          x1={"140"}
          y1={"160"}
          x2={"170"}
          y2={"190"}
          stroke={setColor(6)}
        />
        {/* Left Leg */}
        <LineProps
          x1={"140"}
          y1={"160"}
          x2={"110"}
          y2={"190"}
          stroke={setColor(5)}
        />
        {/* Body */}
        <LineProps
          x1={"140"}
          y1={"100"}
          x2={"140"}
          y2={"160"}
          stroke={setColor(2)}
        />
        {/* Head */}
        <Circle cx="140" cy="80" r="26" fill={setColor(1)} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
  },
});
